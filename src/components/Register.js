import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { APIS } from "../Url/appUrl";
import { register } from "../services/userApi";

const Register = () => {
  const [firstname, firstnamechange] = useState("");
  const [lastname, lastnamechange] = useState("");
  const [password, passwordchange] = useState("");
  const [email, emailchange] = useState("");
  const [phoneNumber, phoneNumberchange] = useState("");
  const navigate = useNavigate();

  const IsValidate = () => {
    let isproceed = true;
    if (firstname === "") {
      isproceed = false;
      alert("Firstname is required");
    }
    if (lastname === "") {
      isproceed = false;
      alert("Lastname is required");
    }
    if (password === "") {
      isproceed = false;
      alert("Password is required");
    }
    if (email === "") {
      isproceed = false;
      alert("Email is required");
    } else if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      isproceed = false;
      alert("Please enter the valid email");
    }
    if (phoneNumber === "") {
      isproceed = false;
      alert("Phone Number is required");
    }
    return isproceed;
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    const regobj = {
      firstname,
      lastname,
      password,
      email,
      role: "user",
      phoneNumber,
    };
    if (IsValidate()) {
      register(regobj);
      navigate("/")
    }
  };

  return (
    <div>
      <div className="offset-lg-3 col-lg-6">
        <form
          className="container"
          style={{ marginTop: "100px" }}
          onSubmit={handlesubmit}
        >
          <div className="card">
            <div className="card-header">
              <h1>User Registeration</h1>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Firstname <span className="errmsg">*</span>
                    </label>
                    <input
                      value={firstname}
                      onChange={(e) => firstnamechange(e.target.value)}
                      className="form-control"
                    ></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Lastname <span className="errmsg">*</span>
                    </label>
                    <input
                      value={lastname}
                      onChange={(e) => lastnamechange(e.target.value)}
                      className="form-control"
                    ></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Email <span className="errmsg">*</span>
                    </label>
                    <input
                      value={email}
                      onChange={(e) => emailchange(e.target.value)}
                      className="form-control"
                    ></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Password <span className="errmsg">*</span>
                    </label>
                    <input
                      value={password}
                      onChange={(e) => passwordchange(e.target.value)}
                      type="password"
                      className="form-control"
                    ></input>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>
                      Phone No.<span className="errmsg">*</span>
                    </label>
                    <input
                      value={phoneNumber}
                      onChange={(e) => phoneNumberchange(e.target.value)}
                      className="form-control"
                    ></input>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary me-2">
                Register
              </button>
              <Link to={"/login"} className="btn btn-danger">
                Close
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
