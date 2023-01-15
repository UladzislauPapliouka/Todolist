import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react"
import {IAddItemFormProps} from "../../types";
import {IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";


export const AddItemForm: FC<IAddItemFormProps> = React.memo(({addItemCallback}) => {
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
        setNewItemTitle(event.target.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        error && setError(false)
        event.key === "Enter" && onAddTaskHandler()
    }
    const errorMessage = "Field is required"
    const [error, setError] = useState<boolean>(false)
    return (
        <div>
            <TextField onKeyPress={onKeyPressHandler}
                       variant={"outlined"}
                       label={"Type value"}
                       error={error}
                       helperText={error && errorMessage}
                       value={newItemTitle}
                       onChange={onChangeHandler}
                       className={`${error && "error"}`}
            />
            <IconButton color={"primary"} onClick={onAddTaskHandler}><ControlPoint/></IconButton>
        </div>
    )
})