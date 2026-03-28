import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@query-keys/queryKeys";
import { ColumnType, GetTasksResult, PAGE_SIZE } from "@appTypes/Task";
import { getTasksByColumn } from "./task-storage";

interface UseGetTasksParams {
  column: ColumnType;
  page: number;
  search: string;
}

export const useGetTasks = ({ column, page, search }: UseGetTasksParams) => {
  const { data, isLoading, isFetching, refetch } =
    useQuery<GetTasksResult>({
      queryKey: queryKeys.tasks.byColumn(column, page, search),
      queryFn: () =>
        getTasksByColumn({ column, page, pageSize: PAGE_SIZE, search }),
      staleTime: 30 * 1000,
    });

  return {
    tasks: data?.tasks ?? [],
    total: data?.total ?? 0,
    isLoading,
    isFetching,
    refetch,
  };
};
