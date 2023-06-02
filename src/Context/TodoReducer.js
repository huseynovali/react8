import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    todos: [],
    activeTodos: [],
    completedTodos: [],
    tab: null,
    loading: false,
    error: null,
};

export const fetchTodos = createAsyncThunk(
    "todos/fetchTodos",
    async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/todos');
            const todos = response.data;
            return todos;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);
export const addTodo = createAsyncThunk(
    "todos/addTodo",
    async (todo) => {
        try {
            const response = await axios.post('http://localhost:5000/api/todos', todo);
            const newTodo = response.data;
            return newTodo;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);
export const removeTodo = createAsyncThunk(
    "todos/removeTodo",
    async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/deletetodo/${id}`);
            const deletedTodo = response.data;
            console.log(deletedTodo);
            return deletedTodo;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);
export const completeTodo = createAsyncThunk(
    "todos/complatedTodo",
    async (param) => {


        try {
            const response = await axios.put(`http://localhost:5000/api/todo/${param.id}/check`, {
                complated: param.completed
            });
            const complatedTodo = response.data;
            return complatedTodo;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);
export const clearCompletedTodos = createAsyncThunk(
    "todos/removeCompletedTodo",
    async () => {
        try {
            const response = await axios.delete(
                "http://localhost:5000/api/deletecomplatedtodo"
            );
            const deletedTodo = response.data;
            console.log(deletedTodo);
            return deletedTodo;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);


const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {

        selectTodo: (state) => {
            state.activeTodos = state.todos?.filter((todo) => !todo.complated);
            state.completedTodos = state.todos?.filter((todo) => todo.complated);
            console.log(state.completedTodos);
        },
        selectTab: (state, action) => {
            state.tab = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.todos = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addTodo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.todos.push(action.payload);
            })
            .addCase(addTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const {

    selectTodo,
    selectTab,

} = todoSlice.actions;

export default todoSlice.reducer;