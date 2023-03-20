import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import ChangeRole from "./ChangeRole";
import { getUsers } from "../Store/user-slice";
import { useSelector, useDispatch } from "react-redux";

function Users() {
  // const [rowData, setRowData] = useState([]);
  const [data, setData] = useState({})
  const roleHandler = (data) => {
    setData(data)
  }

  // const Users = () => {
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state?.users);


    useEffect(() => {
      dispatch(getUsers());
    }, [dispatch]);

    // useEffect(() => {
    //   fetch("http://localhost:5000/users")
    //     .then((response) => response.json())
    //     .then((data) => setRowData(data))
    //     .catch((error) => console.error(error));
    // }, []);

    const columnDefs = [
      { field: "id", flex: 2 },
      { field: "firstname", flex: 3 },
      { field: "lastname", flex: 3 },
      { field: "email", flex: 3 },
      { field: "phoneNumber", flex: 2 },
      { field: "role", flex: 2 },
      {
        field: "actions", flex: 2,
        cellRenderer: (e) => {
          return (
            <button
              className="btn btn-outline-secondary navbar-brand"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={() => roleHandler(e.data)}
            >
              Change Role
            </button>
          );
        },
      },
    ];

    return (
      <div>
        <div
          className="ag-theme-alpine"
          style={{ height: "500px", width: "98vw", margin: "100px auto" }}
        >
          <AgGridReact columnDefs={columnDefs} rowData={users} />
        </div>
        <ChangeRole data={data} />
      </div>
    );
  
}

  export default Users;
