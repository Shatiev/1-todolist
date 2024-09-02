import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type ValuesForFilter = 'all' | 'active' | 'completed'

function App() {

    const [tasks, setTasks] = useState(
        [
            {id: 1, title: 'HTML&CSS', isDone: true},
            {id: 2, title: 'JS', isDone: true},
            {id: 3, title: 'ReactJS', isDone: false},
        ])

    const [filter, setFilter] = useState('all')

    const removeTask = (taskId: number) => {
        const allTasks = tasks
        const removedTask = tasks.filter(el => el.id !== taskId)
        setTasks(removedTask)
    }

    const filteredTasks = (filter: ValuesForFilter) => {
        setFilter(filter)
    }

    let allTasks = tasks

    if (filter === 'active') {
        allTasks = tasks.filter(el => el.isDone === false)
    }

    if (filter === 'completed') {
        allTasks = tasks.filter(el => el.isDone === true)
    }

    return (
        <div className="App">
            <Todolist title="What to learn" tasks={allTasks} removeTask={removeTask} filteredTasks={filteredTasks}/>
        </div>
    )
}

export default App;
