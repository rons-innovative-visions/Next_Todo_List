"use client"
import { useEffect, useState } from "react";
import { Todo, Loader } from "./components";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const [todoInput, setTodoInput] = useState("");
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({
        name: '', 
        email: '', 
        todos: {
            incomplete: [],
            complete: []
        }
    })

    useEffect(() => {
        getData();
        setLoading(false);
    }, [])

    const handleSignOut = async () => {
        try{
            await axios.post("/api/signout");
            router.push("/");
        } catch(err){
            console.log(err);
        }
    }

    const getData = async () => {
        try{
            const res = await axios.get("/api/todos/get");
            setUser({...res.data.user, todos: {
                incomplete: res.data.user.todos,
                complete: [...user.todos.complete],
            }})
        } catch(err){
            console.log(err);
            if(err.status === 404) router.push('/');
        }
    }

    const addTodo = async () => {
        try{
            if(todoInput.length === 0) return
            await axios.post("/api/todos/add", {todo: todoInput});
            setTodoInput("");
            getData();
        } catch(err) {
            console.log(err);
        }
    }

    return <div className={`todo-list text-center rounded ${loading ? "items-center" : ""}`}>
        {loading ?
            <Loader />
        :
            <>
            <div className="todo-content">
                <div className="px-4 my-2">
                    <Image src="/signout.svg"
                        width={46}
                        height={46}
                        className="relative float-end cursor-pointer brightness-90 hover:brightness-100 transition-all"
                        alt="signout"
                        onClick={() => handleSignOut()}
                    />
                    <h1 className="text-5xl font-medium pl-4">{user.name}&apos;s Todo List</h1>
                </div>
                <div className="todos">
                    {user.todos.complete.map((currentTodo, index) => {
                        const props = {currentTodo, user, setUser, isDone: true};
                        return (<Todo key={index} {...props} />)
                    })}
                    {user.todos.incomplete.map((currentTodo, index) => {
                        const props = {currentTodo, user, setUser, isDone: false};
                        return (<Todo key={index} {...props} />)
                    })}
                </div>
            </div>
            <div className="add-note flex">
                <input type="text" className="w-full px-4 py-2" value={todoInput} onChange={(e) => setTodoInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addTodo()} placeholder="add note..."/>
                <button className="text-white" value={todoInput} onClick={() => addTodo()}>+</button>
            </div>
            </>
        }
    </div>
}