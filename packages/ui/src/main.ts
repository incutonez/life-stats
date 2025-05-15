import "@/style.css";
import { createApp } from "vue";
import { provideStoreToApp } from "@reduxjs/vue-redux";
import { VueQueryPlugin } from "@tanstack/vue-query";
import App from "@/App.vue";
import { router } from "@/router.ts";
import { reduxStore } from "@/stores/main.ts";

const app = createApp(App);
app.use(router);
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
app.mount("#app");
