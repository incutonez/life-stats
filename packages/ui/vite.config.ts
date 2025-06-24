import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";
import svgLoader from "vite-svg-loader";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	return {
		// svgLoader is needed for material symbols
		plugins: [vue(), svgLoader(), tailwindcss()],
		build: {
			target: "esnext",
			rollupOptions: {
				input: mode === "test" ? "index.test.html" : "index.html",
				output: {
					"index.test.html": "index.html",
					assetFileNames: "assets/index[extname]",
					chunkFileNames: "assets/index.[hash].js",
					entryFileNames: "assets/index.js",
				},
			},
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
