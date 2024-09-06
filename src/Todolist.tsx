import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import AddItemForm from "./addItemForm";
import EditableSpan from "./EditableSpan";

type TodolistType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, newStatus: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    updateTask: (todolistId: string, taskId: string, title: string) => void
    updateTodolist: (todolistId: string, title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: TodolistType) => {

    const addTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }

    const addTaskCallback = (title: string) => {
        props.addTask(title, props.todolistId)
    }

    const updateTodolistHandler = (title: string) => {
        props.updateTodolist(props.todolistId, title)
    }

    return <div>
        <h3>
            <EditableSpan value={props.title} onChange={updateTodolistHandler}/>
            <button onClick={addTodolistHandler}>X</button>
        </h3>
        <AddItemForm addItem={addTaskCallback}/>
        <ul>
            {props.tasks.map(task => {

                const removeTaskHandler = () => {
                    props.removeTask(task.id, props.todolistId)
                }

                const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                    const newTaskStatus = e.currentTarget.checked
                    props.changeTaskStatus(task.id, newTaskStatus, props.todolistId)
                }

                const updateTaskHandler = (title: string) => {
                    props.updateTask(props.todolistId, task.id, title)
                }

                return (<li key={task.id} className={task.isDone ? 'is-done' : ''}>
                    <input type="checkbox" checked={task.isDone} onChange={onChangeTaskStatus}/>
                    <EditableSpan value={task.title} onChange={updateTaskHandler}/>
                    <button onClick={removeTaskHandler}>X</button>
                </li>)
            })}
        </ul>
        <div>
            <button className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={() => props.changeFilter('all', props.todolistId)}>All
            </button>
            <button className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={() => props.changeFilter('active', props.todolistId)}>Active
            </button>
            <button className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={() => props.changeFilter('completed', props.todolistId)}>Completed
            </button>
        </div>
    </div>
}