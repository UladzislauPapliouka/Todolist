import React, {FC} from 'react';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {TodolistList} from "./Components/TodolistList/TodolistList";
import {CustomizedSnackbars} from "./Components/ErrorSnackbar/ErrorSnackbar";
import {useSelector} from "react-redux";
import {AppStatuses} from "./types";
import {RootState} from "./Store/Store";

const App:FC = () =>{
    const appStatus = useSelector<RootState, AppStatuses>((state: RootState) => state.app.status)
    return (
        <div className="App">
            <CustomizedSnackbars/>
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
                {appStatus === AppStatuses.Loading && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <TodolistList/>
            </Container>
        </div>
    );
}

export default App;
