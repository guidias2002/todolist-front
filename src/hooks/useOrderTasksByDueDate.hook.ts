import { useQuery } from "@tanstack/react-query";
import { apiAxiosInstance, taskEndpoints } from "../config/api";
import { Task } from "../shared/types/Task";

async function orderTasksByDueDate(): Promise<Task[]> {
    const response = await apiAxiosInstance.get(taskEndpoints.TASKS_ORDER_BY_DUEDATE);

    return response.data;
}

export default function useOrderTasksByDueDate(shouldFetch: boolean) {
    const { isLoading, isError, data } = useQuery({
        queryKey: ["orderTasksByDueDate"],
        queryFn: orderTasksByDueDate,
        enabled: shouldFetch,
    });

    return {
        isLoadingOrderTasksByDueDate: isLoading,
        isErrorOrderTasksByDueDate: isError,
        orderedTasks: data,
    };
}