import React, {FC, useCallback, useEffect} from "react";
import {Filter, ITask, ITodolistProps, TaskStatuses} from "../../types";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Box, Button, ButtonGroup, IconButton, Paper, Typography} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useSelector} from "react-redux";
import {useActions} from "../../Store/Store";
import {Task} from "../Task/Task";
import {tasksAsyncActions, tasksSelectors, todolistsActions} from "../../Store/Reducers";
import styles from "./Todolist.module.css"

export const Todolist: FC<ITodolistProps> = React.memo(function Todolist({
                                                                             id,
                                                                             title,
                                                                             filter,
                                                                         }) {
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
        <Paper elevation={3} style={{position: 'relative', padding: "0 10px 10px 10px"}}>
            <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                <EditableSpan value={title}
                              variant={"h5"}
                              changeItemCallback={changeTodolistTitleHandler}/>
                <IconButton
                    onClick={deleteTodolistHandler}><Delete/></IconButton>
            </Box>
            <AddItemForm addItemCallback={addTaskCallback}/>
            <div>
                {!tasksForTodolist.length &&
                    <Typography style={{padding: "10px", color: "#868686"}} variant={"body1"}>No task here</Typography>}
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
                <ButtonGroup sx={{width: "100%", justifyContent: "center"}}>
                    {buttonRender(Filter.ALL, "All", "primary")}
                    {buttonRender(Filter.ACTIVE, "Active", "secondary")}
                    {buttonRender(Filter.COMPLETED, "Completed", "warning")}
                </ButtonGroup>
            </div>
        </Paper>
    )
})