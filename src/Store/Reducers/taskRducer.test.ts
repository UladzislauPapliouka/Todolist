import {v1} from "uuid";
import {ITask, ITodolist, TaskPriorities, TaskStatuses} from "../../types";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, renameTaskAC, tasksReducer} from "./tasksReducer";
import {addTodolistAC, removeTodolistAC, todolistsReducer} from "./todolistsReducer";

//TODO: Fix test correctly

test("correct task should be added", () => {
        const id1 = v1()
        const id2 = v1()
        const startState: { [Key: string]: Array<ITask> } = {
            [id1]: [
                {
                    description: "string",
                    title: "string",
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Later,
                    startDate: "string",
                    deadline: "string",
                    id: "string",
                    todoListId: "string",
                    order: 0,
                    addedDate: "string",
                },
                {
                    description: "string",
                    title: "string",
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Later,
                    startDate: "string",
                    deadline: "string",
                    id: "string",
                    todoListId: "string",
                    order: 0,
                    addedDate: "string",
                },
                {
                    description: "string",
                    title: "string",
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Later,
                    startDate: "string",
                    deadline: "string",
                    id: "string",
                    todoListId: "string",
                    order: 0,
                    addedDate: "string",
                },

            ],
            [id2]: [
                {
                    description: "string",
                    title: "string",
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Later,
                    startDate: "string",
                    deadline: "string",
                    id: "string",
                    todoListId: "string",
                    order: 0,
                    addedDate: "string",
                },
                {
                    description: "string",
                    title: "string",
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Later,
                    startDate: "string",
                    deadline: "string",
                    id: "string",
                    todoListId: "string",
                    order: 0,
                    addedDate: "string",
                },
                {
                    description: "string",
                    title: "string",
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Later,
                    startDate: "string",
                    deadline: "string",
                    id: "string",
                    todoListId: "string",
                    order: 0,
                    addedDate: "string",
                },
            ]
        }
        const endState = tasksReducer(startState, addTaskAC("newTasks", id1))
        expect(endState[id1].length).toBe(startState[id1].length + 1)
        expect(endState[id2].length).toBe(startState[id2].length)
        expect(endState[id1][3].title).toBe("newTasks")
        expect(endState[id1][3].id).toBeDefined()
        expect(endState[id1][3].status).toBe(TaskStatuses.InProgress)
    }
)
test("correct task should be deleted", () => {
        const id1 = v1()
        const id2 = v1()
        const startState: { [Key: string]: Array<ITask> } = {
            [id1]: [
                {
                    description: "string",
                    title: "string",
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Later,
                    startDate: "string",
                    deadline: "string",
                    id: "1",
                    todoListId: "string",
                    order: 0,
                    addedDate: "string",
                },
                {
                    description: "string",
                    title: "string",
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Later,
                    startDate: "string",
                    deadline: "string",
                    id: "2",
                    todoListId: "string",
                    order: 0,
                    addedDate: "string",
                },
                {
                    description: "string",
                    title: "string",
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Later,
                    startDate: "string",
                    deadline: "string",
                    id: "string",
                    todoListId: "string",
                    order: 0,
                    addedDate: "string",
                },
            ],
            [id2]: [
                {
                    description: "string",
                    title: "string",
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Later,
                    startDate: "string",
                    deadline: "string",
                    id: "string",
                    todoListId: "string",
                    order: 0,
                    addedDate: "string",
                },
                {
                    description: "string",
                    title: "string",
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Later,
                    startDate: "string",
                    deadline: "string",
                    id: "string",
                    todoListId: "string",
                    order: 0,
                    addedDate: "string",
                },
                {
                    description: "string",
                    title: "string",
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Later,
                    startDate: "string",
                    deadline: "string",
                    id: "string",
                    todoListId: "string",
                    order: 0,
                    addedDate: "string",
                },
            ]
        }
        const endState = tasksReducer(startState, removeTaskAC(startState[id1][0].id, id1))
        expect(endState[id1].length).toBe(startState[id1].length - 1)
        expect(endState[id1].every(t => t.id !== startState[id1][0].id)).toBeTruthy()
        expect(endState[id2].length).toBe(startState[id2].length)
    }
)
test("correct task status should be changed", () => {
        const id1 = v1()
        const id2 = v1()
        const startState: { [Key: string]: Array<ITask> } = {
            [id1]: [
                {
                    description: "string",
                    title: "string",
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Later,
                    startDate: "string",
                    deadline: "string",
                    id: "1",
                    todoListId: "string",
                    order: 0,
                    addedDate: "string",
                },
                {
                    description: "string",
                    title: "string",
                    status: TaskStatuses.Completed,
                    priority: TaskPriorities.Later,
                    startDate: "string",
                    deadline: "string",
                    id: "2",
                    todoListId: "string",
                    order: 0,
                    addedDate: "string",
                },
                {
                    description: "string",
                    title: "string",
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Later,
                    startDate: "string",
                    deadline: "string",
                    id: "3",
                    todoListId: "string",
                    order: 0,
                    addedDate: "string",
                },
            ],
            [id2]: [
                {
                    description: "string",
                    title: "string",
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Later,
                    startDate: "string",
                    deadline: "string",
                    id: "1",
                    todoListId: "string",
                    order: 0,
                    addedDate: "string",
                },
                {
                    description: "string",
                    title: "string",
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Later,
                    startDate: "string",
                    deadline: "string",
                    id: "2",
                    todoListId: "string",
                    order: 0,
                    addedDate: "string",
                },
                {
                    description: "string",
                    title: "string",
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Later,
                    startDate: "string",
                    deadline: "string",
                    id: "3",
                    todoListId: "string",
                    order: 0,
                    addedDate: "string",
                },

            ]
        }
        let endState = tasksReducer(startState, changeTaskStatusAC(startState[id1][0].id, id1))
        endState = tasksReducer(endState, changeTaskStatusAC(startState[id1][1].id, id1))
        endState = tasksReducer(endState, changeTaskStatusAC(startState[id1][2].id, id1))
        expect(endState[id1].length).toBe(startState[id1].length)
        expect(endState[id2].length).toBe(startState[id2].length)
        expect(endState[id1][0].status === TaskStatuses.Completed).toBe(true)
        expect(endState[id1][1].status === TaskStatuses.Completed).toBe(false)
        expect(endState[id1][2].status === TaskStatuses.Completed).toBe(true)
    }
)

