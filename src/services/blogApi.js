import api from "./interceptor";

export const addBlogs = async (blog) => {
    try {
        const response = await api.post(`blogs/addBlog`, blog);
        const addBlog = await response?.data;
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
        const response = await api.get(`blogs/blogs/${id}`)
        const blogPost = response?.data
        if (blogPost) {
            return blogPost
        } else {
            alert("Blogs not found")
        }
    } catch (e) {
        alert(e.message)
    }
}