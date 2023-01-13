import React, {FC} from "react";
import {Filter, ITodolist} from "../../types";

export const Todolist: FC<ITodolist> = ({
                                            title,
                                            tasks,
                                            deleteTaskHandler,
                                            setFilter
                                        }) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasks.map(task => <li>
                    <input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                    <button onClick={() => deleteTaskHandler(task.id)}>X
                    </button>
                </li>)}
            </ul>
            <div>
                <button onClick={() => setFilter(Filter.ALL)}>All</button>
                <button onClick={() => setFilter(Filter.ACTIVE)}>Active</button>
                <button onClick={() => setFilter(Filter.COMPLETED)}>Completed</button>
            </div>
        </div>
    )
}