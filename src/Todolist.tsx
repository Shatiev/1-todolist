import React from "react";
import {ValuesForFilter} from "./App";

type TitleType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    filteredTasks: (filter: ValuesForFilter) => void
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
            {props.tasks.map(el => {

                const removeTaskHandler = () => {
                    props.removeTask(el.id)
                }

                return (<li key={el.id}>
                    <input type="checkbox" checked={el.isDone}/>
                    <span>{el.title}</span>
                    <button onClick={removeTaskHandler}>X</button>
                </li>)
            })}
        </ul>
        <div>
            <button onClick={() => props.filteredTasks('all')}>All</button>
            <button onClick={() => props.filteredTasks('active')}>Active</button>
            <button onClick={() => props.filteredTasks('completed')}>Completed</button>
        </div>
    </div>
}