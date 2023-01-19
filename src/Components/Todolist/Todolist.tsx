import React, {FC, useCallback, useEffect} from "react";
import {Filter, ITask, ITodolistProps, TaskStatuses} from "../../types";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, ButtonGroup, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useSelector} from "react-redux";
import {useActions} from "../../Store/Store";
import {Task} from "../Task/Task";
import {tasksAsyncActions, tasksSelectors, todolistsActions} from "../../Store/Reducers";

export const Todolist: FC<ITodolistProps> = React.memo(({
                                                            id,
                                                            title,
                                                            filter,
                                                        }) => {
    //TODO: refactor to get todolist object in props
    //TODO: disable todolist while deleting
    const tasks = useSelector(tasksSelectors.taskSelector(id))

    const {
        renameTodolist,
        deleteTodolist,
        changeTodolistFilterAC
    } = useActions(todolistsActions)
    const {addTask, setTask} = useActions(tasksAsyncActions)
    const setFilter = useCallback((filter: Filter) => changeTodolistFilterAC({
        todolistFilter: filter,
        todolistId: id
    }), [id, changeTodolistFilterAC])
    const deleteTodolistHandler = useCallback(() => {
        deleteTodolist({todolistId: id})
    }, [deleteTodolist, id])
    const changeTodolistTitleHandler = useCallback((newTitle: string) => {
        renameTodolist({newTodolistTitle: newTitle, todolistId: id})
    }, [id, renameTodolist])
    const addTaskCallback = useCallback((title: string) => {
        addTask({taskTitle: title, todolistId: id})
    }, [id, addTask])

    let tasksForTodolist: Array<ITask>
    switch (filter) {
        case Filter.ALL:
            tasksForTodolist = tasks
            break;
        case Filter.ACTIVE:
            tasksForTodolist = tasks.filter(task => task.status !== TaskStatuses.Completed)
            break;
        case Filter.COMPLETED:
            tasksForTodolist = tasks.filter(task => task.status === TaskStatuses.Completed)
            break;
        default:
            tasksForTodolist = tasks
    }
    const buttonRender = (buttonFilter: Filter, text: string, color: "primary" | "secondary" | "warning") => (
        <Button color={color} variant={buttonFilter === filter ? "contained" : undefined}
                onClick={() => setFilter(buttonFilter)}>{text}</Button>)
    console.log("Todolist is called", id)
    useEffect(() => {
        setTask(id)
    }, [id, setTask])
    return (
        <div>
            <h3><EditableSpan value={title} changeItemCallback={changeTodolistTitleHandler}/>
                <IconButton onClick={deleteTodolistHandler}><Delete/></IconButton>
            </h3>
            <AddItemForm addItemCallback={addTaskCallback}/>
            <div>
                {tasksForTodolist.map((task) => {

                    return (
                        <Task key={task.id}
                              title={task.title} status={task.status} id={task.id}
                              startDate={task.startDate} addedDate={task.addedDate} description={task.description}
                              deadline={task.deadline} order={task.order} priority={task.priority}
                              todoListId={task.todoListId}/>
                    )
                })}
            </div>
            <div>
                <ButtonGroup>
                    {buttonRender(Filter.ALL, "All", "primary")}
                    {buttonRender(Filter.ACTIVE, "Active", "secondary")}
                    {buttonRender(Filter.COMPLETED, "Completed", "warning")}
                </ButtonGroup>
            </div>
        </div>
    )
})