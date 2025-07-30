import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv, type UserConfig } from "vite";

export default defineConfig(({ mode }): UserConfig => {
	const env = loadEnv(mode, process.cwd(), "");
	const port = +env.VITE_PORT || 5173;

	return {
		plugins: [react(), tailwindcss()],
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
		},
		server: {
			port,
		},
	};
});
