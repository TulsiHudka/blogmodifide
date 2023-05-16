import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
import { toast } from "react-toastify";
import api from "../services/interceptor";

export const getBlogs = createAsyncThunk(
    'blogs/getBlogs',
    async () => {
        // const isLogin = JSON.parse(localStorage.getItem("user"))
        // const token = JSON.parse(localStorage.getItem("token"))
        try {
            const response = await api.get("blogs/blogs"
            );
            return response.data;
        } catch (error) {
            toast.error(error.message + "Blogs");
        }
    })

const initialState = {
    blogs: [],
    loading: false,
    error: ""
}

const blogsSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {},
    extraReducers: {
        [getBlogs.pending]: (state) => {
            state.loading = true
        },
        [getBlogs.fulfilled]: (state, action) => {
            state.loading = false
            state.blogs = action.payload
            state.error = ""
        },
        [getBlogs.rejected]: (state, action) => {
            state.loading = false
            state.blogs = []
            state.error = action.error.message
        },
    },
})

export const blogsReducer = blogsSlice.reducer;