import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistsReducer} from "./Reducers/todolistsReducer";
import {tasksReducer} from "./Reducers/tasksReducer";
import thunk from "redux-thunk";
import {AppReducer} from "./Reducers/AppReducer";

export const RootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: AppReducer
})
export const Store = createStore(RootReducer, applyMiddleware(thunk))
export type RootState = ReturnType<typeof Store.getState>