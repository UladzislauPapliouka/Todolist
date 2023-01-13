import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import {Filter, ITodolistProps} from "../../types";

export const Todolist: FC<ITodolistProps> = ({
                                                 id,
                                                 title,
                                                 tasks,
                                                 deleteTaskHandler,
                                                 setFilter,
                                                 addTask,
                                                 changeTaskStatus,
                                                 filter,
                                                 deleteTodolist
                                             }) => {
    const [newTaskTitle, setNewTaskTitle] = useState<string>("")
    const onAddTaskHandler = () => {
        if (newTaskTitle.trim()) {
            addTask(newTaskTitle, id)
            setNewTaskTitle("")
        } else {
            setError(true)
        }
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setNewTaskTitle(event.target.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        event.key === "Enter" && onAddTaskHandler()
    }
    const setFilterAll = () => setFilter(Filter.ALL, id)
    const setFilterACTIVE = () => setFilter(Filter.ACTIVE, id)
    const setFilterCOMPLETED = () => setFilter(Filter.COMPLETED, id)
    const deleteTodolistHandler = () => deleteTodolist(id)
    const errorMessage = <span className={"error-message"}>Field is required</span>
    const [error, setError] = useState<boolean>(false)
    return (
        <div>
            <h3>{title}
                <button onClick={deleteTodolistHandler}>X</button>
            </h3>
            <div>
                <input onKeyPress={onKeyPressHandler}
                       value={newTaskTitle}
                       onChange={onChangeHandler}
                       className={`${error && "error"}`}
                />
                <button onClick={onAddTaskHandler}>+</button>
                {error && errorMessage}
            </div>
            <ul>
                {tasks.map((task) => {
                    const onDeleteHandler = () => deleteTaskHandler(task.id, id)
                    const onChangeStatusHandler = () => changeTaskStatus(task.id, id)
                    return (
                        <li className={`${task.isDone && "is-done"}`} key={task.id}>
                            <input type="checkbox"
                                   onChange={onChangeStatusHandler}
                                   checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={onDeleteHandler}>X
                            </button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={`${filter === Filter.ALL && "active-filter"}`} onClick={setFilterAll}>All</button>
                <button className={`${filter === Filter.ACTIVE && "active-filter"}`} onClick={setFilterACTIVE}>Active
                </button>
                <button className={`${filter === Filter.COMPLETED && "active-filter"}`}
                        onClick={setFilterCOMPLETED}>Completed
                </button>
            </div>
        </div>
    )
}