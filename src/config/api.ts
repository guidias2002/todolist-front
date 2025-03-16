import axios from "axios";

const { VITE_BASE_API } = import.meta.env;

export const apiAxiosInstance = axios.create({ baseURL: VITE_BASE_API });


export const taskEndpoints = {
    TASKS_FINDALL: "/task/findAll",
    TASKS_FINDALL_BY_STATUS: "/task/findByStatus/",
    TASKS_ORDER_BY_DUEDATE: "task/orderByDueDate"
}