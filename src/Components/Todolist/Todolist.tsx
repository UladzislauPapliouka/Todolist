import React, {FC} from "react";
import {Filter, ITodolistProps} from "../../types";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

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
                <IconButton onClick={deleteTodolistHandler}><Delete/></IconButton>
            </h3>
            <AddItemForm addItemCallback={addTaskHandler}/>
            <div>
                {tasks.map((task) => {
                    const onDeleteHandler = () => deleteTaskHandler(task.id, id)
                    const onChangeStatusHandler = () => changeTaskStatus(task.id, id)
                    const changeTitle = (newTitle: string) => changeTaskTitleHandler(newTitle, task.id)
                    return (
                        <div className={`${task.isDone && "is-done"}`} key={task.id}>
                            <Checkbox
                                onChange={onChangeStatusHandler}
                                checked={task.isDone}/>
                            <EditableSpan value={task.title} changeItemCallback={changeTitle}/>
                            <IconButton onClick={onDeleteHandler}>
                                <Delete/>
                            </IconButton>
                        </div>
                    )
                })}
            </div>
            <div>
                <ButtonGroup>
                    <Button variant={filter === Filter.ALL ? "contained" : undefined}
                            onClick={setFilterAll}>All</Button>
                    <Button color={"secondary"} variant={filter === Filter.ACTIVE ? "contained" : undefined}
                            onClick={setFilterACTIVE}>Active
                    </Button>
                    <Button color={"warning"} variant={filter === Filter.COMPLETED ? "contained" : undefined}
                            onClick={setFilterCOMPLETED}>Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    )
}