import { combineSlices, configureStore } from "@reduxjs/toolkit";
import uiSlice from "./slices/ui";
import { UiState } from "./slices/ui/ui-state";

const rootReducer = combineSlices(uiSlice);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = {
  ui: UiState;
};

export type AppDispatch = typeof store.dispatch;
