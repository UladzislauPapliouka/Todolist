import {ITask, TaskPriorities, TaskStatuses} from "../../types";
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

export const tasksReducer = (state: { [Key: string]: Array<ITask> } = {}, action: ActionType): { [Key: string]: Array<ITask> } => {
    switch (action.type) {
        case "ADD-TASK": {
            const task: ITask = {
                description: "string",
                title: action.payload.taskTitle,
                status: TaskStatuses.InProgress,
                priority: TaskPriorities.Later,
                startDate: "string",
                deadline: "string",
                id: v1(),
                todoListId: "string",
                order: 0,
                addedDate: "string",
            }
            return {...state, [action.payload.todolistId]: [...state[action.payload.todolistId], task]}
        }
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: [...state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)]
            }
        }
        case "CHANGE-TASK-STATUS": {
            const stateCopy = {...state}
            let tasks = stateCopy[action.payload.todolistId]
            stateCopy[action.payload.todolistId] = tasks.map(t => t.id === action.payload.taskId ? {
                ...t,
                status: t.status === TaskStatuses.Completed ? TaskStatuses.InProgress : TaskStatuses.Completed
            } : t)
            return stateCopy


        }
        case "RENAME-TASK": {
            const stageCopy = {...state}
            let tasks = stageCopy[action.payload.todolistId]
            stageCopy[action.payload.todolistId] = tasks.map(t => t.id === action.payload.taskId ? {
                ...t,
                title: action.payload.taskTitle
            } : t)
            return stageCopy
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
            return state
    }
}



