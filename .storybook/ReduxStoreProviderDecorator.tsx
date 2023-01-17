import {Provider} from "react-redux";
import {RootState} from "./../src/Store/Store";
import {AppStatuses, Filter} from "./../src/types";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistsReducer} from "../src/Store/Reducers/todolistsReducer";
import {tasksReducer} from "../src/Store/Reducers/tasksReducer";
import {AppReducer} from "../src/Store/Reducers/AppReducer";
import thunk from "redux-thunk";

const initialStore: RootState = {
    todolists: [],
    tasks: {},
    app: {
        status: AppStatuses.Idle,
        error: null
    }
}

const RootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: AppReducer
})
const StorybookStore = createStore(RootReducer, initialStore as RootState, applyMiddleware(thunk))
export const ReduxStoreProviderDecorator = (story: any) => {
    return <Provider store={StorybookStore}>{story()}</Provider>;
}