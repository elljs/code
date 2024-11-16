import {
	Background,
	Controls,
	MiniMap,
	ReactFlow,
	addEdge,
	useEdgesState,
	useNodesState,
} from "@xyflow/react";
import { AlarmClock, FileImage, Plus, Repeat } from "lucide-react";
import { ReactNode, useCallback } from "react";
import EndFlowNode from "./nodes/end-flow-node";
import StartFlowNode from "./nodes/start-flow-node";

import "@xyflow/react/dist/style.css";
import { Input } from "@/components/ui/input";

interface FlowNodeProps {
	id: string;
	name: string;
	icon: ReactNode;
}

const FlowNode = ({ id, name, icon }: FlowNodeProps) => {
	return (
		<div
			key={id}
			className="flex justify-between items-center h-10 w-full bg-card p-2 rounded-md hover:bg-primary cursor-grab"
		>
			<div className="flex items-center space-x-2">
				{icon}
				<div className="text-xs">{name}</div>
			</div>
			<Plus className="size-4" />
		</div>
	);
};

const initialNodes = [
	{
		id: "start",
		type: "StartFlowNode",
		position: { x: 335, y: 200 },
		data: { label: "开始" },
	},
	{
		id: "1-1",
		position: { x: 200, y: 400 },
		data: { label: "抓取财经网站数据" },
	},
	{ id: "1-2", position: { x: 400, y: 400 }, data: { label: "抓取X平台数据" } },
	{ id: "2", position: { x: 300, y: 600 }, data: { label: "提取信息" } },
	{ id: "3", position: { x: 300, y: 800 }, data: { label: "微信推送" } },
	{
		id: "end",
		type: "EndFlowNode",
		position: { x: 335, y: 900 },
		data: { label: "结束" },
	},
];
const initialEdges = [
	{ id: "e-start-1-1", source: "start", target: "1-1", animated: true },
	{ id: "e-start-1-2", source: "start", target: "1-2", animated: true },
	{ id: "e-1-1-2", source: "1-1", target: "2", animated: true },
	{ id: "e-1-2-2", source: "1-2", target: "2", animated: true },
	{ id: "e-2-3", source: "2", target: "3", animated: true },
	{ id: "e-3-end", source: "3", target: "end", animated: true },
];

export default function Flow() {
	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

	const onConnect = useCallback(
		(params) => setEdges((eds) => addEdge(params, eds)),
		[setEdges],
	);

	return (
		<div className="flex h-full w-full bg-[#23272e]">
			<div className="flex flex-col space-y-2 h-full w-[200px] px-4 py-2 overflow-y-auto no-scrollbar">
				<Input className="rounded-lg mb-1" placeholder="搜索工作流节点" />
				<FlowNode
					id="image-flow-node"
					name="图像流"
					icon={
						<div className="flex items-center justify-center size-6 bg-blue-500 rounded-lg">
							<FileImage className="size-4" />
						</div>
					}
				/>
				<FlowNode
					id="loop-flow-node"
					name="循环"
					icon={
						<div className="flex items-center justify-center size-6 bg-purple-500 rounded-lg">
							<Repeat className="size-4" />
						</div>
					}
				/>
				<FlowNode
					id="scheduled-flow-node"
					name="定时任务"
					icon={
						<div className="flex items-center justify-center size-6 bg-green-500 rounded-lg">
							<AlarmClock className="size-4" />
						</div>
					}
				/>
			</div>
			<ReactFlow
				colorMode="dark"
				nodeTypes={{
					StartFlowNode,
					EndFlowNode,
				}}
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
			>
				<Controls />
				<MiniMap />
				<Background variant="dots" gap={12} size={1} />
			</ReactFlow>
		</div>
	);
}
