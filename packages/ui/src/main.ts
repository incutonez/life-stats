import "@/style.css";
import "highlight.js/styles/github.css";
import { createApp } from "vue";
import { provideStoreToApp } from "@reduxjs/vue-redux";
import { VueQueryPlugin } from "@tanstack/vue-query";
import App from "@/App.vue";
import { auth0, checkSession } from "@/authentication.ts";
import { router } from "@/router.ts";
import { reduxStore } from "@/stores/main.ts";

const app = createApp(App);
app.use(auth0);
/* Very first thing we do is check to see if we've got an existing session... this helps to determine where we should
 * first land in the app, and it gives us the control instead of cycling routes for users with an active session */
await checkSession();
app.use(VueQueryPlugin, {
	queryClientConfig: {
		defaultOptions: {
			queries: {
				staleTime: 120000,
				refetchOnWindowFocus: false,
			},
		},
	},
});
provideStoreToApp(app, {
	store: reduxStore,
});
app.use(router);
app.mount("#app");
