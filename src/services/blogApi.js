import api from "./interceptor";
import Blogs from "../components/Blogs";
// import axios from "axios";
// import { APIS } from "../Url/appUrl";
// import { useNavigate } from "react-router-dom";



export const addBlogs = async (blog) => {
    // const navigate = useNavigate();
    try {
        const response = await api.post(`blogs/addBlog`, blog);
        // console.log(response.data);
        const addBlog = await response?.data;
        // console.log(addBlog);
        if (addBlog) {
            alert("Blog Added Successfully");
        } else {
            alert("Blog not added")
        }
    } catch (e) {
        alert("error", e.message)
    }
}

export const editBlog = async (data) => {
    console.log(data, "ghfdfgdsfdsdfsffgfdfgdf");
    const formData = data.formData;
    const id = data.id
    console.log(id, "ejhgsvbd");
    console.log(formData, "formData");
    try {
        const response = await api.put(`blogs/edit/${id}`, formData);
        const editBlog = await response?.data;

        if (editBlog) {
            alert("Blog Updated Successfully");
            return true;
        } else {
            alert("Blog was not updated");
        }
    } catch (error) {
        alert(error.message);
    }
}

export const deleteBlog = async (data) => {
    // console.log(data)
    // console.log(data.id)
    const id = data.id
    try {
        const response = await api.delete(
            `blogs/blogs/${id}`,
        );
        if (response.status === 200) {
            alert("Blog Deleted Successfully");
        } else {
            alert("Blog can't delete");
        }
    } catch (error) {
        console.log("error", error);
        alert(error.message);
    }
}

export const blogPost = async (data) => {
    const id = data.id
    try {
        const response = await api.get(`blogs/blog/${id}`)
        const blogPost = response?.data.data

        if (!blogPost) {
            alert("Blogs not found")
        } else {
            return blogPost
        }
    } catch (e) {
        alert(e.message)
    }
}