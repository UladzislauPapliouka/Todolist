import {
    AppStatuses,
    ITask,
    TaskStatuses,
    UpdateDateType
} from "../../types";
import {tasksAPI} from "../../DAL/tasksAPI";
import {setStatusAC} from "./AppReducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodolistTC, deleteTodolistTC, fetchTodolistTC} from "./todolistsReducer";
//TODO: Add error handling
//
//TODO use async/await
export const setTaskTC = createAsyncThunk("TASKS/tasksRequest", async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setStatusAC({status: AppStatuses.Loading}))
    const response = await tasksAPI.getTasks(todolistId)
    const tasks = response.data.items
    thunkAPI.dispatch(setStatusAC({status: AppStatuses.Idle}))
    return {tasks, todolistId}

})


export const deleteTaskTC = createAsyncThunk("TASKS/deleteTasksRequest", (arg: { taskId: string, todolistId: string }, thunkAPI) => {
    thunkAPI.dispatch(setStatusAC({status: AppStatuses.Loading}))
    return tasksAPI.deleteTasks(arg.todolistId, arg.taskId)
        .then(() => {
            thunkAPI.dispatch(setStatusAC({status: AppStatuses.Idle}))
            return {taskId: arg.taskId, todolistId: arg.todolistId}
        })
})

export const addTaskTC = createAsyncThunk("TASKS/addTasksRequest", (arg: { taskTitle: string, todolistId: string }, thunkAPI) => {
    thunkAPI.dispatch(setStatusAC({status: AppStatuses.Loading}))
    return tasksAPI.createTasks(arg.todolistId, arg.taskTitle)
        .then(res => {
            // if (res.data.resultCode === 1) {
            //     thunkAPI.dispatch(setErrorAC({error: res.data.messages[0]}))
            //     thunkAPI.dispatch(setStatusAC({status: AppStatuses.Idle}))
            // } else {
            thunkAPI.dispatch(setStatusAC({status: AppStatuses.Idle}))
            return {todolistId: arg.todolistId, task: res.data.data.item}
            // }
        })
})

export const updateTaskTC = createAsyncThunk("TASKS/updateTasksRequest", (arg: { newTaskInfo: UpdateDateType, taskId: string, todolistId: string }, thunkAPI) => {
    thunkAPI.dispatch(setStatusAC({status: AppStatuses.Loading}))
    tasksAPI.updateTasks(arg.todolistId, arg.taskId, arg.newTaskInfo)
        .then(() => {
            thunkAPI.dispatch(setStatusAC({status: AppStatuses.Idle}))
            thunkAPI.dispatch(setTaskTC(arg.todolistId))
        })
})

export const TasksSlice = createSlice({
    name: "TASKS",
    initialState: {} as { [Key: string]: Array<ITask> },
    reducers: {
        changeTaskStatusAC: (state, action: PayloadAction<{ taskId: string, todolistId: string }>) => {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    status: t.status === TaskStatuses.Completed ? TaskStatuses.InProgress : TaskStatuses.Completed
                } : t)
            }
        },
        renameTaskAC: (state, action: PayloadAction<{ taskTitle: string, taskId: string, todolistId: string }>) => {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    title: action.payload.taskTitle
                } : t)
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        builder.addCase(deleteTodolistTC.fulfilled, (state, action) => {
            delete state[action.payload.todolistId]
        })
        builder.addCase(fetchTodolistTC.fulfilled, (state, action) => {
            action.payload.todolists.forEach(td => {
                if (state[td.id] === undefined) {
                    state[td.id] = []
                }
            })
        })
        builder.addCase(setTaskTC.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        })
        builder.addCase(deleteTaskTC.fulfilled, (state, action) => {
            return {
                ...state,
                [action.payload.todolistId]: [...state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)]
            }
        })
        builder.addCase((addTaskTC.fulfilled), (state, action) => {
            state[action.payload.todolistId].unshift(action.payload.task)
        })
    },
})

//actions
export const {changeTaskStatusAC, renameTaskAC} = TasksSlice.actions

