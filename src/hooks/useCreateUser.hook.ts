import { useMutation } from "@tanstack/react-query";
import { apiAxiosInstance, userEndpoints } from "../config/api";
import { User } from "../shared/types/User";

async function createUser(newUser: User): Promise<void> {
    await apiAxiosInstance.post<User>(userEndpoints.CREATE_USER, newUser);
}

export default function useCreateUser() {
    const { isPending, isError, isSuccess, mutate } = useMutation({
        mutationKey: ['createUser'],
        mutationFn: createUser
    });

    return { isPending, isError, isSuccess, mutate }
}
