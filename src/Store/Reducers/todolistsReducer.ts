import {Filter, ITodolist, ITodolistAPI, TodolistActionType} from "../../types";
import {Dispatch} from "redux";
import {todolistsAPI} from "../../DAL/todolistsAPI";


export type RemoveTodolistAction = ReturnType<typeof removeTodolistAC>
export type AddTodolistAction = ReturnType<typeof addTodolistAC>
export type SetTodolistsAction = ReturnType<typeof setTodolistAC>

export const todolistsReducer = (state: Array<ITodolist> = [], action: TodolistActionType): Array<ITodolist> => {
    switch (action.type) {
        case "REMOVE-TODOLIST" : {
            return [...state.filter(tl => tl.id !== action.payload.todolistId)]
        }
        case "ADD-TODOLIST": {
            return [
                {
                    id: action.payload.todolistId,
                    title: action.payload.todolistTitle,
                    filter: Filter.ALL,
                    order: 0,
                    addedDate: (new Date()).toTimeString()
                },
                ...state
            ]
        }
        case "RENAME-TODOLIST": {
            return state.map(tl => tl.id === action.payload.todolistId ? {
                ...tl,
                title: action.payload.todolistTitle
            } : tl)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(tl => tl.id === action.payload.todolistId ? {
                ...tl,
                filter: action.payload.todolistFilter
            } : tl)
        }
        case "SET-TODOLISTS" : {
            return action.payload.map(tlAPI => ({...tlAPI, filter: Filter.ALL}))
        }
        default:
            return state
    }
}
//TODO: use Actions instead of thunks in .then
//actions
export const removeTodolistAC = (todolistId: string) => ({
    type: "REMOVE-TODOLIST",
    payload: {todolistId}
} as const)
export const addTodolistAC = (todolistTitle: string, todolistId: string) => ({
    type: "ADD-TODOLIST",
    payload: {todolistTitle, todolistId}
} as const)
export const renameTodolistAC = (todolistTitle: string, todolistId: string) => ({
    type: "RENAME-TODOLIST",
    payload: {todolistTitle, todolistId}
} as const)
export const changeTodolistFilterAC = (todolistFilter: Filter, todolistId: string) => ({
    type: "CHANGE-TODOLIST-FILTER",
    payload: {todolistFilter, todolistId}
} as const)
export const setTodolistAC = (todolists: Array<ITodolistAPI>) => ({
    type: "SET-TODOLISTS",
    payload: todolists
} as const)
//thunks
export const fetchTodolistTC = () => (dispatch: Dispatch<TodolistActionType>) => {
    todolistsAPI.getTodolist()
        .then(res => {
            dispatch(setTodolistAC(res.data))
        })
}
export const addTodolistTC = (todolistTitle: string) => (dispatch: Dispatch<TodolistActionType>) => {
    todolistsAPI.createTodolist(todolistTitle)
        .then(res => {
            // @ts-ignore
            dispatch(fetchTodolistTC())
        })
}
export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch<TodolistActionType>) => {
    todolistsAPI.deleteTodolist(todolistId).then(res => {
            // @ts-ignore
            dispatch(fetchTodolistTC())
        }
    )
}
export const renameTodolistTC = (newTodolistTitle: string, todolistId: string) => (dispatch: Dispatch<TodolistActionType>) => {
    todolistsAPI.updateTodolist(todolistId, newTodolistTitle).then(res => {
        // @ts-ignore
        dispatch(fetchTodolistTC())
    })
}