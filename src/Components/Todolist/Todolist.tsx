import React, {FC, useCallback} from "react";
import {Filter, ITask, ITodolistProps} from "../../types";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, ButtonGroup, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../Store/Store";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, renameTaskAC} from "../../Store/Reducers/tasksReducer";
import {Task} from "../Task/Task";

export const Todolist: FC<ITodolistProps> = React.memo(({
                                                            id,
                                                            title,

                                                            setFilter,
                                                            filter,
                                                            deleteTodolist,
                                                            changeTodolistTitle,

                                                        }) => {
    const tasks = useSelector((store: RootState) => store.tasks[id])
    const dispatch = useDispatch<AppDispatch>()
    const setFilterAll = useCallback(() => setFilter(Filter.ALL, id), [setFilter, id])
    const setFilterACTIVE = useCallback(() => setFilter(Filter.ACTIVE, id), [setFilter, id])
    const setFilterCOMPLETED = useCallback(() => setFilter(Filter.COMPLETED, id), [setFilter, id])
    const deleteTodolistHandler = () => deleteTodolist(id)
    const addTaskHandler = useCallback((taskTitle: string) => {
        dispatch(addTaskAC(taskTitle, id))
    }, [id, dispatch])
    const changeTodolistTitleHandler = useCallback((newTitle: string) => {
        changeTodolistTitle(newTitle, id)
    }, [id, changeTodolistTitle])
    const onDeleteHandler = useCallback((taskId: string) => dispatch(removeTaskAC(taskId, id)), [dispatch, id])
    const onChangeStatusHandler = useCallback((taskId: string) => dispatch(changeTaskStatusAC(taskId, id)), [dispatch, id])
    const changeTitle = useCallback((newTitle: string, taskId: string) => dispatch(renameTaskAC(newTitle, taskId, id)), [dispatch, id])
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
    console.log("Todolist is called", id)
    return (
        <div>
            <h3><EditableSpan value={title} changeItemCallback={changeTodolistTitleHandler}/>
                <IconButton onClick={deleteTodolistHandler}><Delete/></IconButton>
            </h3>
            <AddItemForm addItemCallback={addTaskHandler}/>
            <div>
                {tasksForTodolist.map((task) => {

                    return (
                        <Task key={task.id} onChangeStatus={onChangeStatusHandler} changeTitle={changeTitle}
                              onDelete={onDeleteHandler} title={task.title} isDone={task.isDone} id={task.id}/>
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
})