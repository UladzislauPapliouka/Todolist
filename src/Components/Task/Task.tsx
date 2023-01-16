import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import React, {FC, useCallback} from "react";
import {ITask, TaskStatuses} from "../../types";

interface TaskProps extends ITask {
    onChangeStatus: (taskId: string) => void
    changeTitle: (newTitle: string, taskId: string) => void
    onDelete: (taskId: string) => void
}

export const Task: FC<TaskProps> = React.memo(({
                                                   id,
                                                   onChangeStatus,
                                                   changeTitle,
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
    const onChangeStatusHandler = () => onChangeStatus(id)
    const changeTitleHandler = useCallback((newTitle: string) => changeTitle(newTitle, id), [id, changeTitle])
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