import {v1} from "uuid";
import {Filter, ITodolist} from "../types";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    RemoveTodolistAC,
    RenameTodolistAC,
    todolistsReducer
} from "./todolistsReducer";

test('correct todolist should be removed', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()
    const startState: Array<ITodolist> = [
        {id: todolistId1, title: "1", filter: Filter.ALL},
        {id: todolistId2, title: "1", filter: Filter.ALL},
    ]

    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})
test('correct todolist should be added', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()
    const startState: Array<ITodolist> = [
        {id: todolistId1, title: "1", filter: Filter.ALL},
        {id: todolistId2, title: "2", filter: Filter.ALL},
    ]
    const endState = todolistsReducer(startState, AddTodolistAC("newTitle"))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe("newTitle")
    expect(endState[2].filter).toBe(Filter.ALL)
})

test('correct todolist should be renamed', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()
    const startState: Array<ITodolist> = [
        {id: todolistId1, title: "1", filter: Filter.ALL},
        {id: todolistId2, title: "2", filter: Filter.ALL},
    ]

    const endState = todolistsReducer(startState, RenameTodolistAC("newTitle", todolistId1))

    expect(endState.length).toBe(2)
    expect(endState[0].id).toBe(todolistId1)
    expect(endState[1].id).toBe(todolistId2)
    expect(endState[0].title).toBe("newTitle")
    expect(endState[1].title).toBe("2")
    expect(endState[0].filter).toBe(Filter.ALL)
    expect(endState[1].filter).toBe(Filter.ALL)
})
test("correct filter of todolist  should be changed", () => {
    const todolistId1 = v1()
    const todolistId2 = v1()
    const startState: Array<ITodolist> = [
        {id: todolistId1, title: "1", filter: Filter.ALL},
        {id: todolistId2, title: "2", filter: Filter.ALL},
    ]
    const endState = todolistsReducer(startState, ChangeTodolistFilterAC(Filter.ACTIVE, todolistId1))

    expect(endState.length).toBe(2)
    expect(endState[0].id).toBe(todolistId1)
    expect(endState[1].id).toBe(todolistId2)
    expect(endState[0].title).toBe("1")
    expect(endState[1].title).toBe("2")
    expect(endState[0].filter).toBe(Filter.ACTIVE)
    expect(endState[1].filter).toBe(Filter.ALL)

})