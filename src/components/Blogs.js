import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./BlogPost.module.css";
import styles from "./EditBlog.module.css";
import styled from "styled-components";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
// import axios from "axios";
import api from "../services/interceptor";
// import { getUsers } from "../Store/user-slice";
import { useSelector, useDispatch } from "react-redux";
import { getBlogs } from "../Store/blog-slice";

function Blogs() {
  // const [rowData, setRowData] = useState([]);
  const dispatch = useDispatch();
  const [tokenValue, setTokenValue] = useState("");
  const { blogs } = useSelector((state) => state?.blogs);
  const nevigate = useNavigate();
  const isLogin = JSON.parse(localStorage.getItem("user"))
  const token = JSON.parse(localStorage.getItem("token"))
  useEffect(() => {
    if (isLogin) {
      setTokenValue(token);
    }
  }, [])

  useEffect(() => {
    dispatch(getBlogs());
    // const blogs = async () => {
    //   const response = await axios.get("http://localhost:8000/blogs/blogs")
    //   setRowData(response.data)
    // }
    // blogs();
  }, [dispatch]);


  const deleteHandler = async (id) => {
    console.log(`Button clicked for row with ID ${id}`);
    await api.delete(`blogs/blogs/${id}`
    )
      .then((response) => response.json())
      .then((data) => {
        // const response = await axios.get(`http://localhost:8000/blogs/blogs`)
        // setRowData(response.data);
        dispatch(getBlogs())
        // setRowData(response.data);

        nevigate("/")
      });
  };

  const editHandler = (id) => {
    nevigate(`edit/${id}`);
  };

  const [columnDefs, setcolumnDefs] = useState([
    { field: "id", flex: 2 },
    isLogin?.role === "admin" ?
      {
        headerName: "Title",
        field: "title",
        cellRenderer: (e) => {
          const blogId = e.data._id
          return (
            <Link to={`${blogId}`} className={classes.blogTitle}>
              {e.value}
            </Link>
          );
        },
      } : { field: "title" },
    { field: "description" },
    { field: "author" },
    { field: "category" },
    isLogin?.role === "admin" && {
      field: "actions", flex: 3,
      cellRendererFramework: ({ data }) => (
        <div className={styles.buttonContainer}>
          <button className={`btn ${styles.edit_delete_button}`}
            onClick={() => editHandler(data._id)}
          >
            Edit{" "}
          </button>
          <button className={`btn ${styles.edit_delete_button}`}
            onClick={() => deleteHandler(data._id)}>Delete</button>
        </div>
      ),
    },
  ]);

  useEffect(() => {
    if (!isLogin) {
      setcolumnDefs([
        { field: "id" },
        { field: "title" },
        { field: "description" },
        { field: "author" },
        { field: "category" }
      ]);
    }
  }, [isLogin])

  useEffect(() => {
    if (isLogin?.role === "user") {
      setcolumnDefs([
        { field: "id" },
        {
          headerName: "Title",
          field: "title",
          cellRenderer: (e) => {
            const blogId = e.data._id;
            console.log(blogId);
            return (
              <Link to={`/${blogId}`} className={classes.blogTitle}>
                {e.value}
              </Link>
            );
          },
        },
        { field: "description" },
        { field: "author" },
        { field: "category" }
      ]);
    }
  }, []);

  const defaultColDef = {
    sortable: true,
    filter: true,
    floatingFilter: true,
    resizable: true
  };

  return (
    <Wrapper>
      <div
        className="ag-theme-alpine"
        style={{
          height: "483px",
          width: isLogin ? "83vw" : "80vw",
          margin: "100px auto",
        }}
      >
        <AgGridReact
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowData={blogs}
          animateRows={true}
          paginationAutoPageSize={true}
          pagination={true}
        />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
.ag-theme-alpine{
  --ag-header-foreground-color: #D1E8E2;
  --ag-header-background-color: #116466;
  --ag-odd-row-background-color: rgb(181 215 217);
  --ag-foreground-color: #2C3531;
    --ag-background-color: #f0f9f7  
}
`
export default Blogs;
