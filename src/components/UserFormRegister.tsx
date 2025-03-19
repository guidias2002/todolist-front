import { Alert, Button, IconButton, InputAdornment, Snackbar, TextField } from "@mui/material";
import useCreateUser from "../hooks/useCreateUser.hook";
import { User } from "../shared/types/User";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function UserFormRegister() {
    const [formData, setFormData] = useState<User>({
        name: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

    const { mutate: createUser, isPending: isLoadingCreateUser } = useCreateUser();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
        setErrors({ ...errors, [event.target.name]: "" });
    };

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    const validate = () => {
        let newErrors = { name: "", email: "", password: "" };
        let isValid = true;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.name) {
            newErrors.name = "O nome é obrigatório.";
            isValid = false;
        }
        if (!formData.email) {
            newErrors.email = "O email é obrigatório.";
            isValid = false;
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Formato de email inválido.";
            isValid = false;
        }
        if (!formData.password) {
            newErrors.password = "A senha é obrigatória.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = () => {
        if (!validate()) return;

        createUser(formData, {
            onSuccess: () => {
                setToast({ open: true, message: "Usuário cadastrado com sucesso!", severity: "success" });
                setFormData({ name: "", email: "", password: "" });
                setErrors({ name: "", email: "", password: "" });
            },
            onError: (error: any) => {
                if (error.response?.data?.message?.includes("Email")) {
                    setErrors((prev) => ({ ...prev, email: "Este email já está em uso." }));
                } else {
                    setToast({ open: true, message: "Erro ao cadastrar usuário!", severity: "error" });
                }
            }
        });
    };

    return (
        <div className="flex flex-col gap-4 w-full max-w-sm">
            <TextField
                id="name"
                name="name"
                label="Nome"
                variant="outlined"
                fullWidth
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
            />
            <TextField
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
            />
            <TextField
                id="password"
                name="password"
                label="Senha"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleTogglePassword} edge="end">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={isLoadingCreateUser}
            >
                {isLoadingCreateUser ? "Cadastrando..." : "Cadastrar"}
            </Button>

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
        </div>
    );
}