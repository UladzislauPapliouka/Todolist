import React from "react"
import {EditableSpan} from './EditableSpan'
import {action} from "@storybook/addon-actions";

export default {
    title: "EditableSpan component",
    component: EditableSpan
}

const changeItemCallbackAction = action("EditableSpan try to change")

export const EditableSpanBase = () => {
    return (
        <EditableSpan
            value={"Example"}
            changeItemCallback={changeItemCallbackAction}/>
    )
}