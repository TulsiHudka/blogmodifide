import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classes from './BlogPost.module.css'
import { APP_URL } from "../Url/appUrl";
import { blogPost } from "../services/blogApi";

function BlogPost() {
  const params = useParams();
  const [blogDetail, setBlogDetail] = useState('')
  const [image, setImage] = useState({})
  const token = JSON.parse(localStorage.getItem("token"))

  useEffect(() => {

    const id = params.blogId
    console.log(id);
    blogPost({ id }).then(result => {
      console.log(result);
      setBlogDetail(result)
    })
  }, []);
  console.log(blogDetail);
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
