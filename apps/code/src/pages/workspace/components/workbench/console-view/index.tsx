import { Button } from "@/components/ui/button";
import { FitAddon } from '@xterm/addon-fit';
import { Terminal } from '@xterm/xterm';
import { useSize } from "ahooks";
import { X } from "lucide-react";
import { useEffect, useRef } from 'react';
import axios from 'axios';
import dockerEvent from "@/events/docker-event";

import "@xterm/xterm/css/xterm.css";
import "./index.css";

export default function ConsoleView() {
    const viewRef = useRef<HTMLDivElement>(null);
    const size = useSize(viewRef);
    const terminalRef = useRef<HTMLDivElement>(null);
    const termRef = useRef<Terminal>(null);
    const fitAddonRef = useRef<FitAddon>(null);

    useEffect(() => {
        if (terminalRef?.current && !termRef?.current) {
            const term = new Terminal({
                fontFamily: 'FiraCode',
                fontSize: 12,
            });
            const fitAddon = new FitAddon();

            term.open(terminalRef.current);
            term.loadAddon(fitAddon);
            fitAddon.fit();

            // @ts-ignore
            termRef.current = term;
            // @ts-ignore
            fitAddonRef.current = fitAddon;

            dockerEvent.on('run', async () => {
                const IMAGE_NAME = "nginx";
                const CONTAINER_NAME = "hello-world";

                term.writeln("构建镜像");

                await axios.post("/docker/v1.37/images/create", {}, {
                    params: {
                        fromImage: IMAGE_NAME,
                        tag: "latest",
                    }
                });

                term.writeln("创建容器");

                await axios.post("/docker/v1.37/containers/create", {
                    "Image": IMAGE_NAME,
                    "Tty": true
                }, {
                    params: {
                        name: CONTAINER_NAME
                    }
                });

                term.writeln("启动容器");

                await axios.post(`/docker/v1.37/containers/${CONTAINER_NAME}/start`);

                fetch(`/docker/v1.37/containers/${CONTAINER_NAME}/logs?${new URLSearchParams({
                    "follow": "true",
                    "stdout": "true"
                }).toString()}`, {
                    method: 'GET',
                }).then((response) => response.body)
                    .then(async (body) => {
                        const reader = body!.getReader();
                        const decoder = new TextDecoder('utf-8');
                        let done = false;
                        while (!done) {
                            const { value, done: streamDone } = await reader.read();
                            if (value) {
                                termRef.current?.writeln(decoder.decode(value));
                            }
                            done = streamDone;
                        }
                    });

                setTimeout(async () => {
                    term.writeln("停止容器");

                    await axios.post(`/docker/v1.37/containers/${CONTAINER_NAME}/stop`);

                    term.writeln("删除容器");

                    await axios.delete(`/docker/v1.37/containers/${CONTAINER_NAME}`, {
                        params: {
                            force: true
                        }
                    });
                }, 3000);
            });
        }
    }, [terminalRef?.current]);

    useEffect(() => {
        if (fitAddonRef.current) {
            fitAddonRef.current.fit();
        }
    }, [size?.height, size?.width]);

    return (
        <div ref={viewRef} className="flex flex-col h-full w-full bg-card">
            <div className="flex items-center justify-between p-2">
                <div className="text-sm font-semibold">日志</div>
                <div className="flex items-center space-x-2">
                    <Button className="size-8 p-1" variant="ghost" size="icon">
                        <X className="size-6" />
                    </Button>
                </div>
            </div>
            <div ref={terminalRef} className="h-full w-full bg-secondary" />
        </div>
    );
}