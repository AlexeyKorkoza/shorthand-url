import { createRoute } from "@tanstack/react-router";
import { indexRoute } from "@/app/router/index.route.tsx";
import { ViewUrl } from "@/pages/view-url/ui/ViewUrl";
import { ROUTE_PATHS } from "@/shared/routes";

export const viewUrlRoute = createRoute({
	getParentRoute: () => indexRoute,
	path: ROUTE_PATHS.viewUrl,
	component: ViewUrl,
});
