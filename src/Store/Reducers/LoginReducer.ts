import {setErrorAC, setStatusAC} from "./AppReducer";
import {AppStatuses} from "../../types";

import {LoginAPI, LoginParamsType} from "../../DAL/loginAPI";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

const initialState = {
    isLoggedIn: false
}

//thunks
export const loginTC = createAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType, {
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

export const logoutTC = createAsyncThunk(
    "Login/logoutRequest",
    async (data: LoginParamsType, thunkAPI) => {
        thunkAPI.dispatch(setStatusAC({status: AppStatuses.Loading}))
        LoginAPI.logout()
            .then(res => {
                if (res.data.resultCode === 0) {
                    // @ts-ignore
                    thunkAPI.dispatch(setStatusAC({status: AppStatuses.Idle}))
                    thunkAPI.dispatch(setIsLoggedIn({isLoggedIn: false}))
                } else {
                    thunkAPI.dispatch(setErrorAC({error: res.data.messages[0]}))
                    thunkAPI.dispatch(setStatusAC({status: AppStatuses.Idle}))
                }
            })
    }
)

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
    }
})

//actions
export const {setIsLoggedIn} = LoginSlice.actions


