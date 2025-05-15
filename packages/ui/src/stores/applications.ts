import { type ApplicationViewModel } from "@incutonez/job-applications-openapi";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface IApplicationState {
	applications: ApplicationViewModel[];
	selectedApplication?: ApplicationViewModel;
}

const initialState: IApplicationState = {
	applications: [],
};

export const applicationsSlice = createSlice({
	initialState,
	name: "applications",
	reducers: {
		setApplicationRecords(state, { payload }: PayloadAction<ApplicationViewModel[] | undefined>) {
			state.applications = payload ?? [];
		},
		setApplicationRecord(state, { payload }: PayloadAction<ApplicationViewModel | undefined>) {
			state.selectedApplication = payload;
		},
	},
	selectors: {
		getApplicationRecords(state) {
			return state.applications;
		},
		getApplicationRecord(state) {
			return state.selectedApplication;
		},
	},
});

export const { setApplicationRecords, setApplicationRecord } = applicationsSlice.actions;

export const { getApplicationRecords, getApplicationRecord } = applicationsSlice.selectors;
