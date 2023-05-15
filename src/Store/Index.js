import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { usersReducer } from "./user-slice";
import { blogsReducer } from "./blog-slice";

const rootReducer = combineReducers({
  users: usersReducer,
  blogs: blogsReducer
});

export const store = configureStore({
  reducer: rootReducer
});
