import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TodoReducer, { fetchTodos, getAllTodo } from '../Context/TodoReducer';
import { completeTodo, removeTodo } from '../Context/TodoReducer';
import { selectTodo } from '../Context/TodoReducer';
function Main() {
    
    const { todos, loading, error ,completedTodos,activeTodos,tab} = useSelector(state => state.TodoReducer);
    const [mapElement, setMapElement] = useState(todos)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    useEffect(() => {
        dispatch(selectTodo())
    }, [todos,tab])

    useEffect(() => {
        if (tab == "todos") {
            setMapElement(todos)
        } else if (tab == "completedTodos") {
            setMapElement(completedTodos)
        } else if (tab == "activeTodos") {
            setMapElement(activeTodos)
        } else
            setMapElement(todos);
            console.log(completedTodos);
    }, [tab, todos])

    const deleteTodo = (param) => {
        dispatch(removeTodo(param))
            .then(() => {
                dispatch(fetchTodos());
            })
            .catch(err => console.log(err))
    }

    const changeCompleted = (id, completed) => {
        dispatch(completeTodo({ id, completed }))
            .then(() => {
                dispatch(fetchTodos());
            })
            .catch((error) => {
                console.log(error);
            });
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        console.log(todos),
        <section className="main">
            <input className="toggle-all" type="checkbox" />
            <label htmlFor="toggle-all">
                Mark all as complete
            </label>

            <ul className="todo-list">
                {mapElement?.map(item => (
                    <li className={item.complated ? "completed" : ""} key={item._id}>
                        <div className="view">
                            <input
                                className="toggle"
                                type="checkbox"
                                checked={item.complated}
                                onChange={(e) => changeCompleted(item._id, e.target.checked)}
                            />
                            <label>{item.title}</label>
                            <button
                                className="destroy"
                                onClick={() => deleteTodo(item._id)}
                            ></button>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default Main