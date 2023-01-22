import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import {IEditableSpanProps} from "../../types";
import {TextField, Typography} from "@mui/material";
import styles from "./EditableSpan.module.css"

export const EditableSpan: FC<IEditableSpanProps> = React.memo(function EditableSpan({
                                                                                         value,
                                                                                         changeItemCallback,
                                                                                         variant
                                                                                     }) {

        const [isEdit, setIsEdit] = useState<boolean>(false)
        const [newItemTitle, setNewItemTitle] = useState<string>(value)
        console.log("Editable span is called")
        const changeItemHandler = () => {
            if (!newItemTitle.trim()) {
                setError("Field is required")
                setNewItemTitle(value)
            } else if (newItemTitle.trim().length > 100) {
                setError("Field must be less then 100 symbols")
                setNewItemTitle(value)
            } else {
                changeItemCallback(newItemTitle)
            }
        }
        const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            setError(null)
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
        const [error, setError] = useState<string | null>("")
        //TODO: add error handler
        return isEdit ?
            <TextField onKeyPress={onKeyPressHandler}
                       value={newItemTitle.trim() ? newItemTitle : value}
                       onChange={onChangeHandler}
                       className={styles.editMode}
                       helperText={error && error}
                       error={!!error}
                       autoFocus
                       onBlur={toggleEditMode}
            /> :
            <Typography className={styles.spanMode} variant={variant ? variant : "body1"}
                        onDoubleClick={toggleEditMode}>{newItemTitle.trim() ? newItemTitle : value}</Typography>
    }
)