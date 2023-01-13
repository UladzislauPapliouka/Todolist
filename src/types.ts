interface ITodolist {
    title: string
    tasks: Array<ITask>
}

interface ITask {
    title: string
    isDone: boolean
    id: string
}

export type {ITask, ITodolist}