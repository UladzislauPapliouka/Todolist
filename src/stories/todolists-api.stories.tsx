import React, {useEffect, useState} from "react";
import {todolistsAPI} from "../DAL/todolistsAPI";
import {tasksAPI} from "../DAL/tasksAPI";

export default {
    title: "DAL"
}

const config = {withCredentials: true}
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    const onClickCallback = () => {
        todolistsAPI.getTodolist()
            .then(response => setState(response.data))
    }
    return <>
        <button onClick={onClickCallback}>Get todolists</button>
        {JSON.stringify(state)}</>
}
export const CreateTodolists = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>("")
    const onClickCallback = () => {
        todolistsAPI.createTodolist(title)
            .then(response => {
                setState(response.data.data.item)
            })
    }
    return <>
        <input placeholder={'todolist title'} value={title} onChange={(e) => setTitle(e.target.value)}/>
        <button onClick={onClickCallback}>Create todolists</button>
        {JSON.stringify(state)}
    </>
}
export const DeleteTodolists = () => {
    const [state, setState] = useState<any>(null)
    const [tlID, setTlID] = useState<string>("")

    const onClickCallback = () => {
        todolistsAPI.deleteTodolist(tlID).then(response => {
            setState(response.data)
        })
    }
    return <>
        <input placeholder={'todolist id'} value={tlID} onChange={(e) => setTlID(e.target.value)}/>
        <button onClick={onClickCallback}>Delete todolists</button>
        {JSON.stringify(state)}
    </>
}
export const UpdateTodolists = () => {
    const [state, setState] = useState<any>(null)
    const [tlID, setTlID] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const onClickCallback = () => {
        todolistsAPI.updateTodolist(tlID, title).then(res => setState(res.data))
    }
    return <>
        <input placeholder={'todolist id'} value={tlID} onChange={(e) => setTlID(e.target.value)}/>
        <input placeholder={'todolist title'} value={title} onChange={(e) => setTitle(e.target.value)}/>
        <button onClick={onClickCallback}>Update todolists</button>
        {JSON.stringify(state)}
    </>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [tlID, setTlID] = useState<string>("")
    const onClickCallback = () => {
        tasksAPI.getTasks(tlID)
            .then(response => setState(response.data.items))
    }
    return <>
        <input placeholder={'todolist id'} value={tlID} onChange={(e) => setTlID(e.target.value)}/>
        <button onClick={onClickCallback}>Get todolist's tasks</button>
        {JSON.stringify(state)}</>
}
export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    const [tlID, setTlID] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const onClickCallback = () => {
        tasksAPI.createTasks(tlID, title)
            .then(response => setState(response.data.data.item))
    }
    return <>
        <input placeholder={'todolist id'} value={tlID} onChange={(e) => setTlID(e.target.value)}/>
        <input placeholder={'task title'} value={title} onChange={(e) => setTitle(e.target.value)}/>
        <button onClick={onClickCallback}>Create task</button>
        {JSON.stringify(state)}
    </>
}
export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    const [tlID, setTlID] = useState<string>("")
    const [taskID, setTaskID] = useState<string>("")
    const onClickCallback = () => {
        tasksAPI.deleteTasks(tlID, taskID)
            .then(response => setState(response.data.data))
    }
    return <>
        <input placeholder={'todolist id'} value={tlID} onChange={(e) => setTlID(e.target.value)}/>
        <input placeholder={'task id'} value={taskID} onChange={(e) => setTaskID(e.target.value)}/>
        <button onClick={onClickCallback}>Update task</button>
        {JSON.stringify(state)}
    </>
}

export const UpdateTasks = () => {
    const [state, setState] = useState<any>(null)
    const [tlID, setTlID] = useState<string>("")
    const [taskID, setTaskID] = useState<string>("")
    const [title, setTitle] = useState<string>("")

    const onClickCallback = () => {

        const info = {
            title: title,
            description: "newDescription",
            completed: true,
            status: 0,
            priority: 1,
            startDate: (new Date()).toDateString(),
            deadline: (new Date()).toDateString(),
        }
        tasksAPI.updateTasks(tlID, taskID, info)
            .then(response => setState(response.data.data.item))
    }
    return <>
        <input placeholder={'todolist id'} value={tlID} onChange={(e) => setTlID(e.target.value)}/>
        <input placeholder={'task id'} value={taskID} onChange={(e) => setTaskID(e.target.value)}/>
        <input placeholder={'task title'} value={title} onChange={(e) => setTitle(e.target.value)}/>
        <button onClick={onClickCallback}>Update task</button>
        {JSON.stringify(state)}
    </>
}