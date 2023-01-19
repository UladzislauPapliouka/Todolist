import * as appSelectors from "./AppSelectors"
import * as loginSelectors from './LoginSelectors'
import * as todolistsSelectors from "./todolistsSelectors";
import * as tasksSelectors from "./taskSelectors";
import {AsyncActions as tasksAsyncActions} from "./tasksReducer"
import {AsyncActions as todolistsAsyncActions}  from "./todolistsReducer"
import {TodolistSlice} from "./todolistsReducer"
import {LoginAsynkActions, LoginSlice} from "./LoginReducer";

const todolistsActions = {...todolistsAsyncActions, ...TodolistSlice.actions}
const loginActions = {...LoginAsynkActions, ...LoginSlice.actions}
export {
    appSelectors,
    loginSelectors,
    todolistsSelectors,
    tasksSelectors,
    tasksAsyncActions,
    todolistsActions,
    loginActions
}