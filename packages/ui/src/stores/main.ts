import { type Action, combineSlices, configureStore, type ThunkAction, type UnknownAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "@reduxjs/vue-redux";
import { applicationsSlice } from "@/stores/applications.ts";
import { companiesStore } from "@/stores/companies.ts";

export type AppThunk<TAction extends Action = UnknownAction> = ThunkAction<void, RootState, unknown, TAction>;

export type RootState = ReturnType<typeof reduxStore.getState>;

export const useAppSelector = useSelector.withTypes<RootState>();

export const useAppDispatch = useDispatch.withTypes<typeof reduxStore.dispatch>();

export const reduxStore = configureStore({
	reducer: combineSlices(applicationsSlice, companiesStore),
});
