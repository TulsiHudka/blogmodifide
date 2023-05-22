import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classes from './BlogPost.module.css'
// import axios from "axios";
import { APP_URL } from "../Url/appUrl";
import api from "../services/interceptor";
import blogPost from "../services/blogApi";

function BlogPost() {
  const params = useParams();
  const [blogDetail, setBlogDetail] = useState("")
  const [image, setImage] = useState({})
  console.log(params);
  const token = JSON.parse(localStorage.getItem("token"))

  useEffect(() => {
    blogPost({ id })
    // const BlogPost = async () => {
    //   const response = await api.get(`blogs/blogs/${params.blogId}`)
    //   console.log(response.data);
    //   setBlogDetail(response.data)
    // }
  }, []);
  const imageUrl = `${APP_URL}/uploads/${blogDetail.url}`

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
