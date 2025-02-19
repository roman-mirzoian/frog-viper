import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		host: "0.0.0.0",
		port: 8080,
		proxy: {
			"/socket.io": {
				target: "http://localhost:3000",
				ws: true,
				changeOrigin: true,
			},
		},
	},
});
