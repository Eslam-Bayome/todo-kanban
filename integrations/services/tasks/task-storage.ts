import { ColumnType, GetTasksResult, PAGE_SIZE, Task } from "@appTypes/Task";
import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "kanban-tasks";

export function getAllTasks(): Task[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  return JSON.parse(stored) as Task[];
}

function saveAllTasks(tasks: Task[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export interface GetTasksParams {
  column: ColumnType;
  page: number;
  pageSize?: number;
  search: string;
}

export function getTasksByColumn({
  column,
  page,
  pageSize = PAGE_SIZE,
  search,
}: GetTasksParams): GetTasksResult {
  const allTasks = getAllTasks();
  const searchLower = search.toLowerCase();

  const filtered = allTasks.filter((task) => {
    const matchesColumn = task.column === column;
    const matchesSearch =
      search === "" ||
      task.title.toLowerCase().includes(searchLower) ||
      task.description.toLowerCase().includes(searchLower);
    return matchesColumn && matchesSearch;
  });

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const tasks = filtered.slice(start, start + pageSize);

  return { tasks, total, page, pageSize };
}

export function createTask(
  data: Omit<Task, "id" | "createdAt" | "updatedAt">,
): Task {
  const allTasks = getAllTasks();
  const newTask: Task = {
    ...data,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  saveAllTasks([...allTasks, newTask]);
  return newTask;
}

export function updateTask(
  id: string,
  data: Partial<Omit<Task, "id" | "createdAt">>,
): Task {
  const allTasks = getAllTasks();
  const index = allTasks.findIndex((t) => t.id === id);
  if (index === -1) throw new Error(`Task ${id} not found`);

  const updatedTask: Task = {
    ...allTasks[index]!,
    ...data,
    updatedAt: new Date().toISOString(),
  };
  const updatedTasks = [...allTasks];
  updatedTasks[index] = updatedTask;
  saveAllTasks(updatedTasks);
  return updatedTask;
}

export function deleteTask(id: string): void {
  const allTasks = getAllTasks();
  const filtered = allTasks.filter((t) => t.id !== id);
  saveAllTasks(filtered);
}
