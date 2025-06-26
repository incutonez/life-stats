import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { readFileSync } from "fs";
import path from "path";
import { defineConfig } from "vite";
import svgLoader from "vite-svg-loader";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	return {
		// svgLoader is needed for material symbols
		plugins: [vue(), svgLoader(), tailwindcss(), {
			/* Taken from https://github.com/vitejs/vite/discussions/3456#discussioncomment-750002
			 * And https://vite.dev/guide/api-plugin#transformindexhtml */
			name: "transform-test-html",
			apply: "build",
			transformIndexHtml(html) {
				return html.replace("    <!-- Analytics Here -->", mode === "test" ? readFileSync("index.analytics.html", "utf8") : "");
			},
		}],
		build: {
			target: "esnext",
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
