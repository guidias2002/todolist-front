import { useMutation } from "@tanstack/react-query";
import { apiAxiosInstance, taskEndpoints } from "../config/api";

async function deleteTask(taskId: number, userId: number): Promise<void> {
    const url = taskEndpoints.TASK_DELETE(taskId, userId);
    await apiAxiosInstance.delete(url);
}

export default function useDeleteTask() {
    const { mutate } = useMutation({
        mutationFn: ({ taskId, userId }: { taskId: number; userId: number }) => deleteTask(taskId, userId),
    });

    return {
        deleteTask: mutate,
    };
}

