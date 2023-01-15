import {Provider} from "react-redux";
import {RootState, Store} from "./../src/Store/Store";
import {Filter} from "./../src/types";
import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "../src/Store/Reducers/todolistsReducer";
import {tasksReducer} from "../src/Store/Reducers/tasksReducer";

const initialStore = {
    todolists: [
        {id: "1", title: "todolist1", filter: Filter.ALL},
        {id: "2", title: "todolist2", filter: Filter.ALL},
    ],
    tasks: {
        "1": [
            {isDone: false, title: "Task1", id: "1"},
            {isDone: false, title: "Task2", id: "2"},
        ],
        "2": [
            {isDone: false, title: "Task1", id: "1"},
            {isDone: false, title: "Task2", id: "2"},
        ]
    }
}

const RootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})
const StorybookStore = createStore(RootReducer, initialStore as RootState)
export const ReduxStoreProviderDecorator = (story: any) => {
    return <Provider store={StorybookStore}>{story()}</Provider>;
}