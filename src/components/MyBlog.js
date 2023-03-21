import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./BlogPost.module.css";
// import { useContext } from "react";
// import { ProfileMenu } from "../context/ProfileMenu";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import styles from "./EditBlog.module.css"


import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

function MyBlog() {
  // const { checkRole, checkLogin } = useContext(ProfileMenu);
  const [rowData, setRowData] = useState([]);
  const nevigate = useNavigate();
  const isLogin = JSON.parse(localStorage.getItem("user"))
  const username = isLogin.email.substring(0, isLogin.email.indexOf("@"))
console.log(username);
  
  // const dispatch = useDispatch()
  const checkLogin = useSelector(state => state.checkLogin) 

  // console.log(checkRole);
  useEffect(() => {
    fetch("http://localhost:5000/blogs")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
       const adminBlog = data.filter((res) => {
        // console.log(res);  
        if(res.admin === username){
          console.log(res);
          return res;
        }
        
      })
      console.log(adminBlog);
      setRowData(adminBlog)
        // console.log(adminBlog);
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

    console.log(id);
    // fetch(`http://localhost:5000/blog/${id}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    nevigate(`/edit/${id}`);
    // });
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
    // checkRole &&
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
// const checkRole =  useSelector(state => state.checkRole) 

  // useEffect(() => {
  //   if (!isLogin?.role === "admin") {
  //     setcolumnDefs([
  //       { field: "id" },
  //       isLogin?.role === "user" ?
  //       {
  //         headerName: "Title",
  //         field: "title",
  //         cellRenderer: (e) => {
  //           const blogId = e.data.id;
  //           return (
  //             <Link to={`/${blogId}`} className={classes.blogTitle}>
  //               {e.value}
  //             </Link>
  //           );
  //         },
  //       } : { field: "title" },
  //       { field: "description" },
  //       { field: "author" },
  //       { field: "category" }
  //     ]);
  //   }
  // }, [ isLogin]);

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
        // width: isLogin ? "90vw" : "80vw",
        margin: "100px auto",
      }}
    >
      <AgGridReact
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowData={rowData}
        animateRows={true}
        // onGridReady={onGridReady}
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
