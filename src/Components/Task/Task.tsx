import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import React, {FC, useCallback, useMemo} from "react";
import {ITask, TaskProps, TaskStatuses} from "../../types";
import {useActions} from "../../Store/Store";
import {tasksAsyncActions} from "../../Store/Reducers";

export const Task: FC<TaskProps> = React.memo(({
                                                   id,


                                                   title,

                                                   status,
                                                   todoListId,
                                                   priority,
                                                   order,
                                                   description,
                                                   deadline,
                                                   addedDate,
                                                   startDate
                                               }) => {
    const taskInfo: ITask = useMemo(() => ({
        id,
        title,
        todoListId,
        priority, order,
        description, deadline,
        addedDate,
        startDate, status
    }), [id,
        title,
        todoListId,
        priority, order,
        description, deadline,
        addedDate,
        startDate, status])
    const {updateTask, deleteTask} = useActions(tasksAsyncActions)
    const onChangeStatusHandler = () => updateTask({
        newTaskInfo: {
            ...taskInfo,
            status: status === TaskStatuses.Completed ? TaskStatuses.InProgress : TaskStatuses.Completed
        }, taskId: id, todolistId: todoListId
    })
    const changeTitleHandler = useCallback((newTitle: string) => updateTask({
        newTaskInfo: {
            ...taskInfo,
            title: newTitle
        }, taskId: id, todolistId: todoListId
    }), [id, updateTask, taskInfo, todoListId])
    const onDeleteHandler = useCallback(() => {
        deleteTask({taskId: id, todolistId: todoListId})
    }, [deleteTask, todoListId, id])
    console.log('Task is called')
    return (
        <div className={`${status === TaskStatuses.Completed && "is-done"}`} key={id}>
            <Checkbox
                onChange={onChangeStatusHandler}
                checked={status === TaskStatuses.Completed}/>
            <EditableSpan value={title} changeItemCallback={changeTitleHandler}/>
            <IconButton onClick={onDeleteHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})