import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {Todolist} from "../Todolist/Todolist";
import React, {FC, useEffect} from "react";
import {useSelector} from "react-redux";
import {useActions} from "../../Store/Store";
import {Navigate} from "react-router-dom";
import {
    todolistsSelectors,
    loginSelectors, todolistsActions
} from "../../Store/Reducers";


export const TodolistList: FC = () => {
    const isLoggedIn = useSelector(loginSelectors.isLoggedInSelector)
    const todolists = useSelector(todolistsSelectors.todolistSelector)
    const {
        fetchTodolist,
        addTodolist
    } = useActions(todolistsActions)
    useEffect(() => {
        isLoggedIn && fetchTodolist()
    }, [isLoggedIn,fetchTodolist])
    if (!isLoggedIn) return <Navigate to={"/"}/>
    return (
        <>
            <Grid container style={{padding: "20px"}}> <AddItemForm addItemCallback={addTodolist}/></Grid>
            <Grid container spacing={3}>
                {todolists.map(tl => {
                    return (
                        <Grid key={tl.id} item>
                            <Paper style={{padding: "10px"}} elevation={3}>
                                <Todolist title={tl.title}
                                          id={tl.id}
                                          filter={tl.filter}
                                />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid></>
    )
}