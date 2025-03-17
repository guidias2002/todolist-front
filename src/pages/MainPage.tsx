import FilterSelectByStatus from "../components/FilterSelectByStatus";
import TaskList from "../components/TaskList";
import Divider from '@mui/material/Divider';
import useTasksList from "../hooks/useTasksList.hook";
import { useState } from "react";
import useTasksByStatus from "../hooks/useTasksByStatus.hook";
import OrderTasksByDueDate from "../components/OrderTasksByDueDate";
import { Task } from "../shared/types/Task";
import useOrderTasksByDueDate from "../hooks/useOrderTasksByDueDate.hook";
import { SelectableTaskStatus } from "../shared/enums/TaskStatusEnum";
import { Button } from "@mui/material";
import { useAuth } from "../providers/AuthProvider";

export default function MainPage() {
    const [selectedStatus, setSelectedStatus] = useState<SelectableTaskStatus>(SelectableTaskStatus.TODAS);
    const [shouldFetchByDueDate, setShouldFetchByDueDate] = useState<boolean>(false);

    const { isErrorTasksList, isLoadingTasksList, tasksList } = useTasksList(selectedStatus);
    const { isErrorTasksListByStatus, isLoadingTasksListByStatus, tasksListByStatus } = useTasksByStatus(selectedStatus);
    const { orderedTasksByDueDate, isErrorOrderTasksByDueDate, isLoadingOrderTasksByDueDate } = useOrderTasksByDueDate(shouldFetchByDueDate)
    const { logout } = useAuth();

    const handleStatusChange = (status: SelectableTaskStatus) => {
        setShouldFetchByDueDate(false);
        setSelectedStatus(status);
    };

    const handleOrderTasksByDueDate = () => {
        setSelectedStatus(SelectableTaskStatus.TODAS)
        setShouldFetchByDueDate(true);
    };

    const handleLogout = () => {
        logout();
    }

    let tasksToDisplay: Task[] = [];
    let isError: boolean = false;
    let isLoading: boolean = false;

    if (selectedStatus === SelectableTaskStatus.TODAS && !shouldFetchByDueDate) {
        tasksToDisplay = tasksList || [];
        isLoading = isLoadingTasksList;
        isError = isErrorTasksList;
    }
    if (selectedStatus !== SelectableTaskStatus.TODAS) {
        tasksToDisplay = tasksListByStatus || [];
        isLoading = isLoadingTasksListByStatus;
        isError = isErrorTasksListByStatus;
    }
    if (shouldFetchByDueDate) {
        tasksToDisplay = orderedTasksByDueDate || [];
        isLoading = isLoadingOrderTasksByDueDate;
        isError = isErrorOrderTasksByDueDate;
    }

    return (
        <div className="flex flex-col gap-4 p-4">
            <div className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-4">
                <h1 className="text-3xl font-semibold text-gray-800">Tarefas</h1>

                <div className="flex flex-wrap justify-start sm:justify-end items-center gap-4 w-full sm:w-auto max-w-lg">
                    <FilterSelectByStatus
                        onChange={handleStatusChange}
                        selectedStatus={selectedStatus}
                        setSelectedStatus={setSelectedStatus}
                    />
                    <OrderTasksByDueDate onOrder={handleOrderTasksByDueDate} />
                </div>
            </div>


            <Divider />
            <TaskList tasksList={tasksToDisplay} error={isError} loading={isLoading} />
            <Button onClick={handleLogout}>Sair</Button>
        </div>
    );
}