import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTodos, selectTab } from '../Context/TodoReducer'
import { clearCompletedTodos } from '../Context/TodoReducer'
function Footer() {
    const dispatch = useDispatch()
    const { activeTodos, tab, completedTodos } = useSelector(state => state.TodoReducer)
    const removeComplatedTodo = () => {
        dispatch(clearCompletedTodos())
            .then(() => {
                dispatch(fetchTodos())
            })
    }
    return (

        <footer className="footer">
            <span className="todo-count">
                <strong>{activeTodos.length} </strong>
                items left
            </span>




            <ul className="filters">
                <li className={tab == 'todos' ? "selected" : ""}>
                    <button onClick={() => dispatch(selectTab("todos"))}>All</button>
                </li>
                <li className={tab == 'activeTodos' ? "selected" : ""}>
                    <button onClick={() => dispatch(selectTab("activeTodos"))}>Active</button>
                </li>
                <li className={tab == 'completedTodos' ? "selected" : ""}>
                    <button onClick={() => dispatch(selectTab("completedTodos"))}>Completed</button>
                </li>
            </ul>


            {
                completedTodos.length > 0 && <button className="clear-completed" onClick={() => removeComplatedTodo()} >
                    Clear completed
                </button>
            }

        </footer>
    )
}

export default Footer