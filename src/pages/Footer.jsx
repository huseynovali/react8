import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearComplatedRemove, selectTab } from '../Context/TodoReducer'

function Footer() {
    const dispatch = useDispatch()
    const { activeTodos,tab } = useSelector(state => state.TodoReducer)
    const removeComplatedTodo = () => {
        dispatch(clearComplatedRemove())
    }
    return (

        <footer className="footer">
            <span className="todo-count">
                <strong>{activeTodos.length} </strong>
                items left
            </span>




            <ul className="filters">
                <li className={tab == 'todos' ? "selected":""}>
                    <button  onClick={() => dispatch(selectTab("todos"))}>All</button>
                </li>
                <li className={tab == 'activeTodos' ? "selected":""}>
                    <button  onClick={() => dispatch(selectTab("activeTodos"))}>Active</button>
                </li>
                <li className={tab == 'complateTodos' ? "selected":""}>
                    <button onClick={() => dispatch(selectTab("complateTodos"))}>Completed</button>
                </li>
            </ul>

            <button className="clear-completed" onClick={() => removeComplatedTodo()} >

                Clear completed
            </button>
        </footer>
    )
}

export default Footer