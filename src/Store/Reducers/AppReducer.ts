import {AppStateType, AppStatuses} from "../../types";

export type AppActionType =
    | ReturnType<typeof setStatusAC>
    | ReturnType<typeof setErrorAC>
const initialState: AppStateType = {
    error: null,
    status: AppStatuses.Idle
}
export const AppReducer = (state: AppStateType = initialState, action: AppActionType): AppStateType => {
    switch (action.type) {
        case "APP/SET-STATUS": {
            return {...state, status: action.payload.status}
        }
        case "APP/SET-ERROR": {
            return {...state, error: action.payload.error}
        }
        default:
            return state
    }
}

export const setStatusAC = (status: AppStatuses) => ({type: "APP/SET-STATUS", payload: {status}} as const)
export const setErrorAC = (error: string|null) => ({type: "APP/SET-ERROR", payload: {error}} as const)