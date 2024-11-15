import { ChatMessageList } from "@/components/custom/chat/chat-message-list";
import MessageInput from "./components/message-input";
import RoleList from "./components/role-list";
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "@/components/custom/chat/chat-bubble";
import Avatar, { genConfig } from 'react-nice-avatar';
import { useReactive } from "ahooks";
import MarkdownRenderer from "@/components/ui/markdown-renderer";
import { useEffect, useRef } from "react";
import { createOllama } from "ollama-ai-provider";
import { LanguageModelV1, streamText } from "ai";
import { TypingIndicator } from "@/components/ui/typing-indicator";

export default function Copilot() {
    const state = useReactive<{
        model: LanguageModelV1 | null;
        isLoading: boolean;
        message: string;
    }>({
        model: null,
        isLoading: false,
        message: '',
    });
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ollama = createOllama({
            baseURL: 'http://127.0.0.1:11434/api',
        });
        state.model = ollama('codegeex4');
    }, []);

    return (
        <div className="h-full w-full flex flex-col justify-between overflow-hidden">
            <RoleList />
            <ChatMessageList ref={contentRef} className="flex-1 overflow-auto no-scrollbar px-1">
                <ChatBubble variant='sent' onClick={async () => {
                    state.isLoading = true;
                    const reuslt = await streamText({
                        model: state.model!,
                        messages: [
                            {
                                role: 'user',
                                content: `
                                    你是一名资深的软件架构师，请根据以下需求生成软件开发的步骤：
                                    实现一个程序，每天定时搜集财经热点以及马斯克在X上的动态，整理并推送到我的微信，需要哪些步骤？

                                    生成步骤时请注意以下几点要求：
                                    1. 步骤数量不超过5步
                                    2. 步骤用需要排列
                                    3. 步骤请描述技术相关的细节
                                    4. 不需要输出其他和编码无瓜的文本

                                    这是一个示例：

                                    1. 搜索财经热点
                                    2. 筛选关键词
                                    3. 提取需要的信息
                                    4. 整理信息格式
                                    5. 编写推送消息到微信的功能
                                    6. 编写定时任务
                                    7. 部署代码到云端
                                `
                            }
                        ]
                    });
                    state.isLoading = false;
                    state.message = '';
                    for await (const delta of reuslt.textStream) {
                        state.message += delta;
                        if (contentRef.current) {
                            contentRef.current.scrollTop = contentRef.current.scrollHeight;
                        }
                    }
                }}>
                    <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                        <Avatar
                            className="w-full h-full"
                            {...genConfig({
                                "sex": "man",
                                "faceColor": "#AC6651",
                                "earSize": "big",
                                "eyeStyle": "smile",
                                "noseStyle": "long",
                                "mouthStyle": "peace",
                                "shirtStyle": "polo",
                                "glassesStyle": "none",
                                "hairColor": "#000",
                                "hairStyle": "mohawk",
                                "hatStyle": "none",
                                "hatColor": "#000",
                                "eyeBrowStyle": "up",
                                "shirtColor": "#9287FF",
                                "bgColor": "#506AF4"
                            })} />
                    </div>
                    <ChatBubbleMessage variant='sent'>
                        <span className="text-sky-500">@楚留香</span> 实现一个程序，每天定时搜集财经热点以及马斯克在X上的动态，整理并推送到我的微信，需要哪些步骤？
                    </ChatBubbleMessage>
                </ChatBubble>
                {(state.isLoading || state.message) && <ChatBubble variant='received'>
                    <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                        <Avatar
                            className="w-full h-full"
                            {...genConfig({
                                "sex": "man",
                                "faceColor": "#F9C9B6",
                                "earSize": "big",
                                "eyeStyle": "circle",
                                "noseStyle": "round",
                                "mouthStyle": "smile",
                                "shirtStyle": "polo",
                                "glassesStyle": "round",
                                "hairColor": "#000",
                                "hairStyle": "thick",
                                "hatStyle": "none",
                                "hatColor": "#77311D",
                                "eyeBrowStyle": "up",
                                "shirtColor": "#FC909F",
                                "bgColor": "linear-gradient(90deg, #36cd1c 0%, #68deff 100%)"
                            })}
                        />
                    </div>
                    <ChatBubbleMessage variant='received'>
                        {state.isLoading ? <TypingIndicator /> : <MarkdownRenderer>
                            {state.message}
                        </MarkdownRenderer>}
                    </ChatBubbleMessage>
                </ChatBubble>}
            </ChatMessageList>
            <MessageInput />
        </div>
    );
}