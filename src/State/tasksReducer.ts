import {ITask} from "../types";
import {v1} from "uuid";
import {AddTodolistAction, RemoveTodolistAction} from "./todolistsReducer";

type ActionType =
    AddTaskAction
    | RemoveTaskAction
    | ChangeTaskStatusAction
    | RenameTaskAction
    | AddTodolistAction
    | RemoveTodolistAction
type AddTaskAction = {
    type: "ADD-TASK",
    payload: {
        taskTitle: string
        todolistId: string
    }
}
type RemoveTaskAction = {
    type: "REMOVE-TASK",
    payload: {
        taskId: string
        todolistId: string
    }
}
type ChangeTaskStatusAction = {
    type: "CHANGE-TASK-STATUS",
    payload: {
        taskId: string
        todolistId: string
    }
}
type RenameTaskAction = {
    type: "RENAME-TASK",
    payload: {
        taskTitle: string
        taskId: string
        todolistId: string
    }
}

export const addTaskAC = (title: string, todolistId: string): AddTaskAction => ({
    type: "ADD-TASK",
    payload: {
        taskTitle: title,
        todolistId
    }
})
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskAction => ({
    type: "REMOVE-TASK",
    payload: {
        taskId,
        todolistId
    }
})
export const changeTaskStatusAC = (taskId: string, todolistId: string): ChangeTaskStatusAction => ({
    type: "CHANGE-TASK-STATUS",
    payload: {
        taskId,
        todolistId,
    }
})
export const renameTaskAC = (taskTitle: string, taskId: string, todolistId: string): RenameTaskAction => ({
    type: "RENAME-TASK",
    payload: {
        taskTitle,
        taskId,
        todolistId
    }
})

export const tasksReducer = (state: { [Key: string]: Array<ITask> }, action: ActionType): { [Key: string]: Array<ITask> } => {
    switch (action.type) {
        case "ADD-TASK": {
            const task: ITask = {
                id: v1(),
                title: action.payload.taskTitle,
                isDone: false
            }
            const tasks = state[action.payload.todolistId]
            return {...state, [action.payload.todolistId]: [...state[action.payload.todolistId], task]}
        }
        case "REMOVE-TASK": {
            const tasks = state[action.payload.todolistId]
            return {
                ...state,
                [action.payload.todolistId]: [...state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)]
            }
        }
        case "CHANGE-TASK-STATUS": {
            const tasks = state[action.payload.todolistId]
            const task = tasks.find(t => t.id === action.payload.taskId)
            if (task) task.isDone = !task.isDone
            return {...state, [action.payload.todolistId]: tasks}
        }
        case "RENAME-TASK": {
            const tasks = state[action.payload.todolistId]
            const task = tasks.find(t => t.id === action.payload.taskId)
            if (task) task.title = action.payload.taskTitle
            return {...state, [action.payload.todolistId]: tasks}
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.payload.todolistId]
            return stateCopy
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.payload.todolistId] = []
            return stateCopy
        }
        default:
            throw new Error("unknown type")
    }
}



