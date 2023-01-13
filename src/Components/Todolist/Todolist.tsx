import React, {FC} from "react";
import {ITodolist} from "../../types";

export const Todolist: FC<ITodolist> = ({
                                            title,
                                            tasks
                                        }) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasks.map(task => <li><input type="checkbox" checked={task.isDone}/><span>{task.title}</span></li>)}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}