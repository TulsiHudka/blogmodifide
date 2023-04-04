import React, { useEffect, useState } from 'react'
import { getUsers } from "../Store/user-slice";
import { useDispatch } from "react-redux";

const ChangeRole = (user) => {
  const data = user?.data
  console.log(data);
  const [role, setRole] = useState()
  const dispatch = useDispatch();

  useEffect(() => {
    setRole(data?.role)
  }, [data?.role])

  const roleChangeHandler = () => {

    const newData = { ...data, role: role }
    fetch(`http://localhost:5000/users/${data?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(getUsers());
      })
      .catch((error) => console.error(error));
  }

  return (
    <>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Change Role</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <select className="form-select" aria-label="Default select example" value={role
              } onChange={(e) => setRole(e.target.value)}>
                <option value={"admin"}>Admin</option>
                <option value={"user"}>User</option>
              </select>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={roleChangeHandler} >Change</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChangeRole