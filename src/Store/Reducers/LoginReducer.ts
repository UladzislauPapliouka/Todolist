import {initializeAppTC, setErrorAC, setStatusAC} from "./AppReducer";
import {AppStatuses} from "../../types";

import {LoginAPI, LoginParamsType} from "../../DAL";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

const initialState = {
    isLoggedIn: false
}

const loginTC = createAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType, {
    rejectValue: {
        errors: Array<string>,
        fieldsErrors: Array<{ field: string, error: string }> | undefined
    }
}>(
    "Login/loginRequest",
    async (data, thunkAPI) => {
        thunkAPI.dispatch(setStatusAC({status: AppStatuses.Loading}))
        try {
            const response = await LoginAPI.login(data)
            thunkAPI.dispatch(setStatusAC({status: AppStatuses.Idle}))
            if (response.data.resultCode === 0) {
                return {isLoggedIn: true}
            } else {
                thunkAPI.dispatch(setErrorAC({error: response.data.messages[0]}))
                return thunkAPI.rejectWithValue({
                    errors: response.data.messages,
                    fieldsErrors: response.data.fieldsErrors
                })
            }
        } catch (err) {
            const error: AxiosError = err as AxiosError
            return thunkAPI.rejectWithValue({
                errors: [error.message],
                fieldsErrors: undefined
            })
        }
    }
)
const logoutTC = createAsyncThunk<{ isLoggedIn: boolean }, void>(
    "Login/logoutRequest",
    async (data, thunkAPI) => {
        thunkAPI.dispatch(setStatusAC({status: AppStatuses.Loading}))

        try {
            const response = await LoginAPI.logout()
            if (response.data.resultCode === 0) {
                thunkAPI.dispatch(setStatusAC({status: AppStatuses.Idle}))
                return {isLoggedIn: false}
            } else {
                thunkAPI.dispatch(setStatusAC({status: AppStatuses.Idle}))
                thunkAPI.dispatch(setErrorAC({error: response.data.messages[0]}))
                return thunkAPI.rejectWithValue(response.data.messages[0])
            }
        } catch (e) {
            thunkAPI.dispatch(setErrorAC({error: "Network error"}))
            return thunkAPI.rejectWithValue("Network Error")
        }
    }
)
export const LoginAsynkActions = {
    loginTC,
    logoutTC
}
export const LoginSlice = createSlice({
    name: "Login",
    initialState,
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
            state.isLoggedIn = action.payload.isLoggedIn
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginTC.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
        })
        builder.addCase(logoutTC.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
        })
        builder.addCase(initializeAppTC.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
        })
    }
})

//actions
export const {setIsLoggedIn} = LoginSlice.actions


