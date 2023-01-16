interface ITodolistProps {
    title: string
    id: string
    filter: Filter
    setFilter: (filter: Filter, todolistId: string) => void
    deleteTodolist: (todolistId: string) => void
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
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
    completed: boolean
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

export type {
    ITask,
    ITodolistProps,
    ITodolist,
    IAddItemFormProps,
    IEditableSpanProps,
    ITodolistAPI,
    ResponseType,
    UpdateDateType,
    TaskAPIResponseType
}
export {
    Filter,
    TaskStatuses,
    TaskPriorities
}

