import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    todos: [],
    activeTodos: [],
    complateTodos: [],
    tab: null
}

const TodoReducer = createSlice({
    name: "Todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos = [...state.todos, action.payload]
        },
        removeTodo: (state, action) => {
            const filteredTodo = state.todos.filter(item => item.id !== action.payload)
            state.todos = filteredTodo
        },
        complatedTodo: (state, action) => {
            let checkedTodo = state.todos.find(item => item.id == action.payload)
            checkedTodo.complated = !checkedTodo.complated;
        },
        selectTodo: (state) => {
            const nonComplatedTodo = state.todos.filter((item) => item.complated == false);
            const ComplatedTodo = state.todos.filter((item) => item.complated == true);
            state.complateTodos = ComplatedTodo;
            state.activeTodos = nonComplatedTodo;
        },
        selectTab: (state, action) => {
            state.tab = action.payload;
            console.log(action.payload);
        },
        clearComplatedRemove: (state) => {
            const complatedTodoremove = state.todos.filter((item) => item.complated == false);
            state.todos = complatedTodoremove
            state.complateTodos = []
        }
    }
})


export default TodoReducer.reducer;
export const { addTodo, removeTodo, complatedTodo, selectTodo, selectTab, clearComplatedRemove } = TodoReducer.actions