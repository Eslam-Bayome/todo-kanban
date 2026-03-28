import { ColumnType } from "@appTypes/Task";

export const queryKeys = {
  tasks: {
    all: ["tasks"] as const,
    byColumn: (
      column: ColumnType,
      page: number,
      search: string,
    ) => ["tasks", column, page, search] as const,
  },
};
