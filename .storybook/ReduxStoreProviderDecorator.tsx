import {Provider} from "react-redux";
import {RootState} from "./../src/Store/Store";
import {AppStatuses} from "./../src/types";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {TodolistSlice} from "../src/Store/Reducers/todolistsReducer";
import {TasksSlice} from "../src/Store/Reducers/tasksReducer";
import {AppSlice} from "../src/Store/Reducers/AppReducer";
import thunk from "redux-thunk";

const initialStore: RootState = {
    todolists: [],
    tasks: {},
    app: {
        status: AppStatuses.Idle,
        error: null,
        isInitialized: true
    },
    auth: {
        isLoggedIn: false
    }
}

const RootReducer = combineReducers({
    todolists: TodolistSlice.reducer,
    tasks: TasksSlice.reducer,
    app: AppSlice.reducer
})
//TODO add RTK
const StorybookStore = createStore(RootReducer, initialStore as RootState, applyMiddleware(thunk))
export const ReduxStoreProviderDecorator = (story: any) => {
    return <Provider store={StorybookStore}>{story()}</Provider>;
}