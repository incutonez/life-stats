import tailwindcss from "@tailwindcss/vite";
import basicSsl from "@vitejs/plugin-basic-ssl";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";
import svgLoader from "vite-svg-loader";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	return {
		base: mode === "GitHubPages" ? "/life-stats/" : "",
		// svgLoader is needed for material symbols
		plugins: [vue(), svgLoader(), tailwindcss(), basicSsl({
			name: "Life Stats",
		})],
		build: {
			target: "esnext",
		},
		server: {
			host: true,
		},
		resolve: {
			alias: [{
				// Add ability to use @ to represent the root dir being src
				find: "@",
				replacement: path.resolve(path.resolve(), "./src"),
			}, {
				/* This is necessary for mime-type
				 * Source: https://github.com/jshttp/mime-types/issues/124 */
				find: "path",
				replacement: "path-browserify",
			}],
		},
	};
});
