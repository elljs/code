import { useReactive } from "ahooks";
import MenuBar from "./menu-bar";
import SideBar from "./side-bar";
import StatusBar from "./status-bar";
import Workbench from "./workbench";

export default function Workspace() {
	const state = useReactive<{ active: string }>({
		active: "file",
	});

	return (
		<div className="h-screen w-screen flex flex-col box-border overflow-hidden">
			<MenuBar />
			<main className="flex flex-1">
				<SideBar
					active={state.active}
					onActiveChange={(active) => (state.active = active)}
				/>
				<Workbench active={state.active} />
			</main>
			<StatusBar />
		</div>
	);
}
