// import React, { useState, useEffect } from "react";
// import { AgGridReact } from "ag-grid-react";

// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";

// function Home() {
//   const [rowData, setRowData] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:3000/blogs")
//       .then((response) => response.json())
//       .then((data) => setRowData(data))
//       .catch((error) => console.error(error));
//   }, []);

//   const columnDefs = [
//     {
//       field: "id",
//     },
//     {
//       field: "title",
//     },
//     {
//       field: "description",
//     },
//     {
//       field: "author",
//     },
//     {
//       field: "category",
//     },
//   ];

//   return (
//     <div
//       className="ag-theme-alpine"
//       style={{ height: "500px", width: "100%", margin: "100px 0px" }}
//     >
//       <AgGridReact columnDefs={columnDefs} rowData={rowData} />
//     </div>
//   );
// }

// export default Home;
