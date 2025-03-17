import { Alert, Button, Dialog, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Snackbar, TextField } from "@mui/material";
import { useState } from "react";
import { Task } from "../shared/types/Task";
import { TaskStatusEnum } from "../shared/enums/TaskStatusEnum";
import AddTaskIcon from '@mui/icons-material/AddTask';
import useCreatetASK from "../hooks/useCreateTask.hook";
import useCreateTask from "../hooks/useCreateTask.hook";

const statusLabels: Record<TaskStatusEnum, string> = {
    [TaskStatusEnum.PENDENTE]: "Pendente",
    [TaskStatusEnum.EM_ANDAMENTO]: "Em andamento",
    [TaskStatusEnum.CONCLUIDO]: "Concluído"
};

interface TaskFormProps {
    open: boolean;
    handleClose: () => void;
}


export default function TaskForm({ open, handleClose }: TaskFormProps) {
    const userIdLogged = JSON.parse(localStorage.getItem("user") || '{}').id;
    const { mutate: createTask } = useCreateTask();
    const [toast, setToast] = useState({ open: false, message: "", severity: "success" });
    const [formData, setFormData] = useState<Task>({
        title: "",
        description: "",
        status: TaskStatusEnum.PENDENTE,
        dueDate: "",
        userId: 0
    });

    const [errors, setErrors] = useState({
        title: "",
        description: "",
        status: "",
        dueDate: ""
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;

        if (!name) return;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: ""
        }));
    };

    const handleSelectChange = (event: SelectChangeEvent<TaskStatusEnum>) => {
        const { name, value } = event.target;

        if (!name) return;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value as TaskStatusEnum,
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: ""
        }));
    };


    const validate = () => {
        let newErrors = { title: "", description: "", status: "", dueDate: "" };
        let isValid = true;

        if (!formData.title) {
            newErrors.title = "O título é obrigatório.";
            isValid = false;
        }
        if (!formData.description) {
            newErrors.description = "A descrição é obrigatória.";
            isValid = false;
        }
        if (!formData.status) {
            newErrors.status = "O status é obrigatório.";
            isValid = false;
        }
        if (!formData.dueDate) {
            newErrors.status = "A data de vencimento é obrigatória.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = () => {
        if (!validate()) return;

        createTask({ newTask: formData, userId: userIdLogged }, {
            onSuccess: () => {
                setToast({ open: true, message: "Usuário cadastrado com sucesso!", severity: "success" });
                setFormData({ title: "", description: "", dueDate: "", status: TaskStatusEnum.PENDENTE });
                setErrors({ title: "", description: "", dueDate: "", status: "" });
                handleClose();
                window.location.reload();
            },
            onError: (error: any) => {
                setToast({ open: true, message: "Erro ao cadastrar tarefa!", severity: "error" });
            }
        });
    }

    return (
        <Dialog className="flex items-center justify-center min-h-screen" open={open} onClose={handleClose}>
            <div className="flex flex-col bg-white shadow-lg rounded-xl p-6 w-[500px] max-w-md gap-4">
                <div className="flex items-center justify-center gap-2">
                    <AddTaskIcon className="text-gray-700 text-3xl" />
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Cadastrar Tarefa
                    </h1>
                </div>

                <TextField
                    id="title"
                    name="title"
                    label="Título"
                    variant="outlined"
                    fullWidth
                    value={formData.title}
                    onChange={handleInputChange}
                    error={!!errors.title}
                    helperText={errors.title}
                />
                <TextField
                    id="description"
                    name="description"
                    label="Descrição"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    error={!!errors.description}
                    helperText={errors.description}
                />
                <TextField
                    id="dueDate"
                    name="dueDate"
                    variant="outlined"
                    fullWidth
                    type="date"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                    error={!!errors.dueDate}
                    helperText={errors.dueDate}
                />
                <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                        name="status"
                        value={formData.status}
                        onChange={handleSelectChange}
                        label="Status"
                    >
                        {Object.values(TaskStatusEnum).map((statusKey) => (
                            <MenuItem key={statusKey} value={statusKey}>
                                {statusLabels[statusKey]}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <div className="flex justify-end items-center gap-2">
                    <Button onClick={handleClose} variant="outlined">Cancelar</Button>
                    <Button onClick={handleSubmit} color="primary" variant="contained">Cadastrar</Button>
                </div>
            </div>

            <Snackbar
                open={toast.open}
                autoHideDuration={3000}
                onClose={() => setToast({ ...toast, open: false })}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert onClose={() => setToast({ ...toast, open: false })} severity={toast.severity as any} variant="filled">
                    {toast.message}
                </Alert>
            </Snackbar>
        </Dialog>
    )
}