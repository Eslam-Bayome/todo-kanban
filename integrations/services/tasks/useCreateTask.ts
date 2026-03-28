import { ColumnType, Task } from "@appTypes/Task";
import { queryKeys } from "@query-keys/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createTask } from "./task-storage";

interface CreateTaskPayload {
  title: string;
  description: string;
  column: ColumnType;
}

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation<Task, Error, CreateTaskPayload>({
    mutationFn: (payload) => Promise.resolve(createTask(payload)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks.all });
    },
  });
};
