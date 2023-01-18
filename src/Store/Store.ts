import {combineReducers} from "redux";
import {TodolistSlice} from "./Reducers/todolistsReducer";
import {TasksSlice} from "./Reducers/tasksReducer";
import thunk from "redux-thunk";
import {AppSlice} from "./Reducers/AppReducer";
import {LoginSlice} from "./Reducers/LoginReducer";
import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";

export const RootReducer = combineReducers({
    todolists: TodolistSlice.reducer,
    tasks: TasksSlice.reducer,
    app: AppSlice.reducer,
    auth: LoginSlice.reducer
})

export const Store = configureStore({
    reducer: RootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(thunk)
})
type AppDispatch = typeof Store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export type RootState = ReturnType<typeof Store.getState>