import { createContext, useContext, useState } from "react";
import useLogin from "../hooks/useLogin.hook";
import { Login, LoginResponse } from "../shared/types/Login";
import { paths } from "../shared/paths";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
    user: LoginResponse | null;
    login: (credentials: Login) => void;
    logout: () => void;
    isPending: boolean;
    error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<LoginResponse | null>(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const { mutate, isPending } = useLogin();
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const login = (credentials: Login) => {
        mutate(credentials, {
            onSuccess: (data) => {
                setUser(data);
                setError(null);
                console.log("success")
                localStorage.setItem("user", JSON.stringify(data));
                navigate(paths.MAIN);
            },
            onError: () => {
                setError("Login inválido. Verifique suas credenciais.");
            },
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        navigate(paths.LOGIN);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isPending, error }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    return context;
}
