import React, { useEffect, useState } from 'react'
import { getUsers } from "../Store/user-slice";
import { useDispatch } from "react-redux";
import axios from 'axios';

const ChangeRole = (user) => {
  const data = user?.data
  // console.log(user.data.data._id);
  console.log(data._id);
  const [role, setRole] = useState()
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("token"))
  // const isLogin = JSON.parse(localStorage.getItem("user"))
  // console.log(isLogin);
  // let id = isLogin._id


  useEffect(() => {
    console.log(data);
    setRole(data?.role)
  }, [data?.role])

  const roleChangeHandler = async () => {

    const newData = { ...data, role: role }
    console.log(newData);
    await axios.put(`http://localhost:8000/users/${data._id}`,
      newData
      , {

        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        // body: JSON.stringify(newData)
      })
      // .then((response) => response.json())
      .then((data) => {
        dispatch(getUsers());
      })
      .catch((error) => console.error(error));
  }

  // console.log(data.id);

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