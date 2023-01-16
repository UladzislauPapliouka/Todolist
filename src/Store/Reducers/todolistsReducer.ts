import {Filter, ITodolist} from "../../types";

type ActionType = RemoveTodolistAction | AddTodolistAction | RenameTodolistAction | ChangeTodolistFilterAction
export type RemoveTodolistAction = {
    type: "REMOVE-TODOLIST",
    payload: { todolistId: string }
}
export type AddTodolistAction = {
    type: "ADD-TODOLIST",
    payload: { todolistTitle: string, todolistId: string }
}
type RenameTodolistAction = {
    type: "RENAME-TODOLIST",
    payload: { todolistId: string, todolistTitle: string }
}
type ChangeTodolistFilterAction = {
    type: "CHANGE-TODOLIST-FILTER",
    payload: { todolistId: string, todolistFilter: Filter }
}
export const todolistsReducer = (state: Array<ITodolist> = [], action: ActionType): Array<ITodolist> => {
    switch (action.type) {
        case "REMOVE-TODOLIST" : {
            return [...state.filter(tl => tl.id !== action.payload.todolistId)]
        }
        case "ADD-TODOLIST": {
            const newTodolist: ITodolist = {
                id: action.payload.todolistId,
                title: action.payload.todolistTitle,
                filter: Filter.ALL,
                order: 0,
                addedDate: (new Date()).toTimeString()
            }
            return [...state, newTodolist]
        }
        case "RENAME-TODOLIST": {
            const todolist: ITodolist = state.find(tl => tl.id === action.payload.todolistId) as ITodolist
            if (todolist) todolist.title = action.payload.todolistTitle
            return [...state]
        }
        case "CHANGE-TODOLIST-FILTER": {
            const todolist: ITodolist = state.find(tl => tl.id === action.payload.todolistId) as ITodolist
            if (todolist) todolist.filter = action.payload.todolistFilter
            return [...state]
        }
        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistAction => ({
    type: "REMOVE-TODOLIST",
    payload: {todolistId}
})
export const addTodolistAC = (todolistTitle: string, todolistId: string): AddTodolistAction => ({
    type: "ADD-TODOLIST",
    payload: {todolistTitle, todolistId}
})
export const renameTodolistAC = (todolistTitle: string, todolistId: string): RenameTodolistAction => ({
    type: "RENAME-TODOLIST",
    payload: {todolistTitle, todolistId}
})
export const changeTodolistFilterAC = (todolistFilter: Filter, todolistId: string): ChangeTodolistFilterAction => ({
    type: "CHANGE-TODOLIST-FILTER",
    payload: {todolistFilter, todolistId}
})