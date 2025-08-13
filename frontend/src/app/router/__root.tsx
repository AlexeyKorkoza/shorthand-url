import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
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
			<TanStackRouterDevtools position="bottom-right" initialIsOpen={false} />
			<ReactQueryDevtools buttonPosition="top-right" />
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
	path: ROUTE_PATHS.createUrl,
	component: CreateShortUrlForm,
});

const viewUrlRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: ROUTE_PATHS.viewUrl,
	component: () => <div>View Url</div>,
});

const routeTree = rootRoute.addChildren([
	indexRoute,
	createUrlRoute,
	viewUrlRoute,
]);

const router = createRouter({ routeTree });

export { router };
