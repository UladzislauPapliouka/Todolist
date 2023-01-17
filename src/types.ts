import {
    AddTodolistAction,
    changeTodolistFilterAC,
    RemoveTodolistAction,
    renameTodolistAC,
    SetTodolistsAction
} from "./Store/Reducers/todolistsReducer";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, renameTaskAC, setTaskAC} from "./Store/Reducers/tasksReducer";

interface ITodolistProps {
    title: string
    id: string
    filter: Filter
    setFilter: (filter: Filter, todolistId: string) => void
    deleteTodolist: (todolistId: string) => void
    changeTodolistTitle: (newTitle: string, todolistId: string) => void,
    demo?:boolean
}

interface ITodolistAPI {
    id: string
    title: string
    addedDate: string
    order: number
}

interface ITodolist extends ITodolistAPI {
    filter: Filter
}

interface ITask {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

enum Filter {
    ALL,
    ACTIVE,
    COMPLETED
}

interface IAddItemFormProps {
    addItemCallback: ((itemTitle: string) => void)
}

interface IEditableSpanProps {
    value: string,
    changeItemCallback: (value: string) => void
}

type  ResponseType<D = {}> = {
    resultCode: number,
    messages: Array<string>
    data: D
}

type TaskAPIResponseType = {
    items: ITask[],
    totalCount: number,
    error: string
}
type UpdateDateType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}

enum TaskPriorities {
    Low,
    Middle,
    High,
    Urgently,
    Later
}


type TaskActionType =
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof renameTaskAC>
    | AddTodolistAction
    | RemoveTodolistAction
    | SetTodolistsAction
    | ReturnType<typeof setTaskAC>
type TodolistActionType =
    | RemoveTodolistAction
    | AddTodolistAction
    | ReturnType<typeof renameTodolistAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsAction

interface TaskProps extends ITask {
    updateTask: (newTaskInfo: UpdateDateType, taskId: string) => void
    onDelete: (taskId: string) => void
}

enum AppStatuses {
    Idle,
    Loading,
    succeeded,
    failed
}

type AppStateType = {
    status: AppStatuses,
    error: string | null
}
export type {
    ITask,
    ITodolistProps,
    ITodolist,
    IAddItemFormProps,
    IEditableSpanProps,
    ITodolistAPI,
    ResponseType,
    UpdateDateType,
    TaskAPIResponseType,
    TaskActionType,
    TodolistActionType,
    TaskProps,
    AppStateType,

}
export {
    Filter,
    TaskStatuses,
    TaskPriorities,
    AppStatuses
}

