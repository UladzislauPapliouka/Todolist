interface ITodolist {
    title: string
    tasks: Array<ITask>
    deleteTaskHandler: (taskIs: string) => void
    setFilter: (filter: Filter) => void
    addTask: (taskId: string) => void
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

export type {ITask, ITodolist}
export {Filter}