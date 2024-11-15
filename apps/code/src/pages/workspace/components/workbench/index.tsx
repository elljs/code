import {
    SplitviewApi,
    SplitviewReact,
    SplitviewReadyEvent
} from '@/components/custom/dockview';
import MainView from './main-view';
import SideView from './side-view';

import { useEffect, useRef } from 'react';
import "./index.css";


export default function Workbench({ active }: { active: string }) {
    const apiRef = useRef<SplitviewApi>();

    useEffect(() => {
        if (apiRef) {
            apiRef?.current?.getPanel('side-view')?.update({
                params: {
                    active
                }
            });
        }
    }, [apiRef, active]);

    const onReady = (event: SplitviewReadyEvent) => {
        apiRef.current = event.api;

        event.api.addPanel({
            id: 'side-view',
            component: 'SideView',
            size: 300,
            minimumSize: 100,
            maximumSize: 400,
            snap: true,
            params: {
                active
            }
        });

        event.api.addPanel({
            id: 'main-view',
            component: 'MainView',
        });
    };

    return (
        <SplitviewReact
            className={'dockview-theme-abyss'}
            components={{
                SideView,
                MainView
            }}
            onReady={onReady}
            hideBorders
        />
    );
}