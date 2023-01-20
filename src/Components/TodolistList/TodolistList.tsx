import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {Todolist} from "../Todolist/Todolist";
import React, {FC, useCallback, useEffect} from "react";
import {useSelector} from "react-redux";
import {useActions} from "../../Store/Store";
import {Navigate} from "react-router-dom";
import {
    todolistsSelectors,
    loginSelectors, todolistsActions
} from "../../Store/Reducers";
import Scrollbar from "react-scrollbars-custom";


export const TodolistList: FC = () => {
    const isLoggedIn = useSelector(loginSelectors.isLoggedInSelector)
    const todolists = useSelector(todolistsSelectors.todolistSelector)
    const {
        fetchTodolist,
        addTodolist
    } = useActions(todolistsActions)
    useEffect(() => {
        isLoggedIn && fetchTodolist()
    }, [isLoggedIn, fetchTodolist])
    const addTodolistCallback = useCallback(async (title: string) => {
        addTodolist(title)
    }, [])
    if (!isLoggedIn) return <Navigate to={"/"}/>
    return (
        <>
            <Grid container style={{padding: "20px"}}> <AddItemForm
                placeholder={"Type todolist title..."}
                addItemCallback={addTodolistCallback}/></Grid>
            <Grid container spacing={3}
                  style={{overflowX: "auto", flexWrap: "nowrap", flexGrow:"1", marginBottom:"10px"}}>
                {todolists.map(tl => {
                    return (
                        <Grid key={tl.id} item>
                            <div style={{width: "300px"}}>
                                <Todolist title={tl.title}
                                          id={tl.id}
                                          filter={tl.filter}
                                />
                            </div>
                        </Grid>
                    )
                })}
            </Grid></>
    )
}