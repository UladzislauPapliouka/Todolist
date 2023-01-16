import {instance} from "./instanceConfig";
import {ITodolistAPI, ResponseType} from "../types";


export const todolistsAPI = {
    getTodolist() {
        return instance.get<Array<ITodolistAPI>>("/todo-lists")
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: ITodolistAPI }>>("/todo-lists", {title: title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`/todo-lists/${todolistId}`, {title: title})
    }
}