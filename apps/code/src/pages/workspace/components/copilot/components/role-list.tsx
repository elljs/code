import { cn } from "@/lib/utils";
import { useReactive } from "ahooks";
import { Plus } from "lucide-react";
import { ButtonHTMLAttributes } from "react";
import Avatar, { AvatarFullConfig, genConfig } from "react-nice-avatar";

interface RoleProps extends ButtonHTMLAttributes<HTMLDivElement> {
    active?: boolean;
    title: string;
    description: string;
    name: string;
    options: AvatarFullConfig | string
}

export const Role = ({ className, active = false, onClick, title, description, name, options }: RoleProps) => {
    return (
        <div
            className={cn(
                "relative flex flex-col items-center justify-center p-2 rounded-lg cursor-pointer",
                active ? "ring-2 ring-primary" : "",
                className
            )}
            onClick={onClick}
        >
            {active && (
                <div className="absolute top-2 right-2">
                    <span className="relative flex size-2 ml-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex rounded-full size-2 bg-green-500" />
                    </span>
                </div>
            )}
            <Avatar className={
                cn("size-12 rounded-full")
            } {...genConfig(options)} />
            <div className="flex flex-col items-center text-sm mt-1">
                <p>{name}</p>
                <span className="text-muted-foreground text-xs">{title}</span>
            </div>
        </div>
    );
}

export default function RoleList() {
    const state = useReactive({
        id: 1
    })
    return (
        <div className="grid grid-cols-4 shadow-md px-2 py-2">
            <Role
                active={state.id === 1}
                onClick={() => state.id = 1}
                title="软件架构师"
                description="一位资深的软件架构师"
                name="楚留香"
                options={{
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
                }}
            />
            <Role
                active={state.id === 2}
                onClick={() => state.id = 2}
                title="UI设计师"
                description="一位资深的UI设计师"
                name="花小楼"
                options={{
                    "sex": "woman",
                    "faceColor": "#F9C9B6",
                    "earSize": "small",
                    "eyeStyle": "smile",
                    "noseStyle": "round",
                    "mouthStyle": "laugh",
                    "shirtStyle": "polo",
                    "glassesStyle": "none",
                    "hairColor": "#FC909F",
                    "hairStyle": "womanLong",
                    "hatStyle": "none",
                    "hatColor": "#000",
                    "eyeBrowStyle": "up",
                    "shirtColor": "#F4D150",
                    "bgColor": "#FFEDEF"
                }}
            />
            <Role
                active={state.id === 3}
                onClick={() => state.id = 3}
                title="测试工程师"
                description="一位资深的UI设计师"
                name="司空摘星"
                options={{
                    "sex": "man",
                    "faceColor": "#F9C9B6",
                    "earSize": "big",
                    "eyeStyle": "smile",
                    "noseStyle": "long",
                    "mouthStyle": "peace",
                    "shirtStyle": "short",
                    "glassesStyle": "none",
                    "hairColor": "#000",
                    "hairStyle": "thick",
                    "hatStyle": "none",
                    "hatColor": "#000",
                    "eyeBrowStyle": "up",
                    "shirtColor": "#9287FF",
                    "bgColor": "linear-gradient(45deg, #178bff 0%, #ff6868 100%)"
                }}
            />
            <div className="flex flex-col items-center justify-center p-2 rounded-lg cursor-pointer">
                <Plus className="size-8" />
                <div className="mt-2 text-xs text-muted-foreground">新增员工</div>
            </div>
        </div>
    );
}