import { Editor, EditorProps } from "@monaco-editor/react";

export default function Code(props: EditorProps) {
    return (
        <Editor
            theme="one-dark-pro"
            height="100%"
            {...props}
        />
    );
}