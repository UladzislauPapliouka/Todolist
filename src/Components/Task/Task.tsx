import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import React, {FC, useCallback, useMemo} from "react";
import {ITask, TaskProps, TaskStatuses} from "../../types";

export const Task: FC<TaskProps> = React.memo(({
                                                   id,

                                                   updateTask,
                                                   title,
                                                   onDelete,
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
    const onChangeStatusHandler = () => updateTask({
        ...taskInfo,
        status: status === TaskStatuses.Completed ? TaskStatuses.InProgress : TaskStatuses.Completed
    }, id)
    const changeTitleHandler = useCallback((newTitle: string) => updateTask({
        ...taskInfo,
        title: newTitle
    }, id), [id, updateTask, taskInfo])
    const onDeleteHandler = () => onDelete(id)
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