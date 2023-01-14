import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Components/Todolist/Todolist";
import {Filter, ITask, ITodolist} from "./types";
import {v1} from "uuid"
import {AddItemForm} from "./Components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

function App() {
    const id1 = v1()
    const id2 = v1()
    const [todolists, setTodolists] = useState<Array<ITodolist>>([
        {id: id1, title: "what to learn", filter: Filter.ALL},
        {id: id2, title: "what to buy", filter: Filter.ACTIVE},
    ])
    const [tasks, setTasks] = useState<{ [Key: string]: Array<ITask> }>({
        [id1]: [
            {
                title: "CSS",
                id: v1(),
                isDone: false
            },
            {
                title: "HTML",
                id: v1(),
                isDone: true
            },
            {
                title: "JS",
                id: v1(),
                isDone: false
            }
        ],
        [id2]: [
            {
                title: "CSS",
                id: v1(),
                isDone: false
            },
            {
                title: "HTML",
                id: v1(),
                isDone: true
            },
            {
                title: "JS",
                id: v1(),
                isDone: false
            }
        ]
    })
    console.log(tasks)
    const changeFilter = (filter: Filter, todolistId: string) => {
        const todolist = todolists.find(td => td.id === todolistId)
        if (todolist) todolist.filter = filter
        setTodolists([...todolists])
    }

    const deleteTask = (taskId: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }
    const addTask = (taskTitle: string, todolistId: string) => {
        const newTask: ITask = {
            id: v1(),
            title: taskTitle,
            isDone: false
        }
        setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]})
    }
    const changeTaskStatus = (taskId: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: !t.isDone} : t)})
    }
    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }
    const addTodolist = (todolistTitle: string) => {
        const newId = v1()
        const newTodolist: ITodolist = {
            id: newId,
            title: todolistTitle,
            filter: Filter.ALL
        }
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newId]: []})
    }
    const changeTodolistTitle = (title: string, todolistId: string) => {
        console.log(title)
        const todolist = todolists.find(td => td.id === todolistId)
        if (todolist) todolist.title = title
        setTodolists([...todolists])
    }
    const changeTaskTitle = (newTitle: string, taskId: string, todolistId: string) => {
        const task = tasks[todolistId].find(t => t.id === taskId)
        if (task) task.title = newTitle
        setTasks({...tasks, [todolistId]: [...tasks[todolistId]]})
    }
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
                        let tasksForTodolist: Array<ITask>
                        switch (tl.filter) {
                            case Filter.ALL:
                                tasksForTodolist = tasks[tl.id]
                                break;
                            case Filter.ACTIVE:
                                tasksForTodolist = tasks[tl.id].filter(task => !task.isDone)
                                break;
                            case Filter.COMPLETED:
                                tasksForTodolist = tasks[tl.id].filter(task => task.isDone)
                                break;
                            default:
                                tasksForTodolist = tasks[tl.id]
                        }
                        return (
                            <Grid item>
                                <Paper style={{padding: "10px"}} elevation={3}>
                                    <Todolist title={tl.title}
                                              id={tl.id}
                                              tasks={tasksForTodolist}
                                              filter={tl.filter}
                                              setFilter={changeFilter}
                                              addTask={addTask}
                                              deleteTaskHandler={deleteTask}
                                              changeTaskStatus={changeTaskStatus}
                                              key={tl.id}
                                              deleteTodolist={deleteTodolist}
                                              changeTodolistTitle={changeTodolistTitle}
                                              changeTaskTitle={changeTaskTitle}
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
