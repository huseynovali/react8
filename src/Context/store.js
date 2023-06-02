import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import TodoReducer from "./TodoReducer";

const middleware = [...getDefaultMiddleware(), thunkMiddleware];

export const store = configureStore({
  reducer: {
    TodoReducer,
  },
  middleware
});
