import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistsReducer} from "./Reducers/todolistsReducer";
import {tasksReducer} from "./Reducers/tasksReducer";
import thunk from "redux-thunk";

export const RootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
})
export const Store = createStore(RootReducer, applyMiddleware(thunk))
export type RootState = ReturnType<typeof Store.getState>