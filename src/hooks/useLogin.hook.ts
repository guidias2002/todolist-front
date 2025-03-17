import { useMutation } from "@tanstack/react-query";
import { apiAxiosInstance, userEndpoints } from "../config/api";
import { Login, LoginResponse } from "../shared/types/Login";

async function loginUser(email: string, password: string): Promise<LoginResponse> {
    const response = await apiAxiosInstance.get<LoginResponse>(userEndpoints.LOGIN, {
        params: { email, password },
    });
    return response.data;
}

export default function useLogin() {
    return useMutation({
        mutationFn: ({ email, password }: Login) => loginUser(email, password),
    });
}
