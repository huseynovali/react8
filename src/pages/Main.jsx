import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TodoReducer, { selectTodo } from '../Context/TodoReducer';
import { complatedTodo, removeTodo } from '../Context/TodoReducer';
function Main() {

    const { todos, complateTodos, activeTodos, tab } = useSelector(state => state.TodoReducer)
    const [mapElement, setMapElement] = useState(todos)

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(selectTodo())
    }, [todos])

    useEffect(() => {
        if (tab == "todos") {
            setMapElement(todos)
        } else if (tab == "complateTodos") {
            setMapElement(complateTodos)
        } else if (tab == "activeTodos") {
            setMapElement(activeTodos)
        } else
            setMapElement(todos)
    }, [tab, todos])

    return (

        <section className="main">
            <input className="toggle-all" type="checkbox" />
            <label htmlFor="toggle-all">
                Mark all as complete
            </label>

            <ul className="todo-list">
                {
                    mapElement.map(item => (
                        <li className={item.complated ? "completed" : ""} key={item.id}>
                            <div className="view">
                                <input className="toggle" type="checkbox" checked={item.complated} onChange={() => dispatch(complatedTodo(item.id))} />
                                <label>{item.content}</label>
                                <button className="destroy" onClick={() => dispatch(removeTodo(item.id))}></button>
                            </div>
                        </li>
                    ))
                }




            </ul>
        </section>


    )
}

export default Main