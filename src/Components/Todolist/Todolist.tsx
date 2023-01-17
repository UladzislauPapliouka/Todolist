import React, {FC, useCallback, useEffect} from "react";
import {Filter, ITask, ITodolistProps, TaskStatuses, UpdateDateType} from "../../types";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, ButtonGroup, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../Store/Store";
import {
    addTaskTC,
    deleteTaskTC,
    setTaskTC, updateTaskTC
} from "../../Store/Reducers/tasksReducer";
import {Task} from "../Task/Task";

export const Todolist: FC<ITodolistProps> = React.memo(({
                                                            id,
                                                            title,
                                                            setFilter,
                                                            filter,
                                                            deleteTodolist,
                                                            changeTodolistTitle,

                                                        }) => {
    //TODO: refactor to get todolist object in props
    //TODO: disable todolist while deleting
    const tasks = useSelector((store: RootState) => store.tasks[id])
    const dispatch = useDispatch()
    const setFilterAll = useCallback(() => setFilter(Filter.ALL, id), [setFilter, id])
    const setFilterACTIVE = useCallback(() => setFilter(Filter.ACTIVE, id), [setFilter, id])
    const setFilterCOMPLETED = useCallback(() => setFilter(Filter.COMPLETED, id), [setFilter, id])
    const deleteTodolistHandler = () => deleteTodolist(id)
    const addTaskHandler = useCallback((taskTitle: string) => {
        // @ts-ignore
        dispatch(addTaskTC(taskTitle, id))
    }, [id, dispatch])
    const changeTodolistTitleHandler = useCallback((newTitle: string) => {
        changeTodolistTitle(newTitle, id)
    }, [id, changeTodolistTitle])
    // @ts-ignore
    const onDeleteHandler = useCallback((taskId: string) => dispatch(deleteTaskTC(taskId, id)), [dispatch, id])
    // const onChangeStatusHandler = useCallback((taskId: string) => dispatch(changeTaskStatusAC(taskId, id)), [dispatch, id])
    // @ts-ignore
    const updateTitle = useCallback((newTaskInfo: UpdateDateType, taskId: string) => dispatch(updateTaskTC(newTaskInfo, taskId, id)), [dispatch, id])
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
    console.log("Todolist is called", id)
    useEffect(() => {

        // @ts-ignore
        dispatch(setTaskTC(id))
    }, [dispatch, id])
    return (
        <div>
            <h3><EditableSpan value={title} changeItemCallback={changeTodolistTitleHandler}/>
                <IconButton onClick={deleteTodolistHandler}><Delete/></IconButton>
            </h3>
            <AddItemForm addItemCallback={addTaskHandler}/>
            <div>
                {tasksForTodolist.map((task) => {

                    return (
                        <Task key={task.id} updateTask={updateTitle}
                              onDelete={onDeleteHandler} title={task.title} status={task.status} id={task.id}
                              startDate={task.startDate} addedDate={task.addedDate} description={task.description}
                              deadline={task.deadline} order={task.order} priority={task.priority}
                              todoListId={task.todoListId}/>
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