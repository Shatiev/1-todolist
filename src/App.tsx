import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: v1(), title: 'What to learn', filter: 'all'},
        {id: v1(), title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState(
        [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ])

    const removeTask = (taskId: string) => {
        const allTasks = tasks
        const removedTask = tasks.filter(el => el.id !== taskId)
        setTasks(removedTask)
    }

    const addTask = (title: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        setTasks([...tasks, newTask])
    }

    const changeTaskStatus = (taskId: string, newStatus: boolean) => {
        setTasks(tasks.map(el => el.id === taskId ? {...el, isDone: newStatus} : el))
    }

    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, filter} : el))
    }

    let allTasks = tasks

    return (
        <div className="App">
            {todolists.map(todo => {

                if (todo.filter === 'active') {
                    allTasks = tasks.filter(el => el.isDone === false)
                }

                if (todo.filter === 'completed') {
                    allTasks = tasks.filter(el => el.isDone === true)
                }


                return (
                    <Todolist key={todo.id}
                              todolistId={todo.id}
                              title={todo.title}
                              tasks={allTasks}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeTaskStatus={changeTaskStatus}
                              filter={todo.filter}
                    />)}
                )
            }
        </div>
    )
}

export default App;
