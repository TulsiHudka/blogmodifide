import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./EditBlog.module.css";


function EditBlog() {
  const isLogin = JSON.parse(localStorage.getItem("user"))
 console.log(isLogin.email);
 const username = isLogin.email.substring(0, isLogin.email.indexOf("@"))
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  console.log(id);
  const [blog, setBlog] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  useEffect(() => {
    fetch(`http://localhost:5000/blogs/${id}`)
      .then((response) => response.json())
      .then((data) => setBlog(data));
    setTitle(blog.title);
    setDescription(blog.description);
    setAuthor(blog.author);
    setCategory(blog.category);
  }, [id, blog.title, blog.description, blog.category, blog.author]);
  console.log(blog);
  const mainBlog = {
    title,
    description,
    author,
    category,
    admin: username
  };
  console.log(mainBlog);
  function handleSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:5000/blogs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mainBlog),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
    navigate("/");
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div class="form-outline mb-4">
          <label class="form-label" for="form4Example1">
            Title
          </label>
          <input type="text" id="form4Example1" class="form-control" onChange={(event) => setTitle(event.target.value)} value={title}/>
        </div>

        <div class="form-outline mb-4">
          <label class="form-label" for="form4Example3">
            Decriprion
          </label>
          <textarea class="form-control" id="form4Example3" rows="4" onChange={(event) => setDescription(event.target.value)} value={description}></textarea>
        </div>

        <div class="form-outline mb-4">
          <label class="form-label" for="form4Example2">
            Author
          </label>
          <input type="text" id="form4Example2" class="form-control" onChange={(event) => setAuthor(event.target.value)} value={author}/>
        </div>

        <div class="form-outline mb-4">
          <label class="form-label" for="form4Example2">
            category
          </label>
          <input type="text" id="form4Example2" class="form-control" onChange={(event) => setCategory(event.target.value)} value={category} />
        </div>

        <button type="submit" class="btn btn-primary btn-block mb-4">
          Update
        </button>
      </form>
    </div>
  );
}

export default EditBlog;
