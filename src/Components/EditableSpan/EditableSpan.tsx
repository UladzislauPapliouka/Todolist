import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import {IEditableSpanProps} from "../../types";

export const EditableSpan: FC<IEditableSpanProps> = React.memo(({
                                                                    value,
                                                                    changeItemCallback
                                                                }) => {

        const [isEdit, setIsEdit] = useState<boolean>(false)
        const [newItemTitle, setNewItemTitle] = useState<string>("")
        console.log("Editable span is called")
        const changeItemHandler = () => {
            if (newItemTitle.trim()) {
                changeItemCallback(newItemTitle)
                setNewItemTitle("")
            } else {
                // setError(true)
            }
        }
        const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            // setError(false)
            setNewItemTitle(event.target.value)
        }
        const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter") {
                setIsEdit(false)
                changeItemHandler()
            }
        }
        const toggleEditMode = () => {
            isEdit && changeItemHandler()
            setIsEdit(!isEdit)
        }
        // const errorMessage = <span className={"error-message"}>Field is required</span>
        // const [error, setError] = useState<boolean>(false)
        //TODO: add error handler
        return isEdit ?
            <input onKeyPress={onKeyPressHandler}
                   value={newItemTitle.trim() ? newItemTitle : value}
                   onChange={onChangeHandler}
                // className={`${error && "error"}`}
                   autoFocus
                   onBlur={toggleEditMode}
            /> :
            <span onDoubleClick={toggleEditMode}>{newItemTitle.trim() ? newItemTitle : value}</span>
    }
)