import {AppStateType, AppStatuses} from "../../types";
import {LoginAPI} from "../../DAL/loginAPI";
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
        try {
            const response = await LoginAPI.authMe()
            if (response.data.resultCode === 0) {
                thunkAPI.dispatch(setStatusAC({status: AppStatuses.Idle}))
                return {isLoggedIn: true, isInitialized: true}
            } else {
                thunkAPI.dispatch(setStatusAC({status: AppStatuses.Idle}))
                thunkAPI.dispatch(setErrorAC({error: response.data.messages[0]}))
                return thunkAPI.rejectWithValue(response.data.messages[0])
            }
        } catch (e) {
            return thunkAPI.rejectWithValue("Network error")
        }
    })


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
    },
    extraReducers: (builder) => {
        builder.addCase(initializeAppTC.fulfilled, (state, action) => {
            state.isInitialized = action.payload.isInitialized
        })
    }
})


//actions
export const {setErrorAC, setStatusAC} = AppSlice.actions


