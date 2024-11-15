import { ISplitviewPanelProps } from "@/components/custom/dockview";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Editor, { Monaco } from '@monaco-editor/react';
import { useReactive } from "ahooks";
import { LanguageModelV1, streamText } from 'ai';
import { Bot, Check, ChevronsUpDown, File, FileCode, FileImage, Mic, Network, Pen, SquareScissors, Video } from "lucide-react";
import * as MonacoEditor from 'monaco-editor';
import { createOllama, } from 'ollama-ai-provider';
import { useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import Code from "./code";
import { Container } from "./container";
import Flow from "./flow";
import "./index.css";
import ThemeOneDarkPro from './themes/onedarkpro.json';
import dockerEvent from "@/events/docker-event";

const language = 'ell';

const createViewZone = (dom: HTMLDivElement, children: React.ReactNode) => {
    dom.style.zIndex = '100';
    return ReactDOM.createRoot(dom).render(children);
}

const models = [
    {
        value: "codegeex4",
        label: "codegeex4",
    },
    {
        value: "llama3.2",
        label: "llama3.2",
    },
];

interface ViewZoneProps {
    context: any;
    editor: MonacoEditor.editor.IStandaloneCodeEditor;
    monaco: Monaco;
}

const ViewZone = ({ context, editor, monaco }: ViewZoneProps) => {
    const state = useReactive<{
        modelId: string;
        modelOpen: boolean;
        keepContext: boolean;
        code: string;
    }>({
        modelId: models[0].value,
        modelOpen: false,
        keepContext: true,
        code: ''
    });

    return (
        <div className="w-full h-full flex flex-col space-y-1 py-1 pl-1 pr-5">
            <div className="flex items-center space-x-2 text-xs">
                <div className="flex items-center space-x-2">
                    <span>模型</span>
                    <Popover
                        open={state.modelOpen}
                        onOpenChange={(e) => (state.modelOpen = e)}
                    >
                        <PopoverTrigger asChild>
                            <Button
                                className="mt-0 h-8 text-center rounded px-2"
                                variant="outline"
                                size="sm"
                                aria-expanded={state.modelOpen}
                            >
                                {state.modelId
                                    ? models.find((model) => model.value === state.modelId)?.label
                                    : "选择模型..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandInput placeholder="搜索模型..." />
                                <CommandList>
                                    <CommandEmpty>未找到相关模型</CommandEmpty>
                                    <CommandGroup>
                                        {models.map((model) => (
                                            <CommandItem
                                                key={model.value}
                                                value={model.value}
                                                onSelect={(value) => {
                                                    state.modelId = value;
                                                    state.modelOpen = false;
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        state.modelId === model.value
                                                            ? "opacity-100"
                                                            : "opacity-0",
                                                    )}
                                                />
                                                {model.label}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="flex items-center space-x-2">
                    <span>关联上下文</span>
                    <Switch checked={state.keepContext} onCheckedChange={e => state.keepContext = e} />
                </div>
            </div>
            <div className="flex items-start space-x-1 text-xs">
                <Button
                    className="size-8 rounded-lg"
                    size="icon"
                    variant="outline"
                    onClick={() => { }}>
                    <Mic />
                </Button>
                <Button
                    className="size-8 rounded-lg"
                    size="icon"
                    variant="outline"
                    onClick={() => { }}>
                    <File />
                </Button>
                <Button
                    className="size-8 rounded-lg"
                    size="icon"
                    variant="outline"
                    onClick={() => { }}>
                    <FileImage />
                </Button>
                <Button
                    className="size-8 rounded-lg"
                    size="icon"
                    variant="outline"
                    onClick={() => { }}>
                    <SquareScissors />
                </Button>
                <Button
                    className="size-8 rounded-lg"
                    size="icon"
                    variant="outline"
                    onClick={() => { }}>
                    <Video />
                </Button>
                <Button
                    className="size-8 rounded-lg"
                    size="icon"
                    variant="outline"
                    onClick={() => { }}>
                    <Pen />
                </Button>
                <Button
                    className="size-8 rounded-lg bg-primary"
                    size="icon"
                    variant="outline"
                    onClick={() => { }}>
                    <Bot />
                </Button>
            </div>
            <div className="flex-1 py-1 box-border">
                {/* <Excalidraw /> */}
                <div className="flex flex-col space-y-2">
                    <Input className="rounded-lg" placeholder="搜索智能体" />
                    {/* <div className="grid grid-cols-8 gap-1">
                        <div className="flex justify-center text-xs bg-background p-2 rounded-lg">
                            <span className="text-xs">X平台爬虫</span>
                        </div>
                        <div className="flex justify-center text-xs bg-background p-2 rounded-lg">
                            <span className="text-xs">微信推送</span>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default function CodePanel(_: ISplitviewPanelProps) {
    const state = useReactive<{
        tab: 'code' | 'flow',
        code: string | undefined,
        sources: string[];
        model: LanguageModelV1 | null;
    }>({
        tab: 'flow',
        code: `() -> 生成一个基于 tailwind-variants 的按钮
`,
        sources: [],
        model: null,
    });
    const editorRef = useRef<MonacoEditor.editor.IStandaloneCodeEditor>();

    useEffect(() => {
        const ollama = createOllama({
            baseURL: 'http://127.0.0.1:11434/api',
        });
        state.model = ollama('codegeex4');
    }, []);

    function handleBeforeMount(monaco: Monaco) {

        monaco.languages.register({ id: language });

        monaco.languages.setMonarchTokensProvider(language, {
            tokenizer: {
                root: [
                    [/([a-zA-Z0-9]+)/, `${language}.function.name`],
                    [/\s*->\s*/, `${language}.function.arrow`],
                    [/./, `${language}.function.body`],
                ]
            }
        });

        monaco.editor.defineTheme('one-dark-pro', {
            base: 'vs-dark',
            inherit: true,
            rules: [
                { token: `${language}.function.name`, foreground: '#61afef' },
                { token: `${language}.function.arrow`, foreground: '#c678dd' },
                { token: `${language}.function.body`, foreground: '#98c379' },
                ...ThemeOneDarkPro.rules
            ],
            encodedTokensColors: [
                ...ThemeOneDarkPro.encodedTokensColors
            ],
            colors: {
                ...ThemeOneDarkPro.colors
            }
        });
    }

    function handleDidMount(editor: MonacoEditor.editor.IStandaloneCodeEditor, monaco: Monaco) {
        editorRef.current = editor;

        const generateCode = async (key, content) => {
            const reuslt = await streamText({
                model: state.model!,
                messages: [
                    {
                        role: 'user',
                        content: `
                                请根据以下明确的函数描述，使用TypeScript语法生成相应的代码定义：

                                描述: ${content}
                                
                                在生成代码时，请注意以下几点要求：
                                
                                1. 生成的代码必须完全符合提供的函数描述。
                                2. 不要包含任何Markdown格式（如粗体、斜体、链接、列表等）。
                                3. 生成的代码应使用以下指令包裹前后没有任何其他文本，以便后续处理和识别：
                                
                                    // #region ${content}
                                    // 在此处放置生成的TypeScript代码
                                    // #endregion
                                
                                示例（仅用于说明格式，不是实际的函数描述）：
                                
                                如果函数描述是“计算两个数的和”，则生成的代码可能如下所示：
                                
                                // #region 计算两个数的和
                                function add(a: number, b: number): number {
                                    return a + b;
                                }
                                // #endregion
                             `
                    }
                ]
            });

            let source = '';
            for await (const delta of reuslt.textStream) {
                source += delta;
                state.sources[key] = source;
            }
        }

        const generateCodeCommandId1 = editor.addCommand(
            0,
            async () => {
                const model = editor.getModel();
                const key = 1;
                const lineContent = model!.getLineContent(1);
                await generateCode(key, lineContent);
            },
            ""
        );

        const generateCodeCommandId2 = editor.addCommand(
            0,
            async () => {
                const model = editor.getModel();
                const key = 3;
                const lineContent = model!.getLineContent(3);
                await generateCode(key, lineContent);
            },
            ""
        );

        monaco.languages.registerCodeLensProvider(language, {
            provideCodeLenses: () => {
                return {
                    lenses: [
                        {
                            range: new monaco.Range(1, 1, 1, 1),
                            id: "Line 1",
                            command: {
                                id: generateCodeCommandId1,
                                title: "生成代码",
                            },
                        },
                    ],
                    dispose: () => { },
                };
            },
            resolveCodeLens: (model, codeLens, token) => {
                return codeLens;
            },
        });

        let viewZoneId: string;
        editor.changeViewZones((changeAccessor) => {
            const domNode = document.createElement("div")!;

            createViewZone(domNode, <ViewZone context={state} editor={editor} monaco={monaco} />);

            viewZoneId = changeAccessor.addZone({
                afterLineNumber: 1,
                heightInLines: 30,
                domNode
            });
        });
    }

    const source = state.sources.filter(s => s.trim().length > 0).join(`
        \r\n
`);

    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex items-center justify-between">
                <Tabs className="bg-background" value={state.tab} onValueChange={(value) => state.tab = value} >
                    <TabsList className="rounded-none">
                        <TabsTrigger className="flex items-center space-x-1" value="code">
                            <FileCode className="size-4" />
                            <span>
                                编辑器
                            </span>
                        </TabsTrigger>
                        <TabsTrigger className="flex items-center space-x-1" value="flow">
                            <Network className="size-4" />
                            <span>
                                工作流
                            </span>
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
                <div className="flex items-center space-x-1 px-2">
                    <Button className="h-8" variant="secondary" onClick={() => {
                        dockerEvent.emit('run', {

                        });
                    }}>测试</Button>
                    <Button className="h-8">部署</Button>
                </div>
            </div>
            <div className="relative flex-1">
                <Container visbile={state.tab === 'code'}>
                    <ResizablePanelGroup direction="horizontal">
                        <ResizablePanel defaultSize={65} minSize={20} maxSize={80}>
                            <Editor
                                theme="one-dark-pro"
                                height="100%"
                                defaultLanguage={language}
                                defaultValue={state.code}
                                value={state.code}
                                onChange={(code) => state.code = code}
                                beforeMount={handleBeforeMount}
                                onMount={handleDidMount}
                                options={{
                                    fontSize: 16,
                                    fontFamily: 'FiraCode',
                                    fontLigatures: true,
                                    wordWrap: 'on',
                                    minimap: {
                                        enabled: false
                                    },
                                    bracketPairColorization: {
                                        enabled: true
                                    },
                                    cursorBlinking: 'expand',
                                    formatOnPaste: true,
                                    suggest: {
                                        showFields: false,
                                        showFunctions: false
                                    },
                                    codeLens: true,
                                    contextmenu: false
                                }}
                            />
                        </ResizablePanel>
                        <ResizableHandle />
                        <ResizablePanel defaultSize={35} minSize={20} maxSize={80}>
                            {source && (
                                <Code
                                    language='typescript'
                                    value={source}
                                    options={{
                                        fontSize: 16,
                                        fontFamily: 'FiraCode',
                                        fontLigatures: true,
                                        wordWrap: 'on',
                                        minimap: {
                                            enabled: false
                                        },
                                        bracketPairColorization: {
                                            enabled: true
                                        },
                                        cursorBlinking: 'expand',
                                        formatOnPaste: true,
                                        suggest: {
                                            showFields: false,
                                            showFunctions: false
                                        },
                                        readOnly: true,
                                        codeLens: false,
                                        contextmenu: false
                                    }}
                                />
                            )}
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </Container>
                <Container visbile={state.tab === 'flow'}>
                    <Flow />
                </Container>
            </div>
        </div>
    );
}