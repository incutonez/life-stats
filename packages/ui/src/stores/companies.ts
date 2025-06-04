import type { CompanyFullViewModel, CompanyViewModel } from "@incutonez/life-stats-spec";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ICompanyStoreState {
	records: CompanyViewModel[];
	recordsFull: CompanyFullViewModel[];
}

const initialState: ICompanyStoreState = {
	records: [],
	recordsFull: [],
};

// TDOOJEF: Refactor this, so we don't need Redux... it's not necessary as we simply export data or provide/inject it
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
