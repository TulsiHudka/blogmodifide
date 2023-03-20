import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { blogReducer } from "./blog-slice";
import { usersReducer } from "./user-slice";

const rootReducer = combineReducers({
  blog: blogReducer,
  users:usersReducer,
});

export const store = configureStore({
  reducer: rootReducer
});
