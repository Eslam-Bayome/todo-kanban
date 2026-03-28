import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@query-keys/queryKeys";
import { deleteTask } from "./task-storage";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (id) => Promise.resolve(deleteTask(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks.all });
    },
  });
};
