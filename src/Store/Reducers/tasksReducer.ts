import {
    AppStatuses,
    ITask,
    TaskActionType,
    TaskPriorities,
    TaskStatuses,
    UpdateDateType
} from "../../types";
import {v1} from "uuid";
import {Dispatch} from "redux";
import {tasksAPI} from "../../DAL/tasksAPI";
import {AppActionType, setErrorAC, setStatusAC} from "./AppReducer";
//TODO: Add error handling
//actions
export const addTaskAC = (title: string, todolistId: string) => ({
    type: "ADD-TASK",
    payload: {
        taskTitle: title,
        todolistId
    }
} as const)
export const removeTaskAC = (taskId: string, todolistId: string) => ({
    type: "REMOVE-TASK",
    payload: {
        taskId,
        todolistId
    }
} as const)
export const changeTaskStatusAC = (taskId: string, todolistId: string) => ({
    type: "CHANGE-TASK-STATUS",
    payload: {
        taskId,
        todolistId,
    }
} as const)
export const renameTaskAC = (taskTitle: string, taskId: string, todolistId: string) => ({
    type: "RENAME-TASK",
    payload: {
        taskTitle,
        taskId,
        todolistId
    }
} as const)
export const setTaskAC = (tasks: Array<ITask>, todolistId: string) => ({
    type: "SET-TASKS",
    payload: {
        tasks: tasks,
        todolistId
    }
} as const)
//thunks
export const setTaskTC = (todolistId: string) => (dispatch: ThunkDispatch) => {

    // @ts-ignore
    dispatch(setStatusAC(AppStatuses.Loading))
    tasksAPI.getTasks(todolistId).then(res => {
        // @ts-ignore
        dispatch(setStatusAC(AppStatuses.Idle))
        dispatch(setTaskAC(res.data.items, todolistId))
    })
}
export const deleteTaskTC = (taskID: string, todolistId: string) => (dispatch: ThunkDispatch) => {
    // @ts-ignore
    dispatch(setStatusAC(AppStatuses.Loading))
    tasksAPI.deleteTasks(todolistId, taskID)
        .then(res => { // @ts-ignore
            dispatch(setTaskTC(todolistId))
            // @ts-ignore
            dispatch(setStatusAC(AppStatuses.Idle))
        })
}
export const addTaskTC = (taskTitle: string, todolistId: string) => (dispatch: ThunkDispatch) => {
    dispatch(setStatusAC(AppStatuses.Loading))
    tasksAPI.createTasks(todolistId, taskTitle)
        .then(res => {
            if (res.data.resultCode === 1) {
                // @ts-ignore
                dispatch(setErrorAC(res.data.messages[0]))
                dispatch(setStatusAC(AppStatuses.Idle))
                return
            } else {
                dispatch(setStatusAC(AppStatuses.Idle))
                // @ts-ignore
                dispatch(setTaskTC(todolistId))
            }


        })
}
export const updateTaskTC = (newTaskInfo: UpdateDateType, taskId: string, todolistId: string) => (dispatch: ThunkDispatch) => {
    // @ts-ignore
    dispatch(setStatusAC(AppStatuses.Loading))
    tasksAPI.updateTasks(todolistId, taskId, newTaskInfo)
        .then(res => {
            // @ts-ignore
            dispatch(setStatusAC(AppStatuses.Idle))
            // @ts-ignore
            dispatch(setTaskTC(todolistId))
        })
}

export const tasksReducer = (state: { [Key: string]: Array<ITask> } = {}, action: TaskActionType): { [Key: string]: Array<ITask> } => {
    switch (action.type) {
        case "ADD-TASK": {
            return {
                [action.payload.todolistId]: [
                    ...state[action.payload.todolistId],
                    {
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
                ],
                ...state
            }
        }
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: [...state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)]
            }
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    status: t.status === TaskStatuses.Completed ? TaskStatuses.InProgress : TaskStatuses.Completed
                } : t)
            }
        }
        case "RENAME-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    title: action.payload.taskTitle
                } : t)
            }
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.payload.todolistId]
            return stateCopy
        }
        case "ADD-TODOLIST": {
            return {...state, [action.payload.todolistId]: []}
        }
        case "SET-TODOLISTS": {
            const newState = {...state}
            action.payload.forEach(td => {
                newState[td.id] = []
            })
            return newState
        }
        case "SET-TASKS": {
            return {...state, [action.payload.todolistId]: action.payload.tasks}
        }
        default:
            return state
    }
}

type ThunkDispatch = Dispatch<TaskActionType | AppActionType>

