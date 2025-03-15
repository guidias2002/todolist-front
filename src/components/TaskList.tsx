import useTasksList from "../hooks/useTasksList.hook"
import CardTask from "./CardTask";

export default function TaskList() {

    const { isErrorTasksList, isLoadingTasksList, tasksList } = useTasksList();

    if (isLoadingTasksList) {
        return <div>ta com pressa? ta carregando</div>
    }

    if (isErrorTasksList || !tasksList) {
        return <div>deu erro nessa merda</div>
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasksList.map((task) => (
                <div className="h-[200px]">
                    <CardTask key={task.id} task={task} />
                </div>
            ))}
        </div>


    )
}