import { Button, IconButton, InputAdornment, TextField, CircularProgress } from "@mui/material";
import { useState } from "react";
import { Login } from "../shared/types/Login";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "../providers/AuthProvider";

export default function UserLoginForm() {
    const { login, isPending, error } = useAuth();
    const [formData, setFormData] = useState<Login>({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = () => {
        if (!validate()) return;

        login(formData); 
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
        setErrors({ ...errors, [event.target.name]: "" });
    };

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    const validate = () => {
        let newErrors = { email: "", password: "" };
        let isValid = true;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

    return (
        <div className="flex flex-col gap-4 w-96">
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
                disabled={isPending} 
            >
                {isPending ? <CircularProgress size={24} color="inherit" /> : "Entrar"}
            </Button>
            {error && (
                <div style={{ color: 'red', marginTop: '8px' }}>
                    {error}
                </div>
            )}
        </div>
    );
}
