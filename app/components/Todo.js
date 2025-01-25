import axios from "axios";

export default function Todo ({currentTodo, user, setUser, isDone}) {
    const doneTodo = async() => {
        if(!isDone) {
            const newList = {
                incomplete: user.todos.incomplete.filter((todo) => todo._id !== currentTodo._id),
                complete: [...user.todos.complete, currentTodo]
            };
            setUser({...user, todos: newList});
            await axios.post("api/todos/remove", {todos: newList.incomplete});
        } else {
            isDone = false;
            const newList = {
                incomplete: [...user.todos.incomplete, currentTodo],
                complete: user.todos.complete.filter((todo) => todo._id !== currentTodo._id)
            }
            setUser({...user, todos: newList});
            await axios.post("/api/todos/add", {todo: currentTodo.todo, _id: currentTodo._id});
        }
    }

    return <div className={`todo cursor-pointer ${isDone===true ? "done" : ""}`}>
        <p className={`text-start px-2 py-1 text-3xl`} onClick={doneTodo}>{currentTodo.todo}</p>
    </div>
}