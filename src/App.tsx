import React, {useEffect, useState} from 'react';
import './App.css';
import {Todolist} from "./Components/Todolist/Todolist";
import {Filter, ITask} from "./types";

function App() {
    const [tasks1, setTask1] = useState<Array<ITask>>(
        [
            {
                title: "CSS",
                id: "1",
                isDone: false
            },
            {
                title: "HTML",
                id: "2",
                isDone: true
            },
            {
                title: "JS",
                id: "3",
                isDone: false
            }
        ]
    )
    const [filter, setFilter] = useState<Filter>(Filter.ALL)

    const deleteTask = (taskId: string) => {
        setTask1(tasks1.filter(task => task.id !== taskId))
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
            <Todolist title={"What to learn"} tasks={tasksForTodolist}
                      setFilter={setFilter}
                      deleteTaskHandler={deleteTask}/>
        </div>
    );
}

export default App;
