import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@query-keys/queryKeys";
import { ColumnType, Task } from "@appTypes/Task";
import { updateTask } from "./task-storage";

interface UpdateTaskPayload {
  id: string;
  title?: string;
  description?: string;
  column?: ColumnType;
}

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation<Task, Error, UpdateTaskPayload>({
    mutationFn: ({ id, ...data }) => Promise.resolve(updateTask(id, data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks.all });
    },
  });
};
