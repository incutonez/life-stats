import type { CompanyFullViewModel, CompanyViewModel } from "@incutonez/job-applications-openapi";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ICompanyStoreState {
	records: CompanyViewModel[];
	recordsFull: CompanyFullViewModel[];
}

const initialState: ICompanyStoreState = {
	records: [],
	recordsFull: [],
};

export const companiesStore = createSlice({
	initialState,
	name: "companies",
	reducers: {
		setCompanyRecords(state, { payload }: PayloadAction<CompanyViewModel[]>) {
			state.records = payload;
		},
		setCompanyFullRecords(state, { payload }: PayloadAction<CompanyFullViewModel[]>) {
			state.recordsFull = payload;
		},
	},
	selectors: {
		getCompanyRecords(state) {
			return state.records;
		},
		getCompanyFullRecords(state) {
			return state.recordsFull;
		},
	},
});

export const { setCompanyRecords, setCompanyFullRecords } = companiesStore.actions;

export const { getCompanyRecords, getCompanyFullRecords } = companiesStore.selectors;
