import {Filter, ITodolist} from "../types";
import {v1} from "uuid";

type ActionType = RemoveTodolistAction | AddTodolistAction | RenameTodolistAction | ChangeTodolistFilterAction
type RemoveTodolistAction = {
    type: "REMOVE-TODOLIST",
    payload: { todolistId: string }
}
type AddTodolistAction = {
    type: "ADD-TODOLIST",
    payload: { todolistTitle: string }
}
type RenameTodolistAction = {
    type: "RENAME-TODOLIST",
    payload: { todolistId: string, todolistTitle: string }
}
type ChangeTodolistFilterAction = {
    type: "CHANGE-TODOLIST-FILTER",
    payload: { todolistId: string, todolistFilter: Filter }
}
export const todolistsReducer = (state: Array<ITodolist>, action: ActionType): Array<ITodolist> => {
    switch (action.type) {
        case "REMOVE-TODOLIST" : {
            return [...state.filter(tl => tl.id !== action.payload.todolistId)]
        }
        case "ADD-TODOLIST": {
            const newTodolist: ITodolist = {id: v1(), title: action.payload.todolistTitle, filter: Filter.ALL}
            return [...state, newTodolist]
        }
        case "RENAME-TODOLIST": {
            const todolist: ITodolist = state.find(tl => tl.id == action.payload.todolistId) as ITodolist
            if (todolist) todolist.title = action.payload.todolistTitle
            return [...state]
        }
        case "CHANGE-TODOLIST-FILTER": {
            const todolist: ITodolist = state.find(tl => tl.id == action.payload.todolistId) as ITodolist
            if (todolist) todolist.filter = action.payload.todolistFilter
            return [...state]
        }
        default:
            throw new Error("Unknown action type")
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistAction => ({
    type: "REMOVE-TODOLIST",
    payload: {todolistId}
})
export const AddTodolistAC = (todolistTitle: string): AddTodolistAction => ({
    type: "ADD-TODOLIST",
    payload: {todolistTitle}
})
export const RenameTodolistAC = (todolistTitle: string, todolistId: string): RenameTodolistAction => ({
    type: "RENAME-TODOLIST",
    payload: {todolistTitle, todolistId}
})
export const ChangeTodolistFilterAC = (todolistFilter: Filter, todolistId: string): ChangeTodolistFilterAction => ({
    type: "CHANGE-TODOLIST-FILTER",
    payload: {todolistFilter, todolistId}
})