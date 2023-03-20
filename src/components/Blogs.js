import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./BlogPost.module.css";
// import { useContext } from "react";
// import { ProfileMenu } from "../context/ProfileMenu";
import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

function Blogs() {
  // const { checkRole, checkLogin } = useContext(ProfileMenu);
  const [rowData, setRowData] = useState([]);
  const nevigate = useNavigate();
  const isLogin = JSON.parse(localStorage.getItem("user"))
  console.log(isLogin);


  // const dispatch = useDispatch()
  const checkLogin = useSelector(state => state.checkLogin)

  // console.log(checkRole);
  useEffect(() => {
    fetch("http://localhost:5000/blogs")
      .then((response) => response.json())
      .then((data) => setRowData(data))
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
      });
  };

  const editHandler = (id) => {

    console.log(id);
    // fetch(`http://localhost:5000/blog/${id}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    nevigate(`edit/${id}`);
    // });
  };

  const [columnDefs, setcolumnDefs] = useState([
    { field: "id" },
    isLogin?.role === "admin" ?
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
      } : { field: "title" },
    { field: "description" },
    { field: "author" },
    { field: "category" },
    // checkRole &&
    isLogin?.role === "admin" && {
      field: "actions",
      cellRendererFramework: ({ data }) => (
        <div>
          <button
            onClick={() => editHandler(data.id)}
            className={classes.editButton}
          >
            Edit{" "}
          </button>
          <button onClick={() => deleteHandler(data.id)}>Delete</button>
        </div>
      ),
    },
  ]);


  const checkRole = useSelector(state => state.checkRole)

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
            const blogId = e.data.id;
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
    floatingFilter: true
  };

  return (
    <div
      className="ag-theme-alpine"
      style={{
        height: "500px",
        width: isLogin ? "95vw" : "80vw",
        margin: "100px auto",
      }}
    >
      <AgGridReact
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowData={rowData}
      />
    </div>
  );
}

export default Blogs;
