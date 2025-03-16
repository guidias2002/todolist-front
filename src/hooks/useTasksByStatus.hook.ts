import { useQuery } from "@tanstack/react-query";
import { apiAxiosInstance, taskEndpoints } from "../config/api";
import { Task } from "../shared/types/Task";

async function listAllTasksByStatus(selectedStatus: string): Promise<Task[]> {
    const response = await apiAxiosInstance.get(taskEndpoints.TASKS_FINDALL_BY_STATUS + selectedStatus);

    return response.data;
}

export default function useTasksByStatus(selectedStatus: string) {
    const { isLoading, isError, data } = useQuery({
        queryKey: ['taskByStatus', selectedStatus],
        queryFn: () => listAllTasksByStatus(selectedStatus),
        enabled: selectedStatus !== "TODAS" 
    });

    return {
        isLoadingTasksListByStatus: isLoading,
        isErrorTasksListByStatus: isError,
        tasksListByStatus: data
    };
}