import { type ApplicationViewModel } from "@incutonez/life-stats-spec";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface IApplicationState {
	applications: ApplicationViewModel[];
	selectedApplication?: ApplicationViewModel;
}

const initialState: IApplicationState = {
	applications: [],
};

// TDOOJEF: Refactor this, so we don't need Redux... it's not necessary as we simply export data or provide/inject it
export const applicationsSlice = createSlice({
	initialState,
	name: "applications",
	reducers: {
		setApplicationRecords(state, { payload }: PayloadAction<ApplicationViewModel[] | undefined>) {
			state.applications = payload ?? [];
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

export const { setApplicationRecords } = applicationsSlice.actions;

export const { getApplicationRecords } = applicationsSlice.selectors;
