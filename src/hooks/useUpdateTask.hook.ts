import { useMutation } from "@tanstack/react-query";
import { apiAxiosInstance, taskEndpoints } from "../config/api";
import { Task } from "../shared/types/Task";
import { TaskUpdate } from "../shared/types/TaskUpdate";

async function updateTask({ taskUpdate, taskId, userId }: { taskUpdate: TaskUpdate; taskId: number; userId: number }): Promise<void> {
    const url = taskEndpoints.TASK_UPDATE(taskId, userId);
    await apiAxiosInstance.patch<Task>(url, taskUpdate);
}

export default function useUpdateTask() {
    const { isPending, isError, isSuccess, mutate } = useMutation({
        mutationKey: ['updateTask'],
        mutationFn: updateTask
    });

    return { isPending, isError, isSuccess, mutate }
}
