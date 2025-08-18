import { createRouter } from "@tanstack/react-router";

import { createUrlRoute } from "@/app/router/create-url.route.tsx";
import { indexRoute } from "@/app/router/index.route.tsx";
import { urlsRoute } from "@/app/router/urls.route.tsx";
import { viewUrlRoute } from "@/app/router/view-url.route.tsx";

const routeTree = indexRoute.addChildren([
	urlsRoute,
	createUrlRoute,
	viewUrlRoute,
]);

const router = createRouter({
	routeTree,
});

export { router };
