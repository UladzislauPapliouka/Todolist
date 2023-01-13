import React, {useEffect, useState} from 'react';
import './App.css';
import {Todolist} from "./Components/Todolist/Todolist";
import {Filter, ITask} from "./types";
import {v1} from "uuid"

function App() {
    const [tasks1, setTask1] = useState<Array<ITask>>(
        [
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
    )
    console.log(tasks1)
    const [filter, setFilter] = useState<Filter>(Filter.ALL)

    const deleteTask = (taskId: string) => {
        setTask1(tasks1.filter(task => task.id !== taskId))
    }
    const addTask = (taskTitle: string) => {
        const newTask: ITask = {
            id: v1(),
            title: taskTitle,
            isDone: false
        }
        setTask1([newTask, ...tasks1])
    }
    const [tasksForTodolist, setTaskForTodolist] = useState<Array<ITask>>(tasks1)
    useEffect(() => {
        setTaskForTodolist(tasks1)
    }, [tasks1])
    useEffect(() => {
        switch (filter) {
            case Filter.ALL:
                setTaskForTodolist(tasks1)
                break;
            case Filter.ACTIVE:
                setTaskForTodolist(tasks1.filter(task => task.isDone === false))
                break;
            case Filter.COMPLETED:
                setTaskForTodolist(tasks1.filter(task => task.isDone === true))
                break;
            default:
                setTaskForTodolist(tasks1)
        }
    }, [filter, tasks1])
    return (
        <div className="App">
            <Todolist title={"What to learn"}
                      tasks={tasksForTodolist}
                      setFilter={setFilter}
                      addTask={addTask}
                      deleteTaskHandler={deleteTask}/>
        </div>
    );
}

export default App;
