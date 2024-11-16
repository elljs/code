import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
	{
		index: true,
		path: "/",
		lazy: async () => ({
			Component: (await import("@/workspace")).default,
		}),
	},
]);

export default router;
