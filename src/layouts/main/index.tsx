import KeepAlive, { useKeepaliveRef } from "keepalive-for-react";
import { LoaderCircle } from "lucide-react";
import { Suspense, useMemo } from "react";
import { useLocation, useOutlet } from "react-router-dom";

export default function MainLayout() {
	const location = useLocation();
	const aliveRef = useKeepaliveRef();
	const outlet = useOutlet();

	const currentCacheKey = useMemo(() => {
		return location.pathname + location.search;
	}, [location.pathname, location.search]);

	return (
		<div className="w-full h-screen overflow-x-hidden bg-accent text-accent-foreground">
			<main className="h-layout">
				<KeepAlive
					transition
					aliveRef={aliveRef}
					activeCacheKey={currentCacheKey}
					max={18}
				>
					<Suspense
						fallback={
							<div className="flex justify-center items-center bg-secondary p-10">
								<LoaderCircle className="animate-spin" />
							</div>
						}
					>
						{outlet}
					</Suspense>
				</KeepAlive>
			</main>
		</div>
	);
}
