import { createRoute } from "@tanstack/react-router";
import { indexRoute } from "@/app/router/index.route.tsx";
import { CreateShortUrlForm } from "@/pages/create-url/ui/CreateShortUrlForm";
import { ROUTE_PATHS } from "@/shared/routes";

export const createUrlRoute = createRoute({
	getParentRoute: () => indexRoute,
	path: ROUTE_PATHS.createUrl,
	component: CreateShortUrlForm,
});
