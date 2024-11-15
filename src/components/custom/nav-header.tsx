import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useFullscreen } from "ahooks";
import {
	Ellipsis,
	Expand,
	Minus,
	Moon,
	RefreshCw,
	Shrink,
	Sun,
	X,
} from "lucide-react";
import { Navbar, useNavbar } from "./navbar";
import { useTheme } from "./theme-provider";

export function NavHeader() {
	const { theme, setTheme } = useTheme();
	const [isFullscreen, { toggleFullscreen }] = useFullscreen(document.body);
	const { refreshCurrent, closeCurrent, closeAll } = useNavbar();

	return (
		<header className="sticky top-0 z-10 flex items-center justify-between h-12 p-3 shadow-sm border-b bg-sidebar text-sidebar-foreground">
			<Navbar />
			<div className="flex justify-end items-center space-x-2 ml-4">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							className="size-7 text-accent-foreground bg-accent hover:bg-primary hover:text-primary-foreground"
							size="icon"
						>
							<Ellipsis />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem onClick={closeCurrent}>
							<X className="size-4" />
							<span>关闭当前标签页</span>
						</DropdownMenuItem>
						<DropdownMenuItem onClick={closeAll}>
							<Minus className="size-4" />
							<span>关闭全部标签页</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							className="size-7 text-accent-foreground bg-accent hover:bg-primary hover:text-primary-foreground"
							size="icon"
							onClick={refreshCurrent}
						>
							<RefreshCw />
						</Button>
					</TooltipTrigger>
					<TooltipContent>刷新当前标签页</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							className="size-7 text-accent-foreground bg-accent hover:bg-primary hover:text-primary-foreground"
							size="icon"
							onClick={() => toggleFullscreen()}
						>
							{isFullscreen ? <Shrink /> : <Expand />}
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						{isFullscreen ? "退出全屏" : "进入全屏"}
					</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							className="size-7 text-accent-foreground bg-accent hover:bg-primary hover:text-primary-foreground"
							size="icon"
							onClick={() =>
								theme === "dark" ? setTheme("light") : setTheme("dark")
							}
						>
							{theme === "dark" ? <Sun /> : <Moon />}
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						{theme === "dark" ? "亮色主题" : "暗色主题"}
					</TooltipContent>
				</Tooltip>
			</div>
		</header>
	);
}
