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
import {useDispatch, useSelector} from "react-redux";
import {AppStatuses} from "./types";
import {RootState} from "./Store/Store";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "./Pages/Login";
import {inicializeAppTC} from "./Store/Reducers/AppReducer";
import {logoutTC} from "./Store/Reducers/LoginReducer";

const App: FC = () => {
    const appStatus = useSelector<RootState, AppStatuses>((state: RootState) => state.app.status)
    const isInitialized = useSelector<RootState, boolean>(state => state.app.isInitialized)
    const dispatch = useDispatch()
    useEffect(() => {
        // @ts-ignore
        dispatch(inicializeAppTC())
    }, [dispatch])
    if (!isInitialized) {
        return (<Box
            sx={{display: 'flex', width: "100vw", height: "100vh", justifyContent: "center", alignItems: "center"}}>
            <CircularProgress/>
        </Box>)
    }
    // @ts-ignore
    const logoutHandler = () => dispatch(logoutTC())
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
