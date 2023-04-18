import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./EditBlog.module.css";
import axios from "axios";


function AddBlog() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const token = JSON.parse(localStorage.getItem("token"))
  const isLogin = JSON.parse(localStorage.getItem("user"))
  const username = isLogin.email.substring(0, isLogin.email.indexOf("@"))
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
    try {
      await axios.post(`http://localhost:8000/addBlog`, formData, {
        headers: {
          Authorization: "Bearer " + token
        },
      })
      navigate("/");
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className="form-outline mb-4">
          <label className="form-label" for="form4Example1">
            Title
          </label>
          <input
            type="text"
            id="form4Example1"
            className="form-control"
            onChange={(event) => setTitle(event.target.value)}
            value={title}
          />
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
          // value={url}
          />
        </div>


        <div className="form-outline mb-4">
          <label className="form-label" for="form4Example3">
            Decriprion
          </label>
          <textarea
            className="form-control"
            id="form4Example3"
            rows="4"
            onChange={(event) => setDescription(event.target.value)}
            value={description}
          ></textarea>
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" for="form4Example2">
            Author
          </label>
          <input
            type="text"
            id="form4Example2"
            className="form-control"
            onChange={(event) => setAuthor(event.target.value)}
            value={author}
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" for="form4Example2">
            category
          </label>
          <input
            type="text"
            id="form4Example2"
            className="form-control"
            onChange={(event) => setCategory(event.target.value)}
            value={category}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4">
          AddBlog
        </button>
      </form>
    </div>
  );
}

export default AddBlog;
