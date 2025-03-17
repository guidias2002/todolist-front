import { useMutation } from "@tanstack/react-query";
import { apiAxiosInstance, taskEndpoints } from "../config/api";
import { Task } from "../shared/types/Task";

async function createTask({ newTask, userId }: { newTask: Task; userId: number }): Promise<void> {
    const url = taskEndpoints.TASK_CREATE(userId);
    await apiAxiosInstance.post<Task>(url, newTask);
}

export default function useCreateTask() {
    const { isPending, isError, isSuccess, mutate } = useMutation({
        mutationKey: ['createTask'],
        mutationFn: createTask
    });

    return { isPending, isError, isSuccess, mutate }
}
