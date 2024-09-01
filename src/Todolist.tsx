import React from "react";

type TitleType = {
    title: string
    tasks: Array<TaskType>
}

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist = (props: TitleType) => {
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {props.tasks.map(el => <li key={el.id}><input type="checkbox" checked={el.isDone}/> <span>{el.title}</span></li>)}
        </ul>
        <div>
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
        </div>
    </div>
}