import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classes from './BlogPost.module.css'
import axios from "axios";

function BlogPost() {
  const params = useParams();
  const [blogDetail, setBlogDetail] = useState("")
  const [image, setImage] = useState({})
  console.log(params.blogId);
  const token = JSON.parse(localStorage.getItem("token"))

  useEffect(() => {
    const BlogPost = async () => {
      const response = await axios.get(`http://localhost:8000/blogs/${params.blogId}`, {
        headers: {
          Authorization: "Bearer " + token
        },
      })
      setBlogDetail(response.data)
    }
    BlogPost()
  }, []);
  const imageUrl = `http://localhost:8000/uploads/${blogDetail.url}`

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>{blogDetail.title}</h2>
      <img src={imageUrl} alt="dummy-img" style={{ height: "300px", width: "400px" }} />
      <h5 className={classes.author}>{blogDetail.author}</h5>
      <h5 className={classes.category}>{blogDetail.category}</h5>
      <p className={classes.description}>{blogDetail.description}</p>
    </div>
  );
}

export default BlogPost;
