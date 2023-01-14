import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react"
import {IAddItemFormProps} from "../../types";


export const AddItemForm: FC<IAddItemFormProps> = ({
                                                       addItemCallback
                                                   }) => {
    const [newItemTitle, setNewItemTitle] = useState<string>("")
    const onAddTaskHandler = () => {
        if (newItemTitle.trim()) {
            addItemCallback(newItemTitle)
            setNewItemTitle("")
        } else {
            setError(true)
        }
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setNewItemTitle(event.target.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        event.key === "Enter" && onAddTaskHandler()
    }
    const errorMessage = <span className={"error-message"}>Field is required</span>
    const [error, setError] = useState<boolean>(false)
    return (
        <div>
            <input onKeyPress={onKeyPressHandler}
                   value={newItemTitle}
                   onChange={onChangeHandler}
                   className={`${error && "error"}`}
            />
            <button onClick={onAddTaskHandler}>+</button>
            {error && errorMessage}
        </div>
    )
}