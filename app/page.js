"use client"
import { useEffect, useState } from "react";

export default function Home() {
    const [todoInput, setTodoInput] = useState("");
    const [todoList, setTodoList] = useState({incomplete: [], complete: []});

    useEffect(() => {
        if(!localStorage.getItem("todos")) return
        setTodoList({incomplete: JSON.parse(localStorage.getItem("todos")), complete: []})
    }, [])

    const addTodo = () => {
        if(todoInput.length === 0) return
        todoList.incomplete.push(todoInput);
        localStorage.setItem("todos", JSON.stringify(todoList.incomplete))
        setTodoInput("");
    }

    return <div className="todo-list text-center rounded">
        <div className="todo-content">
        <h1 className="text-5xl font-medium mt-2">Todo List</h1>
        <div className="todos">
            {todoList.complete.map((todo, index) => <Todo todo={todo} todoList={todoList} setTodoList={setTodoList} isDone={true} key={index}/>)}
            {todoList.incomplete.map((todo, index) => <Todo todo={todo} todoList={todoList} setTodoList={setTodoList} isDone={false} key={index}/>)}
        </div>
        </div>
        <div className="add-note flex">
            <input type="text" className="w-full px-4 py-2" value={todoInput} onChange={(e) => setTodoInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addTodo()} placeholder="add note..."/>
            <button className="text-white" value={todoInput} onClick={() => addTodo()}>+</button>
        </div>
    </div>
}

const Todo = (props) => {
    const {todo, todoList, setTodoList, isDone} = props;

    const doneTodo = () => {
        if(isDone) return
        const newList = {incomplete: todoList.incomplete.filter((currentTodo) => currentTodo !== todo), complete: [...todoList.complete, todo]}
        setTodoList(newList)
        localStorage.setItem("todos", JSON.stringify(newList.incomplete))
    }

    return <div className="todo">
        <p className={`text-start p-1 text-2xl ${isDone===true ? "done" : ""}`} onClick={doneTodo}>{todo}</p>
    </div>
}