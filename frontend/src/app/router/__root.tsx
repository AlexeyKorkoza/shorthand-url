import {
	createRootRoute,
	createRoute,
	createRouter,
	Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { CreateShortUrlForm } from "@/pages/create-url/ui/CreateShortUrlForm";
import { UrlList } from "@/pages/url-list/ui/UrlList";
import { ROUTE_PATHS } from "@/shared/routes";

const rootRoute = createRootRoute({
	component: () => (
		<>
			<Outlet />
			<TanStackRouterDevtools initialIsOpen={false} />
		</>
	),
});

const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: ROUTE_PATHS.main,
	component: UrlList,
});

const createUrlRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: ROUTE_PATHS.new,
	component: CreateShortUrlForm,
});

const routeTree = rootRoute.addChildren([indexRoute, createUrlRoute]);

const router = createRouter({ routeTree });

export { router };
