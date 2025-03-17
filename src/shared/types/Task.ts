import { TaskStatusEnum } from "../enums/TaskStatusEnum";

export interface Task {
    id?: number,
    title: String,
    description: String,
    dueDate: String,
    status: TaskStatusEnum,
    userId?: number
}

