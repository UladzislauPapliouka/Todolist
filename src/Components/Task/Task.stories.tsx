import React from "react"
import {Task} from './Task'
import {action} from "@storybook/addon-actions";

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
                  isDone={false} id={"1"}/>
            <Task onChangeStatus={statusAction}
                  changeTitle={titleAction}
                  onDelete={deleteAction}
                  title={"Task2"}
                  isDone={true} id={"1"}/>
        </>
    )
}