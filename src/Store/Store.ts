import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistsReducer} from "./Reducers/todolistsReducer";
import {tasksReducer} from "./Reducers/tasksReducer";
import thunk from "redux-thunk";
import {AppReducer} from "./Reducers/AppReducer";
import {LoginReducer} from "./Reducers/LoginReducer";

export const RootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: AppReducer,
    auth: LoginReducer
})
export const Store = createStore(RootReducer, applyMiddleware(thunk))
export type RootState = ReturnType<typeof Store.getState>