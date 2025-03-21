import { Task } from "../shared/types/Task"
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { Alert, Divider, Snackbar } from "@mui/material";
import useDeleteTask from "../hooks/useDeleteTask";
import { useState } from "react";
import TaskUpdateForm from "./TaskUpdateForm";

interface CardTaskProps {
    task: Task;
}

export default function CardTask({ task }: CardTaskProps) {
    const userIdLogged = JSON.parse(localStorage.getItem("user") || '{}').id;
    const [toast, setToast] = useState({ open: false, message: "", severity: "success" });
    const [openForm, setOpenForm] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState<Task>();

    const { deleteTask } = useDeleteTask();

    const handleDeleteTask = (taskId: number, userId: number) => {
        if (userId !== task.userId) {
            setToast({ open: true, message: "Apenas o criador da tarefa pode exclui-lá.", severity: "error" });
            return;
        }

        deleteTask({ taskId, userId });
        window.location.reload();
        setToast({ open: true, message: "Tarefa excluída.", severity: "success" });
    }

    const handleOpenEditForm = (taskId: number, userId: number) => {
        if (task.userId !== userIdLogged) {
            setToast({ open: true, message: "Apenas o criador da tarefa pode editá-la.", severity: "error" });
            return;
        }

        setTaskToEdit(task);
        setOpenForm(true);
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        setTaskToEdit(undefined);
    };

    return (
        <div className="flex flex-col justify-between h-full p-4 bg-white rounded-2xl shadow-md border border-gray-200">
            <div className="overflow-hidden flex flex-col gap-3">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">{task.title}</h3>
                    <span
                        className={`py-1 px-3 rounded-full text-xs font-medium ${task.status === "CONCLUIDO"
                            ? "bg-green-100 text-green-800"
                            : task.status === "EM_ANDAMENTO"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                    >
                        {task.status === "CONCLUIDO"
                            ? "Concluído"
                            : task.status === "EM_ANDAMENTO"
                                ? "Em andamento"
                                : "Pendente"}
                    </span>
                </div>
                <Divider />
                <p className="text-sm text-gray-600 line-clamp-3">
                    {task.description}
                </p>
            </div>

            <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
                <div>
                    <p className="font-semibold text-gray-800">Data de vencimento</p>
                    <p>{task.dueDate}</p>
                </div>

                <div className="flex gap-3">
                    <BorderColorTwoToneIcon
                        onClick={() => {
                            if (task.id !== undefined && userIdLogged !== undefined) {
                                handleOpenEditForm(task.id, userIdLogged);
                            }
                        }}
                        className="text-black text-3xl cursor-pointer p-1 rounded-md hover:bg-gray-200 transition"
                    />
                    <DeleteTwoToneIcon
                        onClick={() => {
                            if (task.id !== undefined && userIdLogged !== undefined) {
                                handleDeleteTask(task.id, userIdLogged);
                            }
                        }}
                        className="text-red-600 text-3xl cursor-pointer p-1 rounded-md hover:bg-red-100 transition"
                    />
                </div>
            </div>

            {openForm && taskToEdit && (
                <TaskUpdateForm
                    open={openForm}
                    handleCloseForm={handleCloseForm}
                    task={taskToEdit}
                />
            )}

            <Snackbar
                open={toast.open}
                autoHideDuration={3000}
                onClose={() => setToast({ ...toast, open: false })}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert onClose={() => setToast({ ...toast, open: false })} severity={toast.severity as any} variant="filled">
                    {toast.message}
                </Alert>
            </Snackbar>
        </div>

    )
}