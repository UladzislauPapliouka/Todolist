import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {Todolist} from "../Todolist/Todolist";
import React, {FC, useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../Store/Store";
import {Filter} from "../../types";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    deleteTodolistTC, fetchTodolistTC,
    renameTodolistTC
} from "../../Store/Reducers/todolistsReducer";
import {Navigate} from "react-router-dom";


export const TodolistList: FC = () => {
    const isLoggedIn = useSelector<RootState, boolean>(state => state.auth.isLoggedIn)
    const todolists = useSelector((store: RootState) => store.todolists)
    const dispatch = useDispatch()
    const changeFilter = useCallback((filter: Filter, todolistId: string) => {
        dispatch(changeTodolistFilterAC(filter, todolistId))
    }, [dispatch])
    const deleteTodolist = useCallback((todolistId: string) => {
        const action = deleteTodolistTC(todolistId)
        // @ts-ignore
        dispatch(action)
    }, [dispatch])
    const addTodolist = useCallback((todolistTitle: string) => {
        const action = addTodolistTC(todolistTitle)
        // @ts-ignore
        dispatch(action)
    }, [dispatch])
    const changeTodolistTitle = useCallback((title: string, todolistId: string) => {
        // @ts-ignore
        dispatch(renameTodolistTC(title, todolistId))
    }, [dispatch])
    useEffect(() => {
        // @ts-ignore
        isLoggedIn && dispatch(fetchTodolistTC())
    }, [dispatch, isLoggedIn])
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
                                          setFilter={changeFilter}
                                          deleteTodolist={deleteTodolist}
                                          changeTodolistTitle={changeTodolistTitle}
                                          demo
                                />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid></>
    )
}