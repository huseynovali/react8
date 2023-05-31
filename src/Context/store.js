import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from "./TodoReducer";

export const store = configureStore({
    reducer:{
        TodoReducer
    }
})