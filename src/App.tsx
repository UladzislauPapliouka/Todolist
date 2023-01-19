import React, {FC, useEffect} from 'react';
import {
    AppBar, Box,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {TodolistList} from "./Components/TodolistList/TodolistList";
import {CustomizedSnackbars} from "./Components/ErrorSnackbar/ErrorSnackbar";
import {useSelector} from "react-redux";
import {AppStatuses} from "./types";
import {useAppDispatch} from "./Store/Store";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "./Pages/Login";
import {initializeAppTC} from "./Store/Reducers/AppReducer";
import {loginActions} from "./Store/Reducers";
import {appSelectors} from "./Store/Reducers";


const App: FC = () => {
    const appStatus = useSelector(appSelectors.selectAppStatus)
    const isInitialized = useSelector(appSelectors.selectAppIsInitialized)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])
    if (!isInitialized) {
        return (<Box
            sx={{display: 'flex', width: "100vw", height: "100vh", justifyContent: "center", alignItems: "center"}}>
            <CircularProgress/>
        </Box>)
    }
    const logoutHandler = () => dispatch(loginActions.logoutTC())
    return (
        <BrowserRouter>
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
                        <Button color={"inherit"} onClick={logoutHandler}>Log out</Button>
                    </Toolbar>
                    {appStatus === AppStatuses.Loading && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <Routes>
                        <Route element={<Login/>} index path={"/"}/>
                        <Route element={<TodolistList/>} path={"/todo-lists"}/>
                    </Routes>
                </Container>
            </div>
        </BrowserRouter>
    );
}

export default App;
