import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ColumnType } from "@appTypes/Task";
import { initialUiState, UiState } from "./ui-state";

const uiSlice = createSlice({
  name: "ui",
  initialState: initialUiState,
  reducers: {
    setSearchTerm(state: UiState, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
      state.columnPages = { backlog: 1, in_progress: 1, review: 1, done: 1 };
    },
    setColumnPage(
      state: UiState,
      action: PayloadAction<{ column: ColumnType; page: number }>,
    ) {
      state.columnPages[action.payload.column] = action.payload.page;
    },
    resetPages(state: UiState) {
      state.columnPages = { backlog: 1, in_progress: 1, review: 1, done: 1 };
    },
  },
});

export const { setSearchTerm, setColumnPage, resetPages } = uiSlice.actions;
export default uiSlice;
