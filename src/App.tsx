import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./addItemForm";

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    })

    const removeTask = (taskId: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)})
    }

    const addTask = (title: string, todolistId: string) => {
        const newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const changeTaskStatus = (taskId: string, newStatus: boolean, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, newStatus} : el)
        })
    }

    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, filter} : el))
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists([...todolists.filter(todo => todo.id !== todolistId)])
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    const addTodolist = (title: string) => {
        const todolistId = v1()
        const newTodolist: TodolistType = {id: todolistId, title, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [todolistId]: []})
    }

    const updateTask = (todolistId: string, taskId: string, title: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, title} : task)})
    }

    const updateTodolist = (todolistId: string, title: string) => {
        setTodolists(todolists.map(todo => todo.id === todolistId ? {...todo, title} : todo))
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolists.map(todo => {


                    let allTasks = tasks[todo.id]
                    let filteredTasks = allTasks

                    if (todo.filter === 'active') {
                        filteredTasks = allTasks.filter(el => el.isDone === false)
                    }

                    if (todo.filter === 'completed') {
                        filteredTasks = allTasks.filter(el => el.isDone === true)
                    }


                    return (
                        <Todolist key={todo.id}
                                  todolistId={todo.id}
                                  title={todo.title}
                                  tasks={filteredTasks}
                                  removeTask={removeTask}
                                  changeFilter={changeFilter}
                                  addTask={addTask}
                                  changeTaskStatus={changeTaskStatus}
                                  filter={todo.filter}
                                  removeTodolist={removeTodolist}
                                  updateTask={updateTask}
                                  updateTodolist={updateTodolist}
                        />)
                }
            )
            }
        </div>
    )
}

export default App;
