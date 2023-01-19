import {RootState} from "../Store";

const todolistSelector = (store: RootState) => store.todolists
export {todolistSelector}