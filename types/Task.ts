export type ColumnType = "backlog" | "in_progress" | "review" | "done";

export interface Task {
  id: string;
  title: string;
  description: string;
  column: ColumnType;
  createdAt: string;
  updatedAt: string;
}

export interface Column {
  id: ColumnType;
  label: string;
  color: string;
  tagColor: string;
}

export const COLUMNS: Column[] = [
  { id: "backlog", label: "Backlog", color: "#f5f5f5", tagColor: "default" },
  {
    id: "in_progress",
    label: "In Progress",
    color: "#e6f4ff",
    tagColor: "processing",
  },
  { id: "review", label: "Review", color: "#fff7e6", tagColor: "warning" },
  { id: "done", label: "Done", color: "#f6ffed", tagColor: "success" },
];

export const COLUMN_IDS: ColumnType[] = COLUMNS.map((c) => c.id);

export const PAGE_SIZE = 5;

export interface GetTasksResult {
  tasks: Task[];
  total: number;
  page: number;
  pageSize: number;
}
