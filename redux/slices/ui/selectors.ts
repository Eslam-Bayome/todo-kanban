import { RootState } from "@redux/index";
import { ColumnType } from "@appTypes/Task";

export const selectSearchTerm = (state: RootState) => state.ui.searchTerm;

export const selectColumnPage =
  (column: ColumnType) => (state: RootState) =>
    state.ui.columnPages[column];
