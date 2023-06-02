import React, { useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { addTodo } from '../Context/TodoReducer';
//uuidv4();
export default function Header() {
    const dispatch = useDispatch()
    const [todo, setTodo] = useState({

        title: "",
        complated: false
    })
    const onsubmit = (e) => {
        dispatch(addTodo(todo))
        setTodo({
            title: "",
            complated: false
        })
        e.preventDefault()
    }
    return (
        <div>
            <header className="header">
                <h1>todos</h1>
                <form onSubmit={onsubmit}>
                    <input className="new-todo" placeholder="What needs to be done?" value={todo.title} autoFocus onChange={(e) => setTodo({ title: e.target.value, complated: false })} />
                </form>
            </header></div>
    )
}
