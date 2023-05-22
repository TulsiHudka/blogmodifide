import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./EditBlog.module.css";
import axios from "axios";
import api from "../services/interceptor";
import { editBlog } from "../services/blogApi";
import { useDispatch } from "react-redux";
import { getBlogs } from "../Store/blog-slice";


function EditBlog() {
  const dispatch = useDispatch();
  const isLogin = JSON.parse(localStorage.getItem("user"))
  const token = JSON.parse(localStorage.getItem("token"))
  const username = isLogin.email.substring(0, isLogin.email.indexOf("@"))
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const [blog, setBlog] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const editBlog = async () => {
      const response = await api.get(`blogs/blogs/${id}`
      )

      setBlog(response.data);
    }
    editBlog();
    setTitle(blog.title);
    setDescription(blog.description);
    setAuthor(blog.author);
    setCategory(blog.category);
  }, [id, blog.title, blog.description, blog.category, blog.author, token]);




  const formData = new FormData();
  formData.append("title", title)
  formData.append("url", url)
  formData.append("description", description)
  formData.append("author", author)
  formData.append("category", category)
  formData.append("admin", username)

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData.get("url"));
    const hjhggkjg = formData
    // try {
    //   await api.put(`blogs/edit/${id}`, formData
    //   )
    console.log(e);
    // editBlog(formData)
    editBlog({ id, formData })
    dispatch(getBlogs)
    navigate("/");


    // }
    // catch (err) {
    //   console.log(err);
    // }
  }

  // useEffect(() => {

  // }, [handleSubmit])

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className="form-outline mb-4">
          <label className="form-label" for="form4Example1">
            Title
          </label>
          <input type="text" id="form4Example1" className="form-control" onChange={(event) => setTitle(event.target.value)} value={title} />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" for="form4Example1">
            URL
          </label>
          <input
            type="file"
            id="form4Example1"
            className="form-control"
            onChange={(event) => setUrl(event.target.files[0])}
            name="url"
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" for="form4Example3">
            Decriprion
          </label>
          <textarea className="form-control" id="form4Example3" rows="4" onChange={(event) => setDescription(event.target.value)} value={description}></textarea>
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" for="form4Example2">
            Author
          </label>
          <input type="text" id="form4Example2" className="form-control" onChange={(event) => setAuthor(event.target.value)} value={author} />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" for="form4Example2">
            category
          </label>
          <input type="text" id="form4Example2" className="form-control" onChange={(event) => setCategory(event.target.value)} value={category} />
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4">
          Update
        </button>
      </form>
    </div>
  );
}

export default EditBlog;
