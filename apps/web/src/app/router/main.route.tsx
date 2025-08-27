import { createRoute, Navigate } from "@tanstack/react-router";
import { indexRoute } from "@/app/router/index.route.tsx";
import { ROUTE_PATHS } from "@/shared/routes";

export const mainRoute = createRoute({
	getParentRoute: () => indexRoute,
	path: ROUTE_PATHS.main,
	component: () => <Navigate to={ROUTE_PATHS.urls} params />,
});
