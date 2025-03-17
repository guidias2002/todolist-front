import { TaskStatusEnum } from "../enums/TaskStatusEnum";

export interface Task {
    id?: number,
    title: string,
    description: string,
    dueDate: string,
    status: TaskStatusEnum,
    userId?: number
}

