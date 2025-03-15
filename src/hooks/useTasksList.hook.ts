import { useQuery } from "@tanstack/react-query";
import { apiAxiosInstance, taskEndpoints } from "../config/api";
import { Task } from "../shared/types/Task";

async function listAllTasks(): Promise<Task[]> {
    const response = await apiAxiosInstance.get(taskEndpoints.TASKS_FINDALL);

    return response.data;
}

export default function useTasksList() {
    const { isLoading, isError, data } = useQuery({
        queryKey: ['tasksList'],
        queryFn: listAllTasks,
    });

    return {
        isLoadingTasksList: isLoading,
        isErrorTasksList: isError,
        tasksList: data
    };
}