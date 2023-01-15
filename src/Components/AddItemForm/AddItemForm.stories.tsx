import React from "react";
import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions"

export default {
    title: "Add Item Form",
    component: AddItemForm
}
const AddItemFormCallBack = action("AddItemForm callback was called")
export const AddItemFormBase = () => {
    return <AddItemForm addItemCallback={AddItemFormCallBack}/>
}