import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classes from './BlogPost.module.css'
// import axios from "axios";
import { APP_URL } from "../Url/appUrl";
import api from "../services/interceptor";
import { blogPost } from "../services/blogApi";
// import { blogPost.response } from "../services/blogApi";
import { useSelector, useDispatch } from "react-redux";
// import { getBlogs } from "../Store/blog-slice";

function BlogPost() {
  // const dispatch = useDispatch();
  const params = useParams();
  // const { blogs } = useSelector((state) => state?.blogs);
  const [blogDetail, setBlogDetail] = useState('')
  const [image, setImage] = useState({})
  // console.log(params);
  const token = JSON.parse(localStorage.getItem("token"))

  useEffect(() => {

    const id = params.blogId
    console.log(id);
    blogPost({ id }).then(result => {
      console.log(result);
      setBlogDetail(result)
    })
    // console.log(data);
    // const BlogPost = async () => {
    //   const response = await api.get(`blogs/blogs/${params.blogId}`)
    //   console.log(response.data);
    //   setBlogDetail(response.data)
    // }
  }, []);
  console.log(blogDetail);


  // blogPost()
  const imageUrl = `${APP_URL}/uploads/${blogDetail.url}`

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>{blogDetail.title}</h2>
      <img src={imageUrl} alt="dummy-img" style={{ height: "300px", width: "400px" }} />
      <h5 className={classes.author}>{blogDetail.author}</h5>
      <h5 className={classes.category}>{blogDetail.category}</h5>
      <p className={classes.description}>{blogDetail.description}</p>
    </div>
    // blogPost()
    // console.log(blogPost)
  );
}

export default BlogPost;
