import { useQuery } from "@tanstack/react-query";
import { apiAxiosInstance, taskEndpoints } from "../config/api";
import { Task } from "../shared/types/Task";

async function listAllTasks(): Promise<Task[]> {
    const response = await apiAxiosInstance.get(taskEndpoints.TASKS_FINDALL);

    return response.data;
}

export default function useTasksList(selectedStatus: string) {
    const { isLoading, isError, data } = useQuery({
        queryKey: ['tasksList'],
        queryFn: listAllTasks,
        enabled: selectedStatus === "TODAS"
    });

    return {
        isLoadingTasksList: isLoading,
        isErrorTasksList: isError,
        tasksList: data
    };
}