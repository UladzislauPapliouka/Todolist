import React from "react"
import {Task} from './Task'
import {TaskPriorities, TaskStatuses} from "../../types";
import {ReduxStoreProviderDecorator} from "../../../.storybook/ReduxStoreProviderDecorator";

export default {
    title: "Task component",
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
}

export const TaskBase = () => {
    return (
        <>
            <Task
                title={"Task1"}
                status={TaskStatuses.Completed} startDate={(new Date()).toTimeString()}
                addedDate={(new Date()).toTimeString()}
                deadline={(new Date()).toTimeString()} description={""} order={0} priority={TaskPriorities.Later}
                todoListId={"1"}
                id={"1"}/>
            <Task
                title={"Task2"}
                status={TaskStatuses.InProgress} startDate={(new Date()).toTimeString()}
                addedDate={(new Date()).toTimeString()}
                deadline={(new Date()).toTimeString()} description={""} order={0} priority={TaskPriorities.High}
                todoListId={"1"}
                id={"1"}/>
        </>
    )
}