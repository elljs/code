import { ChatInput } from "@/components/custom/chat/chat-input";
import { Button } from "@/components/ui/button";
import { CornerDownLeft, Mic, Paperclip } from "lucide-react";

export default function MessageInput() {
	return (
		<div className="flex items-center space-x-2 w-full h-30 px-2 py-2">
			<form className="w-full h-30 px-2 rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1">
				<ChatInput
					placeholder="输入你的消息..."
					className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
				/>
				<div className="flex items-center py-3 px-1 pt-0">
					<Button variant="ghost" size="icon">
						<Paperclip className="size-4" />
						<span className="sr-only">Attach file</span>
					</Button>

					<Button variant="ghost" size="icon">
						<Mic className="size-4" />
						<span className="sr-only">Use Microphone</span>
					</Button>

					<Button size="sm" className="ml-auto gap-1.5">
						发送消息
						<CornerDownLeft className="size-3.5" />
					</Button>
				</div>
			</form>
		</div>
	);
}
