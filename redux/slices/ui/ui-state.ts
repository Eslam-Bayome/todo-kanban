import { ColumnType } from "@appTypes/Task";

export interface UiState {
  searchTerm: string;
  columnPages: Record<ColumnType, number>;
}

export const initialUiState: UiState = {
  searchTerm: "",
  columnPages: {
    backlog: 1,
    in_progress: 1,
    review: 1,
    done: 1,
  },
};
