import {
    DockviewReact,
    DockviewReadyEvent,
    IDockviewPanelProps,
    ISplitviewPanelProps,
} from '@/components/custom/dockview';
import { cn } from '@/lib/utils';
import Copilot from '../../copilot';
import Event from '../../event';
import Workflow from '../../workflow';
import PaneView from '../pane-view';

interface PanelProps extends React.PropsWithChildren {
    visbile: boolean;
}

const Panel = ({ visbile = false, children }: PanelProps) => {
    return (
        <div className={cn('absolute top-0 left-0 h-full w-full bg-secondary', visbile ? 'z-10' : 'z-0')}>
            {children}
        </div>
    );
}

const Default = (props: IDockviewPanelProps) => {
    return (
        <div style={{ height: '100%' }}>
            <div>{props.api.title}</div>
        </div>
    );
};

const components = {
    Default,
    PaneView
};

export default function SideView({ params }: ISplitviewPanelProps<{ active: string }>) {

    const onReady = (event: DockviewReadyEvent) => {
        const panelView = event.api.addPanel({
            id: 'pane-view',
            component: 'PaneView',
        });
        panelView.group.header.hidden = true;
    };

    return (
        <div className='relative h-full no-scrollbar'>
            <Panel visbile={'file' === params.active}>
                <DockviewReact
                    className='dockview-theme-abyss'
                    onReady={onReady}
                    components={components}
                    disableFloatingGroups
                    disableDnd
                />
            </Panel>
            <Panel visbile={'copilot' === params.active}>
                <Copilot />
            </Panel>
            <Panel visbile={'event' === params.active}>
                <Event />
            </Panel>
        </div>
    );
};
