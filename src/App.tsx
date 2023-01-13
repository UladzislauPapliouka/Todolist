import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Components/Todolist/Todolist";
import {Filter, ITask, ITodolist} from "./types";
import {v1} from "uuid"

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

    return (
        <div className="App">
            {todolists.map(td => {
                let tasksForTodolist: Array<ITask>
                switch (td.filter) {
                    case Filter.ALL:
                        tasksForTodolist = tasks[td.id]
                        break;
                    case Filter.ACTIVE:
                        tasksForTodolist = tasks[td.id].filter(task => !task.isDone)
                        break;
                    case Filter.COMPLETED:
                        tasksForTodolist = tasks[td.id].filter(task => task.isDone)
                        break;
                    default:
                        tasksForTodolist = tasks[td.id]
                }
                return (
                    <Todolist title={td.title}
                              id={td.id}
                              tasks={tasksForTodolist}
                              filter={td.filter}
                              setFilter={changeFilter}
                              addTask={addTask}
                              deleteTaskHandler={deleteTask}
                              changeTaskStatus={changeTaskStatus}
                              key={td.id}
                              deleteTodolist={deleteTodolist}
                    />
                )
            })}
        </div>
    );
}

export default App;
