import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./BlogPost.module.css";
import styled from "styled-components";
import styles from "./EditBlog.module.css"
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

function MyBlog() {
  const [rowData, setRowData] = useState([]);
  const nevigate = useNavigate();
  const isLogin = JSON.parse(localStorage.getItem("user"))
  const username = isLogin.email.substring(0, isLogin.email.indexOf("@"))

  useEffect(() => {
    fetch("http://localhost:5000/blogs")
      .then((response) => response.json())
      .then((data) => {
        const adminBlog = data.filter((res) => {
          if (res.admin === username) {
            console.log(res);
            return res;
          }
        })
        setRowData(adminBlog)
      })
      .catch((error) => console.error(error));
  }, []);

  const deleteHandler = (id) => {
    console.log(`Button clicked for row with ID ${id}`);
    fetch(`http://localhost:5000/blogs/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        fetch(`http://localhost:5000/blogs`)
          .then((response) => response.json())
          .then((data) => setRowData(data));
        nevigate("/")
      });
  };

  const editHandler = (id) => {
    nevigate(`/edit/${id}`);
  };

  const [columnDefs, setcolumnDefs] = useState([
    { field: "id", flex: 1 },
    {
      headerName: "Title",
      field: "title",
      cellRenderer: (e) => {
        const blogId = e.data.id;
        return (
          <Link to={`/${blogId}`} className={classes.blogTitle}>
            {e.value}
          </Link>
        );
      },
    },
    { field: "description" },
    { field: "author" },
    { field: "category" },
    {
      field: "actions",
      cellRendererFramework: ({ data }) => (
        <div className={styles.buttonContainer}>
          <button className={`btn ${styles.edit_delete_button}`}
            onClick={() => editHandler(data.id)}
          >
            Edit{" "}
          </button>
          <button className={`btn ${styles.edit_delete_button}`}
            onClick={() => deleteHandler(data.id)}>Delete</button>
        </div>
      ),
    },
  ]);

  const defaultColDef = {
    sortable: true,
    filter: true,
    floatingFilter: true
  };

  return (
    <Wrapper>
      <div
        className="ag-theme-alpine"
        style={{
          height: "500px",
          width: "87vw",
          margin: "100px auto",
        }}
      >
        <AgGridReact
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowData={rowData}
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

export default MyBlog;
