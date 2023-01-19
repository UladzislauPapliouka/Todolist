import {RootState} from "../Store";

const taskSelector = (todolistId: string) => (store: RootState) => store.tasks[todolistId]
export {taskSelector}
