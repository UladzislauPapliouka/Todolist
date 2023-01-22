import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react"
import {IAddItemFormProps} from "../../types";
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";

import styles from './AddItemForm.module.css'

export const AddItemForm: FC<IAddItemFormProps> = React.memo(function AddItemForm({addItemCallback, placeholder}) {
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
    const onBlurHandler = () => {
        setError(false)
    }
    const errorMessage = "Field is required"
    const [error, setError] = useState<boolean>(false)
    return (
        <div style={{display: "flex", alignItems: 'center'}}>
            <TextField onKeyPress={onKeyPressHandler}
                       variant={"outlined"}
                       label={placeholder ? placeholder : "Type value"}
                       error={error}
                       fullWidth
                       autoComplete={"off"}
                       onBlur={onBlurHandler}
                       helperText={error && errorMessage}
                       value={newItemTitle}
                       onChange={onChangeHandler}
                       className={`${error && "error"}`}
                       InputProps={{
                           endAdornment: <IconButton
                               color={"primary"}
                               onClick={onAddTaskHandler}><AddBox/></IconButton>
                       }}
            />
        </div>
    )
})