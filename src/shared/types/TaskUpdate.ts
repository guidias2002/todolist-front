import { TaskStatusEnum } from "../enums/TaskStatusEnum";

export interface TaskUpdate {
    title?: string,
    description?: string,
    dueDate?: string,
    status?: TaskStatusEnum,
}
