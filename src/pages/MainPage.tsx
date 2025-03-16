import FilterSelectByStatus from "../components/FilterSelectByStatus";
import TaskList from "../components/TaskList";
import Divider from '@mui/material/Divider';
import useTasksList from "../hooks/useTasksList.hook";
import { useState } from "react";
import useTasksByStatus from "../hooks/useTasksByStatus.hook";
import OrderTasksByDueDate from "../components/OrderTasksByDueDate";
import { Task } from "../shared/types/Task";

export default function MainPage() {
    const [selectedStatus, setSelectedStatus] = useState("TODAS");
    const [orderedTasks, setOrderedTasks] = useState<Task[] | null>(null);

    const { isErrorTasksList, isLoadingTasksList, tasksList } = useTasksList(selectedStatus);
    const { isErrorTasksListByStatus, isLoadingTasksListByStatus, tasksListByStatus } = useTasksByStatus(selectedStatus);

    const handleStatusChange = (status: string) => {
        setSelectedStatus(status);
        setOrderedTasks(null);
    };

    const handleOrderTasks = (tasks: Task[]) => {
        setOrderedTasks(tasks);
    };

    const tasksToDisplay = selectedStatus === "TODAS" ? tasksList : tasksListByStatus;
    const isError = selectedStatus === "TODAS" ? isErrorTasksList : isErrorTasksListByStatus;
    const isLoading = selectedStatus === "TODAS" ? isLoadingTasksList : isLoadingTasksListByStatus;

    return (
        <div className="flex flex-col gap-4 p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-semibold text-gray-800">Tarefas</h1>

                <div className="flex gap-2">
                    <FilterSelectByStatus onChange={handleStatusChange} />
                    <OrderTasksByDueDate onOrder={handleOrderTasks} />
                </div>
            </div>

            <Divider />
            <TaskList tasksList={tasksToDisplay || []} error={isError} loading={isLoading} />
        </div>
    );
}