import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

type TitleType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, newStatus: boolean, todolistId: string) => void
    filter: FilterValuesType
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
            props.addTask(title.trim(), props.todolistId)
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
                    props.removeTask(el.id, props.todolistId)
                }

                const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                    const newTaskStatus = e.currentTarget.checked
                    props.changeTaskStatus(el.id, newTaskStatus, props.todolistId)
                }

                return (<li key={el.id} className={el.isDone ? 'is-done' : ''}>
                    <input type="checkbox" checked={el.isDone} onChange={onChangeTaskStatus}/>
                    <span>{el.title}</span>
                    <button onClick={removeTaskHandler}>X</button>
                </li>)
            })}
        </ul>
        <div>
            <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={() => props.changeFilter('all', props.todolistId)}>All</button>
            <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={() => props.changeFilter('active', props.todolistId)}>Active</button>
            <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={() => props.changeFilter('completed', props.todolistId)}>Completed</button>
        </div>
    </div>
}