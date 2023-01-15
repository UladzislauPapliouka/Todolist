import React, {useCallback} from 'react';
import {Todolist} from "./Components/Todolist/Todolist";
import {Filter} from "./types";
import {v1} from "uuid"
import {AddItemForm} from "./Components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    removeTodolistAC,
    renameTodolistAC,
} from "./Store/Reducers/todolistsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "./Store/Store";

function App() {
    const todolists = useSelector((store: RootState) => store.todolists)

    const dispatch = useDispatch<AppDispatch>()
    const changeFilter = useCallback((filter: Filter, todolistId: string) => {
        dispatch(changeTodolistFilterAC(filter, todolistId))
    }, [dispatch])
    const deleteTodolist = useCallback((todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }, [dispatch])
    const addTodolist = useCallback((todolistTitle: string) => {
        const action = addTodolistAC(todolistTitle, v1())
        dispatch(action)
    }, [dispatch])
    const changeTodolistTitle = useCallback((title: string, todolistId: string) => {
        dispatch(renameTodolistAC(title, todolistId))
    }, [dispatch])

    return (
        <div className="App">
            <AppBar position={"static"}>
                <Toolbar>
                    <IconButton edge={"start"} color={"inherit"} aria-label={"menu"}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={"h6"}>
                        News
                    </Typography>
                    <Button color={"inherit"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
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
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
