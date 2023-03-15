import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classes from './BlogPost.module.css'

function BlogPost() {
  const params = useParams();
  const [blogDetail, setBlogDetail] = useState({})
  console.log(params.blogId);

  useEffect(() => {
    fetch(`http://localhost:5000/Blogs/${params.blogId}`)
     .then((response) => response.json())
     .then((blog) => setBlogDetail(blog))
     .catch((error) => console.error(error));
   }, []);

  return (
    <div className={classes.container}>
      {/* <h2>{blogDetail.id}</h2> */}
      <h2 className={classes.title}>{blogDetail.title}</h2>
      <h5 className={classes.author}>{blogDetail.author}</h5>
      <h5 className={classes.category}>{blogDetail.category  }</h5>
      <p className={classes.description}>{blogDetail.description}</p>
    </div>
  );
}

export default BlogPost;
