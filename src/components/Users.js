import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import ChangeRole from "./ChangeRole";
import { getUsers } from "../Store/user-slice";
import { useSelector, useDispatch } from "react-redux";
import styles from "./EditBlog.module.css"
import styled from "styled-components";

function Users() {
  const [data, setData] = useState({})
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state?.users);
  const roleHandler = (data) => {
    setData(data)
  }

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const columnDefs = [
    { field: "id", flex: 2 },
    { field: "firstname", flex: 2 },
    { field: "lastname", flex: 2 },
    { field: "email", flex: 3 },
    { field: "phoneNumber", flex: 2 },
    { field: "role", flex: 2 },
    {
      field: "actions", flex: 2,
      cellRenderer: (e) => {
        return (
          <div className={styles.buttonContainer}>
            <button
              className={`btn ${styles.edit_delete_button}`}
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={() => roleHandler(e.data)}
            >
              Change Role
            </button>
          </div>
        );
      },
    },
  ];

  const defaultColDef = {
    sortable: true,
    filter: true,
    floatingFilter: true,
    resizable: true
  };

  return (
    <Wrapper>
      <div>
        <div
          className="ag-theme-alpine"
          style={{ height: "485px", width: "92vw", margin: "100px auto" }}
        >
          <AgGridReact columnDefs={columnDefs} rowData={users} defaultColDef={defaultColDef} paginationAutoPageSize={true}
            pagination={true} />
        </div>
        <ChangeRole
          data={data} />
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
export default Users;
