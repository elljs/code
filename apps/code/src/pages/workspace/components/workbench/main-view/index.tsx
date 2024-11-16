import {
    DockviewApi,
    DockviewReact,
    DockviewReadyEvent
} from '@/components/custom/dockview';
import React from 'react';
import ConsoleView from '../console-view';
import TabView from '../tab-view';
import TradingView from '../trading-view';

const components = {
    TabView,
    TradingView,
    ConsoleView
};

export default function MainView() {
    const [api, setApi] = React.useState<DockviewApi>();

    React.useEffect(() => {
        if (!api) {
            return;
        }

        const disposables = [
            api.onWillShowOverlay((e: { kind: string; preventDefault: () => void; }) => {
                if (e.kind === 'header_space' || e.kind === 'tab') {
                    return;
                }
                e.preventDefault();
            }),
        ];

        return () => {
            disposables.forEach((disposable) => {
                disposable.dispose();
            });
        };
    }, [api]);

    const onReady = (event: DockviewReadyEvent) => {
        setApi(event.api);

        const tabView = event.api.addPanel({
            id: 'tab-view',
            component: 'TabView',
        });
        tabView.group.header.hidden = true;

        // const tradingView = event.api.addPanel({
        //     id: 'trading-view',
        //     component: 'TradingView',
        // }); 
        // tradingView.group.header.hidden = true;

        const consoleView = event.api.addPanel({
            id: 'console-view',
            component: 'ConsoleView',
            minimumHeight: 0,
            position: {
                direction: 'below'
            }
        });
        consoleView.group.header.hidden = true;
    };

    return (
        <DockviewReact
            className='dockview-theme-abyss'
            onReady={onReady}
            components={components}
            disableFloatingGroups
            disableDnd
        />
    );
};
