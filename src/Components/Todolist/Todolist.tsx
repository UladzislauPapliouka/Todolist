import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import {Filter, ITodolist} from "../../types";

export const Todolist: FC<ITodolist> = ({
                                            title,
                                            tasks,
                                            deleteTaskHandler,
                                            setFilter,
                                            addTask
                                        }) => {
    const [newTaskTitle, setNewTaskTitle] = useState<string>("")
    const onAddTaskHandler = () => {
        if (newTaskTitle.trim()) {
            addTask(newTaskTitle)
            setNewTaskTitle("")
        }
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.target.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        event.key === "Enter" && onAddTaskHandler()
    }
    const setFilterAll = () => setFilter(Filter.ALL)
    const setFilterACTIVE = () => setFilter(Filter.ACTIVE)
    const setFilterCOMPLETED = () => setFilter(Filter.COMPLETED)
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input onKeyPress={onKeyPressHandler}
                       value={newTaskTitle}
                       onChange={onChangeHandler}/>
                <button onClick={onAddTaskHandler}>+</button>
            </div>
            <ul>
                {tasks.map((task) => {
                    const onDeleteHandler = () => deleteTaskHandler(task.id)
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={onDeleteHandler}>X
                            </button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={setFilterAll}>All</button>
                <button onClick={setFilterACTIVE}>Active</button>
                <button onClick={setFilterCOMPLETED}>Completed</button>
            </div>
        </div>
    )
}