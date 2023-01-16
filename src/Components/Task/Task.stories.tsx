import React from "react"
import {Task} from './Task'
import {action} from "@storybook/addon-actions";
import {TaskPriorities, TaskStatuses} from "../../types";

export default {
    title: "Task component",
    component: Task
}

const statusAction = action("Task status try to change")
const titleAction = action("Task title try to change")
const deleteAction = action("Task try to delete")
export const TaskBase = () => {
    return (
        <>
            <Task onChangeStatus={statusAction}
                  changeTitle={titleAction}
                  onDelete={deleteAction}
                  title={"Task1"}
                  status={TaskStatuses.Completed} startDate={(new Date()).toTimeString()}
                  addedDate={(new Date()).toTimeString()}
                  deadline={(new Date()).toTimeString()} description={""} order={0} priority={TaskPriorities.Later}
                  todoListId={"1"}
                  id={"1"}/>
            <Task onChangeStatus={statusAction}
                  changeTitle={titleAction}
                  onDelete={deleteAction}
                  title={"Task2"}
                  status={TaskStatuses.InProgress} startDate={(new Date()).toTimeString()}
                  addedDate={(new Date()).toTimeString()}
                  deadline={(new Date()).toTimeString()} description={""} order={0} priority={TaskPriorities.High}
                  todoListId={"1"}
                  id={"1"}/>
        </>
    )
}