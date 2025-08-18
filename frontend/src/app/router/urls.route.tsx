import { createRoute } from "@tanstack/react-router";
import { indexRoute } from "@/app/router/index.route.tsx";
import { UrlList } from "@/pages/url-list/ui/UrlList";
import { ROUTE_PATHS } from "@/shared/routes";

export const urlsRoute = createRoute({
	getParentRoute: () => indexRoute,
	path: ROUTE_PATHS.urls,
	component: UrlList,
});
