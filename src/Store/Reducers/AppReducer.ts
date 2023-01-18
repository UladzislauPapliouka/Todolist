import {AppStateType, AppStatuses} from "../../types";
import {LoginAPI} from "../../DAL/loginAPI";
import {setIsLoggedIn} from "./LoginReducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: AppStateType = {
    error: null,
    status: AppStatuses.Idle,
    isInitialized: false
}

export const initializeAppTC = createAsyncThunk(
    "App/InitializeRequest",
    async (arg, thunkAPI) => {
        thunkAPI.dispatch(setStatusAC({status: AppStatuses.Loading}))
        const response = await LoginAPI.authMe()
        if (response.data.resultCode === 0) {
            thunkAPI.dispatch(setStatusAC({status: AppStatuses.Idle}))
            thunkAPI.dispatch(setIsLoggedIn({isLoggedIn: true}))
        } else {
            thunkAPI.dispatch(setIsLoggedIn({isLoggedIn: false}))
            thunkAPI.dispatch(setErrorAC({error: response.data.messages[0]}))
            thunkAPI.dispatch(setStatusAC({status: AppStatuses.Idle}))
        }
        thunkAPI.dispatch(setInitializedAC({isInitialized: true}))
    }
)


export const AppSlice = createSlice({
    name: "App",
    initialState,
    reducers: {
        setStatusAC: (state, action: PayloadAction<{ status: AppStatuses }>) => {
            state.status = action.payload.status
        },
        setErrorAC: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error
        },
        setInitializedAC: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
            state.isInitialized = action.payload.isInitialized
        }
    },
})


//actions
export const {setInitializedAC, setErrorAC, setStatusAC} = AppSlice.actions


