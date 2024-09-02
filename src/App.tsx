import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type ValuesForFilter = 'all' | 'active' | 'completed'

function App() {

    const [tasks, setTasks] = useState(
        [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ])

    const [filter, setFilter] = useState('all')

    const removeTask = (taskId: string) => {
        const allTasks = tasks
        const removedTask = tasks.filter(el => el.id !== taskId)
        setTasks(removedTask)
    }

    const addTask = (title: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        setTasks([...tasks, newTask])
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
            <Todolist title="What to learn"
                      tasks={allTasks}
                      removeTask={removeTask}
                      filteredTasks={filteredTasks}
                      addTask={addTask}/>
        </div>
    )
}

export default App;
