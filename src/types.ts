interface ITodolistProps {
    title: string
    id: string
    filter: Filter
    demo?: boolean
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
    addItemCallback: ((itemTitle: string) => void),
    placeholder?: string
}

interface IEditableSpanProps {
    value: string,
    changeItemCallback: (value: string) => void
}

type  ResponseType<D> = {
    resultCode: number,
    messages: Array<string>
    fieldsErrors?: Array<{ field: string, error: string }>
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


enum AppStatuses {
    Idle,
    Loading,
    succeeded,
    failed
}

type AppStateType = {
    status: AppStatuses,
    error: string | null,
    isInitialized: boolean
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
    AppStateType,

}
export {
    Filter,
    TaskStatuses,
    TaskPriorities,
    AppStatuses
}

