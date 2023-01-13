import React from 'react';
import './App.css';
import {Todolist} from "./Components/Todolist/Todolist";
import {ITask} from "./types";


const tasks1: Array<ITask> = [
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
const tasks2: Array<ITask> = [
    {
        title: "Milk",
        id: "1",
        isDone: false
    },
    {
        title: "Bread",
        id: "2",
        isDone: true
    },
    {
        title: "Eggs",
        id: "3",
        isDone: false
    }
]
const tasks3: Array<ITask> = [
    {
        title: "Workout",
        id: "1",
        isDone: false
    },
    {
        title: "Pull ups",
        id: "2",
        isDone: true
    },
    {
        title: "Sleep",
        id: "3",
        isDone: false
    }
]

function App() {
    return (
        <div className="App">
            <Todolist title={"What to learn"} tasks={tasks1}/>
            <Todolist title={"What to buy"} tasks={tasks2}/>
            <Todolist title={"What to do"} tasks={tasks3}/>
        </div>
    );
}

export default App;
