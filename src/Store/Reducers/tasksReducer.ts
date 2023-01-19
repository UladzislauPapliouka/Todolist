import {AppStatuses, ITask, UpdateDateType} from "../../types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {setStatusAC} from "./AppReducer";
import {tasksAPI} from "../../DAL";
import {AxiosError} from "axios";
import {AsyncActions as todolistAsyncActions} from "./todolistsReducer";

const setTask = createAsyncThunk("TASKS/tasksRequest", async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setStatusAC({status: AppStatuses.Loading}))
    const response = await tasksAPI.getTasks(todolistId)
    const tasks = response.data.items
    thunkAPI.dispatch(setStatusAC({status: AppStatuses.Idle}))
    return {tasks, todolistId}

})
const deleteTask = createAsyncThunk<{ taskId: string, todolistId: string }, { taskId: string, todolistId: string }>("TASKS/deleteTasksRequest",
    async (arg, thunkAPI) => {
        thunkAPI.dispatch(setStatusAC({status: AppStatuses.Loading}))
        try {
            await tasksAPI.deleteTasks(arg.todolistId, arg.taskId)
            thunkAPI.dispatch(setStatusAC({status: AppStatuses.Idle}))
            return {taskId: arg.taskId, todolistId: arg.todolistId}
        } catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.message)
        }
    })
const addTask = createAsyncThunk<{ task: ITask }, { taskTitle: string, todolistId: string }>("TASKS/addTasksRequest",
    async (arg, thunkAPI) => {
        thunkAPI.dispatch(setStatusAC({status: AppStatuses.Loading}))
        try {
            const response = await tasksAPI.createTasks(arg.todolistId, arg.taskTitle)
            if (response.data.resultCode === 1) {
                thunkAPI.dispatch(setStatusAC({status: AppStatuses.Idle}))
                return thunkAPI.rejectWithValue(response.data.messages[0])
            } else {
                thunkAPI.dispatch(setStatusAC({status: AppStatuses.Idle}))
                return {task: response.data.data.item}
            }
        } catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.message)
        }
    })
const updateTask = createAsyncThunk<{ task: ITask, taskId: string, todolistId: string }, { newTaskInfo: UpdateDateType, taskId: string, todolistId: string }>("TASKS/updateTasksRequest",
    async (arg, thunkAPI) => {
        thunkAPI.dispatch(setStatusAC({status: AppStatuses.Loading}))
        try {
            const response = await tasksAPI.updateTasks(arg.todolistId, arg.taskId, arg.newTaskInfo)
            thunkAPI.dispatch(setStatusAC({status: AppStatuses.Idle}))
            return {task: response.data.data.item, taskId: arg.taskId, todolistId: arg.todolistId}
        } catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.message)
        }

    })

export const AsyncActions = {
    setTask,
    deleteTask,
    addTask,
    updateTask

}
export const TasksSlice = createSlice({
    name: "TASKS",
    initialState: {} as { [Key: string]: Array<ITask> },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(todolistAsyncActions.addTodolist.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        builder.addCase(todolistAsyncActions.deleteTodolist.fulfilled, (state, action) => {
            delete state[action.payload.todolistId]
        })
        builder.addCase(todolistAsyncActions.fetchTodolist.fulfilled, (state, action) => {
            action.payload.todolists.forEach(td => {
                if (state[td.id] === undefined) {
                    state[td.id] = []
                }
            })
        })
        builder.addCase(setTask.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        })
        builder.addCase(deleteTask.fulfilled, (state, action) => {
            return {
                ...state,
                [action.payload.todolistId]: [...state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)]
            }
        })
        builder.addCase((addTask.fulfilled), (state, action) => {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        })
        builder.addCase(updateTask.fulfilled, (state, action) => {
            return {
                ...state,
                [action.payload.todolistId]: [...state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? action.payload.task : t)]
            }
        })
    },
})

