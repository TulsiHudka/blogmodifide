import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async () => {
    const token = JSON.parse(localStorage.getItem("token"))
    try {
      const response = await axios.get("http://localhost:8000/users",
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      return response.data;
    } catch (error) {
      toast.error(error.message + "Blogs");
    }
  })

const initialState = {
  users: [],
  loading: false,
  error: ""
}

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.loading = true
    },
    [getUsers.fulfilled]: (state, action) => {
      state.loading = false
      state.users = action.payload
      state.error = ""
    },
    [getUsers.rejected]: (state, action) => {
      state.loading = false
      state.users = []
      state.error = action.error.message
    },
  },
})

export const usersReducer = usersSlice.reducer;