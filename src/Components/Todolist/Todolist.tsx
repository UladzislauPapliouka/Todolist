import React, {FC} from "react";
import {Filter, ITodolistProps} from "../../types";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";

export const Todolist: FC<ITodolistProps> = ({
                                                 id,
                                                 title,
                                                 tasks,
                                                 deleteTaskHandler,
                                                 setFilter,
                                                 addTask,
                                                 changeTaskStatus,
                                                 filter,
                                                 deleteTodolist,
                                                 changeTodolistTitle,
                                                 changeTaskTitle
                                             }) => {
    const setFilterAll = () => setFilter(Filter.ALL, id)
    const setFilterACTIVE = () => setFilter(Filter.ACTIVE, id)
    const setFilterCOMPLETED = () => setFilter(Filter.COMPLETED, id)
    const deleteTodolistHandler = () => deleteTodolist(id)
    const addTaskHandler = (taskTitle: string) => {
        addTask(taskTitle, id)
    }
    const changeTodolistTitleHandler = (newTitle: string) => {
        changeTodolistTitle(newTitle, id)
    }
    const changeTaskTitleHandler = (newTitle: string, taskId: string) => {
        changeTaskTitle(newTitle, taskId, id)
    }
    return (
        <div>
            <h3><EditableSpan value={title} changeItemCallback={changeTodolistTitleHandler}/>
                <button onClick={deleteTodolistHandler}>X</button>
            </h3>
            <AddItemForm addItemCallback={addTaskHandler}/>
            <ul>
                {tasks.map((task) => {
                    const onDeleteHandler = () => deleteTaskHandler(task.id, id)
                    const onChangeStatusHandler = () => changeTaskStatus(task.id, id)
                    const changeTitle = (newTitle: string) => changeTaskTitleHandler(newTitle, task.id)
                    return (
                        <li className={`${task.isDone && "is-done"}`} key={task.id}>
                            <input type="checkbox"
                                   onChange={onChangeStatusHandler}
                                   checked={task.isDone}/>
                            <EditableSpan value={task.title} changeItemCallback={changeTitle}/>
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