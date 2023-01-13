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

export type {ITask, ITodolistProps, ITodolist}
export {Filter}