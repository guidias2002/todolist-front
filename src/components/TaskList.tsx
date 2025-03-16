import { Task } from "../shared/types/Task";
import CardTask from "./CardTask";
import EmptyList from "./EmptyList";
import ErrorMessage from "./ErrorMessage";
import Loading from "./Loading";

interface TaskListProps {
    tasksList: Task[];
    error: boolean;
    loading: boolean;
}

export default function TaskList({ tasksList, error, loading }: TaskListProps) {

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <ErrorMessage message="Ocorreu um problema ao buscar a lista de tarefas. Por favor tente novamente mais tarde." />
    }

    if (tasksList.length == 0) {
        return <EmptyList />;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasksList.map((task) => (
                <div className="h-[200px]">
                    <CardTask key={task.id} task={task} />
                </div>
            ))}
        </div>


    )
}