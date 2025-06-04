import { type RouteRecordRaw } from "vue-router";
import {
	RouteJobApplication,
	RouteJobApplications,
	RouteJobCompanies,
	RouteJobCompanyApplication,
	RouteJobs, RouteJobsHistory,
} from "@/views/jobs/constants.ts";
import ViewApplication from "@/views/jobs/ViewApplication.vue";
import ViewApplications from "@/views/jobs/ViewApplications.vue";
import ViewCompanies from "@/views/jobs/ViewCompanies.vue";
import ViewJobsHistory from "@/views/jobs/ViewJobsHistory.vue";

export const JobRoutes: RouteRecordRaw = {
	path: "/jobs",
	name: RouteJobs,
	redirect: {
		name: RouteJobApplications,
	},
	children: [{
		path: "applications",
		name: RouteJobApplications,
		component: ViewApplications,
		children: [{
			path: ":applicationId",
			name: RouteJobApplication,
			component: ViewApplication,
			props: true,
		}],
	}, {
		path: "companies",
		name: RouteJobCompanies,
		component: ViewCompanies,
		children: [{
			path: "applications/:applicationId",
			name: RouteJobCompanyApplication,
			component: ViewApplication,
			props: true,
		}],
	}, {
		path: "history",
		name: RouteJobsHistory,
		component: ViewJobsHistory,
	}],
};
