import {instance} from "./instanceConfig";
import {ITask, ResponseType, TaskAPIResponseType, UpdateDateType} from "../types";


export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<TaskAPIResponseType>(`/todo-lists/${todolistId}/tasks`)
    },
    createTasks(todolistId: string, taskTitle: string) {
        return instance.post<ResponseType<{ item: ITask }>>(`/todo-lists/${todolistId}/tasks`, {title: taskTitle})
    },
    deleteTasks(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTasks(todolistId: string, taskId: string, info: UpdateDateType) {
        return instance.put<ResponseType<{ item: ITask }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, info)
    },
}