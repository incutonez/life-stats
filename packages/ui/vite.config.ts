import tailwindcss from "@tailwindcss/vite";
import basicSsl from "@vitejs/plugin-basic-ssl";
import vue from "@vitejs/plugin-vue";
import path from "path";
import svgLoader from "vite-svg-loader";

// https://vitejs.dev/config/
export default {
	// svgLoader is needed for material symbols
	plugins: [vue(), svgLoader(), tailwindcss(), basicSsl({
		name: "Life Stats",
	})],
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
