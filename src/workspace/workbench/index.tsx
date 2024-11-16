import {
	SplitviewApi,
	SplitviewReact,
	SplitviewReadyEvent,
} from "@/components/custom/dockview";
import CopilotView from "./copilot-view";
import MainView from "./main-view";
import SideView from "./side-view";

import globalModel from "@/models/global.model";
import { useEffect, useRef } from "react";
import { useSnapshot } from "valtio";
import "./index.css";

export default function Workbench({ active }: { active: string }) {
	const { copilotOpen } = useSnapshot(globalModel.state);
	const apiRef = useRef<SplitviewApi>();

	useEffect(() => {
		if (apiRef) {
			apiRef?.current?.getPanel("side-view")?.update({
				params: {
					active,
				},
			});
		}
	}, [apiRef, active]);

	const onReady = (event: SplitviewReadyEvent) => {
		apiRef.current = event.api;

		event.api.addPanel({
			id: "side-view",
			component: "SideView",
			size: 300,
			minimumSize: 100,
			maximumSize: 400,
			snap: true,
			params: {
				active,
			},
		});

		event.api.addPanel({
			id: "main-view",
			component: "MainView",
		});

		event.api.addPanel({
			id: "copilot-view",
			component: "CopilotView",
			size: 400,
			minimumSize: 400,
			maximumSize: 400,
			snap: true,
		});
	};

	useEffect(() => {
		if (apiRef.current) {
			apiRef.current.getPanel("copilot-view")?.api.setVisible(copilotOpen);
		}
	}, [apiRef, copilotOpen]);

	return (
		<SplitviewReact
			className={"dockview-theme-abyss"}
			components={{
				SideView,
				CopilotView,
				MainView,
			}}
			onReady={onReady}
		/>
	);
}
