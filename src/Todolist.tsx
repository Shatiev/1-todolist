import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {ValuesForFilter} from "./App";

type TitleType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    filteredTasks: (filter: ValuesForFilter) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, newStatus: boolean) => void
}

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: TitleType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim())
            setTitle('')
        } else {
         setError('title is required')
        }
    }

    const onChangeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const addTaskOnEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === "Enter") {
            addTaskHandler()
        }
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input className={error ? 'error' : ''} value={title} onChange={onChangeTaskTitle} onKeyUp={addTaskOnEnter}/>
            <button onClick={addTaskHandler}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
        <ul>
            {props.tasks.map(el => {

                const removeTaskHandler = () => {
                    props.removeTask(el.id)
                }

                const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                    const newTaskStatus = e.currentTarget.checked
                    props.changeTaskStatus(el.id, newTaskStatus)
                }

                return (<li key={el.id}>
                    <input type="checkbox" checked={el.isDone} onChange={onChangeTaskStatus}/>
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