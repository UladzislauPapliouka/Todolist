import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "./Reducers/todolistsReducer";
import {tasksReducer} from "./Reducers/tasksReducer";

export const RootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
})
export const Store = createStore(RootReducer)
export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch