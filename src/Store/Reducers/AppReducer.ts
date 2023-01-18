import {AppStateType, AppStatuses} from "../../types";
import {LoginAPI} from "../../DAL/loginAPI";
import {Dispatch} from "redux";
import {setIsLoggedIn} from "./LoginReducer";

export type AppActionType =
    | ReturnType<typeof setStatusAC>
    | ReturnType<typeof setErrorAC>
    | ReturnType<typeof seInitializedAC>
const initialState: AppStateType = {
    error: null,
    status: AppStatuses.Idle,
    isInitialized: false
}
export const AppReducer = (state: AppStateType = initialState, action: AppActionType): AppStateType => {
    switch (action.type) {
        case "APP/SET-STATUS": {
            return {...state, status: action.payload.status}
        }
        case "APP/SET-ERROR": {
            return {...state, error: action.payload.error}
        }
        case "APP/SET-INITIALIZED": {
            return {...state, isInitialized: action.payload.isInitialized}
        }
        default:
            return state
    }
}

export const setStatusAC = (status: AppStatuses) => ({type: "APP/SET-STATUS", payload: {status}} as const)
export const setErrorAC = (error: string | null) => ({type: "APP/SET-ERROR", payload: {error}} as const)
export const seInitializedAC = (isInitialized: boolean) => ({
    type: "APP/SET-INITIALIZED",
    payload: {isInitialized}
} as const)

export const inicializeAppTC = () => (dispatch: Dispatch) => {
    // @ts-ignore
    dispatch(setStatusAC(AppStatuses.Loading))
    LoginAPI.authMe()
        .then(res => {
            if (res.data.resultCode === 0) {
                // @ts-ignore
                dispatch(setStatusAC(AppStatuses.Idle))
                dispatch(setIsLoggedIn(true))
            } else {
                dispatch(setIsLoggedIn(false))
                dispatch(setErrorAC(res.data.messages[0]))
                dispatch(setStatusAC(AppStatuses.Idle))
            }
            dispatch(seInitializedAC(true))
        })
}