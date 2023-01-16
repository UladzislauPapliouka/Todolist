import {Provider} from "react-redux";
import {RootState, Store} from "./../src/Store/Store";
import {Filter} from "./../src/types";
import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "../src/Store/Reducers/todolistsReducer";
import {tasksReducer} from "../src/Store/Reducers/tasksReducer";

const initialStore: RootState = {
    todolists: [
        {id: "1", title: "todolist1", filter: Filter.ALL, addedDate: (new Date()).toTimeString(), order: 0},
        {id: "2", title: "todolist2", filter: Filter.ALL, addedDate: (new Date()).toTimeString(), order: -1},
    ],
    tasks: {
        "1": [
            {
                status: 1,
                title: "Task1",
                id: "1",
                addedDate: (new Date()).toTimeString(),
                order: 0,
                deadline: "",
                startDate: "",
                description: "",
                priority: 1,
                todoListId: "1"
            },
            {
                status: 2,
                title: "Task2",
                id: "2",
                addedDate: (new Date()).toTimeString(),
                order: 0,
                deadline: "",
                startDate: "",
                description: "",
                priority: 1,
                todoListId: "1"
            },
        ],
        "2": [
            {
                status: 1,
                title: "Task1",
                id: "1",
                addedDate: (new Date()).toTimeString(),
                order: 0,
                deadline: "",
                startDate: "",
                description: "",
                priority: 1,
                todoListId: "1"
            },
            {
                status: 2,
                title: "Task2",
                id: "2",
                addedDate: (new Date()).toTimeString(),
                order: 0,
                deadline: "",
                startDate: "",
                description: "",
                priority: 1,
                todoListId: "1"
            },
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