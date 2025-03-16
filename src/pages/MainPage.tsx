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

export default function MainPage() {
    const [selectedStatus, setSelectedStatus] = useState<SelectableTaskStatus>(SelectableTaskStatus.TODAS);
    const [shouldFetchByDueDate, setShouldFetchByDueDate] = useState<boolean>(false);

    const { isErrorTasksList, isLoadingTasksList, tasksList } = useTasksList(selectedStatus);
    const { isErrorTasksListByStatus, isLoadingTasksListByStatus, tasksListByStatus } = useTasksByStatus(selectedStatus);
    const { orderedTasksByDueDate, isErrorOrderTasksByDueDate, isLoadingOrderTasksByDueDate } = useOrderTasksByDueDate(shouldFetchByDueDate)

    const handleStatusChange = (status: SelectableTaskStatus) => {
        setShouldFetchByDueDate(false);
        setSelectedStatus(status);
    };

    const handleOrderTasksByDueDate = () => {
        setSelectedStatus(SelectableTaskStatus.TODAS)
        setShouldFetchByDueDate(true);
    };

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
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-semibold text-gray-800">Tarefas</h1>

                <div className="flex gap-2">
                    <FilterSelectByStatus onChange={handleStatusChange} selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus}/>
                    <OrderTasksByDueDate onOrder={handleOrderTasksByDueDate}/>
                </div>
            </div>

            <Divider />
            <TaskList tasksList={tasksToDisplay} error={isError} loading={isLoading} />
        </div>
    );
}