import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {ValuesForFilter} from "./App";

type TitleType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    filteredTasks: (filter: ValuesForFilter) => void
    addTask: (title: string) => void
}

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: TitleType) => {

    const [title, setTitle] = useState('')

    const addTaskHandler = () => {
        props.addTask(title)
        setTitle('')
    }

    const onChangeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const addTaskOnEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            addTaskHandler()
        }
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onChange={onChangeTaskTitle} onKeyUp={addTaskOnEnter}/>
            <button onClick={addTaskHandler}>+</button>
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