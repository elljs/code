import { cn } from "@/lib/utils";

interface ContainerProps extends React.PropsWithChildren {
    visbile: boolean;
}

const Container = ({ visbile = false, children }: ContainerProps) => {
    return (
        <div className={cn('absolute top-0 left-0 h-full w-full bg-secondary', visbile ? 'z-10' : 'z-0')}>
            {children}
        </div>

    );
}

export { Container };