test("correct task title should be changed", () => {
        const id1 = v1()
        const id2 = v1()
        const startState: { [Key: string]: Array<ITask> } = {
            [id1]: [
                {
                    description: "string",
                    title: "string",
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Later,
                    startDate: "string",
                    deadline: "string",
                    id: "1",
                    todoListId: "string",
                    order: 0,
                    addedDate: "string",
                },
                {
                    description: "string",
                    title: "HTML",
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Later,
                    startDate: "string",
                    deadline: "string",
                    id: "2",
                    todoListId: "string",
                    order: 0,
                    addedDate: "string",
                },
                {
                    description: "string",
                    title: "string",
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Later,
                    startDate: "string",
                    deadline: "string",
                    id: "3",
                    todoListId: "string",
                    order: 0,
                    addedDate: "string",
                },
            ],
            [id2]: [
                {
                    description: "string",
                    title: "string",
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Later,
                    startDate: "string",
                    deadline: "string",
                    id: "1",
                    todoListId: "string",
                    order: 0,
                    addedDate: "string",
                },
                {
                    description: "string",
                    title: "HTML",
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Later,
                    startDate: "string",
                    deadline: "string",
                    id: "2",
                    todoListId: "string",
                    order: 0,
                    addedDate: "string",
                },
                {
                    description: "string",
                    title: "string",
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Later,
                    startDate: "string",
                    deadline: "string",
                    id: "3",
                    todoListId: "string",
                    order: 0,
                    addedDate: "string",
                },

            ]
        }
        const endState = tasksReducer(startState, renameTaskAC("rename", startState[id1][0].id, id1))
        expect(endState[id1].length).toBe(startState[id1].length)
        expect(endState[id2].length).toBe(startState[id2].length)
        expect(endState[id1][0].title).toBe("rename")
        expect(endState[id1][1].title).toBe("HTML")
    }
)
test("correct todolist should be removed", () => {
        const id1 = v1()
        const id2 = v1()
        const startState: { [Key: string]: Array<ITask> } = {
            [id1]: [
                {
                    description: "string",
                    title: "string",
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Later,
                    startDate: "string",
                    deadline: "string",
                    id: "string",
                    todoListId: "string",
                    order: 0,
                    addedDate: "string",
                },
                {
                    description: "string",
                    title: "string",
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Later,
                    startDate: "string",
                    deadline: "string",
                    id: "string",
                    todoListId: "string",
                    order: 0,
                    addedDate: "string",
                },
                {
                    description: "string",
                    title: "string",
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Later,
                    startDate: "string",
                    deadline: "string",
                    id: "string",
                    todoListId: "string",
                    order: 0,
                    addedDate: "string",
                },
            ],
            [id2]: [
                {
                    description: "string",
                    title: "string",
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Later,
                    startDate: "string",
                    deadline: "string",
                    id: "string",
                    todoListId: "string",
                    order: 0,
                    addedDate: "string",
                },
                {
                    description: "string",
                    title: "string",
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Later,
                    startDate: "string",
                    deadline: "string",
                    id: "string",
                    todoListId: "string",
                    order: 0,
                    addedDate: "string",
                },
                {
                    description: "string",
                    title: "string",
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Later,
                    startDate: "string",
                    deadline: "string",
                    id: "string",
                    todoListId: "string",
                    order: 0,
                    addedDate: "string",
                },

            ]
        }
        const endState = tasksReducer(startState, removeTodolistAC(id1))
        expect(Object.keys(endState).length).toBe(1)
    }
)
test("correct todolist should be added", () => {
        const id1 = v1()
        const id2 = v1()
        const startState: { [Key: string]: Array<ITask> } = {}
        const startStateTL: Array<ITodolist> = []
        const newID = v1()
        const endState = tasksReducer(startState, addTodolistAC("newTL", newID))
        const endStateTL = todolistsReducer(startStateTL, addTodolistAC("newTL", newID))
        expect(Object.keys(endState).length).toBe(1)
        expect(endState[Object.keys(endState)[0]].length).toBe(0)
        expect(Object.keys(endState)[0]).toBe(endStateTL[0].id)
    }
)