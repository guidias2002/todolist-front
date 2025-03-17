import { createContext, useContext, useState } from "react";
import useLogin from "../hooks/useLogin.hook";
import { Login, LoginResponse } from "../shared/types/Login";
import { paths } from "../shared/paths";

interface AuthContextType {
    user: LoginResponse | null;
    login: (credentials: Login) => void;
    logout: () => void;
    isPending: boolean;
    error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<LoginResponse | null>(null);

    const { mutate, isPending } = useLogin();
    const [error, setError] = useState<string | null>(null);

    const login = (credentials: Login) => {
        mutate(credentials, {
            onSuccess: (data) => {
                setUser(data);
                setError(null);
                console.log("success")
                localStorage.setItem("user", JSON.stringify(data));
                window.location.href = paths.MAIN;
            },
            onError: () => {
                setError("Login inválido. Verifique suas credenciais.");
            },
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        window.location.href = paths.LOGIN;
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
