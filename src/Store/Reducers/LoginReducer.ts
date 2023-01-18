import {setErrorAC, setStatusAC} from "./AppReducer";
import {AppStatuses} from "../../types";
import {Dispatch} from "redux";
import {LoginAPI, LoginParamsType} from "../../DAL/loginAPI";

const initialState: initialStateType = {
    isLoggedIn: false
}
type initialStateType = {
    isLoggedIn: boolean
}
type ActionsType = ReturnType<typeof setIsLoggedIn>
export const LoginReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case "SET-IS-LOGGED-IN": {
            return {...state, isLoggedIn: action.payload.isLoggedIn}
        }
        default:
            return state
    }
}

//actions
export const setIsLoggedIn = (value: boolean) => ({type: "SET-IS-LOGGED-IN", payload: {isLoggedIn: value}} as const)
//thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    // @ts-ignore
    dispatch(setStatusAC(AppStatuses.Loading))
    LoginAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                // @ts-ignore
                dispatch(setStatusAC(AppStatuses.Idle))
                dispatch(setIsLoggedIn(true))
            } else {
                dispatch(setErrorAC(res.data.messages[0]))
                dispatch(setStatusAC(AppStatuses.Idle))
            }
        })
}
export const logoutTC = () => (dispatch: Dispatch) => {
    // @ts-ignore
    dispatch(setStatusAC(AppStatuses.Loading))
    LoginAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                // @ts-ignore
                dispatch(setStatusAC(AppStatuses.Idle))
                dispatch(setIsLoggedIn(false))
            } else {
                dispatch(setErrorAC(res.data.messages[0]))
                dispatch(setStatusAC(AppStatuses.Idle))
            }
        })
}