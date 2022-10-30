import { defineConfig } from "vite";
import { ViteAliases } from "vite-aliases";
import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [ViteAliases(), svgr(), react()],
	base: "/rock-paper-scissors/",
});
