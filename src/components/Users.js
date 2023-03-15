import React, {useState, useEffect} from 'react'
import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

function Users() {
 const [rowData, setRowData] = useState([]);

 useEffect(() => {
  fetch("http://localhost:5000/users")
   .then((response) => response.json())
   .then((data) => setRowData(data))
   .catch((error) => console.error(error));
 }, []);

 const columnDefs = [
  {field:"id"},
  {field:"firstname"},
  {field:"lastname"},
  {field:"email"},
  {field:"phoneNumber"},
  {field:"role"}
 ];
 
  return (
    <div className='ag-theme-alpine' 
         style={{height: "500px", width: "100%", margin: "100px 0"}}>
      <AgGridReact columnDefs={columnDefs} rowData={rowData}/>
    </div>
  )
}

export default Users
