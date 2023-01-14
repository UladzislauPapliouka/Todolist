import React, {FC} from "react";
import {Filter, ITask, ITodolistProps} from "../../types";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../Store/Store";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, renameTaskAC} from "../../Store/Reducers/tasksReducer";

export const Todolist: FC<ITodolistProps> = ({
                                                 id,
                                                 title,

                                                 setFilter,
                                                 filter,
                                                 deleteTodolist,
                                                 changeTodolistTitle,

                                             }) => {
    const tasks = useSelector((store: RootState) => store.tasks[id])
    const dispatch = useDispatch<AppDispatch>()
    const setFilterAll = () => setFilter(Filter.ALL, id)
    const setFilterACTIVE = () => setFilter(Filter.ACTIVE, id)
    const setFilterCOMPLETED = () => setFilter(Filter.COMPLETED, id)
    const deleteTodolistHandler = () => deleteTodolist(id)
    const addTaskHandler = (taskTitle: string) => {
        dispatch(addTaskAC(taskTitle, id))
    }
    const changeTodolistTitleHandler = (newTitle: string) => {
        changeTodolistTitle(newTitle, id)
    }
    let tasksForTodolist: Array<ITask>
    switch (filter) {
        case Filter.ALL:
            tasksForTodolist = tasks
            break;
        case Filter.ACTIVE:
            tasksForTodolist = tasks.filter(task => !task.isDone)
            break;
        case Filter.COMPLETED:
            tasksForTodolist = tasks.filter(task => task.isDone)
            break;
        default:
            tasksForTodolist = tasks
    }
    return (
        <div>
            <h3><EditableSpan value={title} changeItemCallback={changeTodolistTitleHandler}/>
                <IconButton onClick={deleteTodolistHandler}><Delete/></IconButton>
            </h3>
            <AddItemForm addItemCallback={addTaskHandler}/>
            <div>
                {tasksForTodolist.map((task) => {
                    const onDeleteHandler = () => dispatch(removeTaskAC(task.id, id))
                    const onChangeStatusHandler = () => dispatch(changeTaskStatusAC(task.id, id))
                    const changeTitle = (newTitle: string) => dispatch(renameTaskAC(newTitle, task.id, id))
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