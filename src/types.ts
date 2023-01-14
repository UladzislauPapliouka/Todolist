interface ITodolistProps {
    title: string
    id: string
    tasks: Array<ITask>
    deleteTaskHandler: (taskIs: string, todolistId: string) => void
    filter: Filter
    setFilter: (filter: Filter, todolistId: string) => void
    addTask: (taskTitle: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, todolistId: string) => void
    deleteTodolist: (todolistId: string) => void
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
    changeTaskTitle: (newTitle: string, taskId: string, todolistId: string) => void
}

interface ITodolist {
    id: string
    title: string,
    filter: Filter
}

interface ITask {
    title: string
    isDone: boolean
    id: string
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

export type {ITask, ITodolistProps, ITodolist, IAddItemFormProps, IEditableSpanProps}
export {Filter}

