import {AppStatuses, Filter, ITodolist, ITodolistAPI} from "../../types";
import {todolistsAPI} from "../../DAL/todolistsAPI";
import {setErrorAC, setStatusAC} from "./AppReducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";


//TODO: Add error handling
//TODO: use Actions instead of thunks in .then


//thunks
export const fetchTodolistTC = createAsyncThunk<{ todolists: Array<ITodolistAPI> }, void, {}>(
    "TODOLISTS/fetchTodolistRequest",
    async (args, thunkAPI) => {
        thunkAPI.dispatch(setStatusAC({status: AppStatuses.Loading}))
        try {
            const response = await todolistsAPI.getTodolist()
            thunkAPI.dispatch(setStatusAC({status: AppStatuses.Idle}))
            return {todolists: response.data}
        } catch (err) {
            const error = err as AxiosError
            thunkAPI.dispatch(setStatusAC({status: AppStatuses.Idle}))
            return thunkAPI.rejectWithValue(error.message)
        }

    }
)


export const addTodolistTC = createAsyncThunk<{ todolist: ITodolistAPI }, { todolistTitle: string }, {}>(
    "TODOLISTS/addTodolistRequest",
    async (arg, thunkAPI) => {
        thunkAPI.dispatch(setStatusAC({status: AppStatuses.Loading}))
        try {
            const response = await todolistsAPI.createTodolist(arg.todolistTitle)
            if (response.data.resultCode === 0) {
                thunkAPI.dispatch(setStatusAC({status: AppStatuses.Idle}))
                return {todolist: response.data.data.item}
            } else {
                thunkAPI.dispatch(setErrorAC({error: response.data.messages[0]}))
                thunkAPI.dispatch(setStatusAC({status: AppStatuses.Idle}))
                return thunkAPI.rejectWithValue(response.data.messages[0])
            }
        } catch (err) {
            const error = err as AxiosError
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const deleteTodolistTC = createAsyncThunk<{ todolistId: string }, { todolistId: string }>(
    "TODOLISTS/deleteTodolistRequest",
    async (arg, thunkAPI) => {
        thunkAPI.dispatch(setStatusAC({status: AppStatuses.Loading}))
        try {
            await todolistsAPI.deleteTodolist(arg.todolistId)
            thunkAPI.dispatch(setStatusAC({status: AppStatuses.Idle}))
            return {todolistId: arg.todolistId}
        } catch (err) {
            const error = err as AxiosError
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const renameTodolistTC = createAsyncThunk<{ todolist: ITodolistAPI }, { newTodolistTitle: string, todolistId: string }>(
    "TODOLISTS/renameTodolistRequest",
    async (arg, thunkAPI) => {
        thunkAPI.dispatch(setStatusAC({status: AppStatuses.Loading}))
        try {
            const response = await todolistsAPI.updateTodolist(arg.todolistId, arg.newTodolistTitle)
            thunkAPI.dispatch(setStatusAC({status: AppStatuses.Idle}))
            return {todolist: response.data.data[0]}
        } catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const TodolistSlice = createSlice({
    name: "TODOLISTS",
    initialState: [] as Array<ITodolist>,
    reducers: {
        changeTodolistFilterAC: (state, action: PayloadAction<{ todolistFilter: Filter, todolistId: string }>) => {
            return state.map(tl => tl.id === action.payload.todolistId ? {
                ...tl,
                filter: action.payload.todolistFilter
            } : tl)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodolistTC.fulfilled, (state, action) => {
            return action.payload.todolists.map(tlAPI => ({...tlAPI, filter: Filter.ALL}))
        })
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: Filter.ALL})
        })
        builder.addCase(deleteTodolistTC.fulfilled, (state, action) => {
            return state.filter(tl => tl.id !== action.payload.todolistId)
        })
        builder.addCase(renameTodolistTC.fulfilled, (state, action) => {
            state.forEach(td => {
                if (td.id === action.payload.todolist.id) td.title = action.payload.todolist.title
            })
        })
    }
})

//actions
export const {
    changeTodolistFilterAC,
} = TodolistSlice.actions
//thunks
