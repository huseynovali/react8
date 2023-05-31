import React, { useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { addTodo } from '../Context/TodoReducer';
//uuidv4();
export default function Header() {
    const dispatch = useDispatch()
    const [todo, setTodo] = useState({
        id: "",
        content: "",
        complated: false
    })
    const onsubmit = (e) => {
        dispatch(addTodo(todo))
        setTodo({
            id: "",
            content: "",
            complated: false
        })
        e.preventDefault()
    }
    return (
        <div>
            <header className="header">
                <h1>todos</h1>
                <form onSubmit={onsubmit}>
                    <input className="new-todo" placeholder="What needs to be done?" value={todo.content} autoFocus onChange={(e) => setTodo({ id: uuidv4(), content: e.target.value.trim(), complated: false })} />
                </form>
            </header></div>
    )
}
