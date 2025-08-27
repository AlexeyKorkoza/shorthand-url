import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const indexRoute = createRootRoute({
	component: () => (
		<>
			<Outlet />
			<TanStackRouterDevtools position="bottom-right" initialIsOpen={false} />
			<ReactQueryDevtools buttonPosition="top-right" />
		</>
	),
});
