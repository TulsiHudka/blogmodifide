import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/userApi";

const Login = () => {
  const [email, emailupdate] = useState("");
  const [password, passwordupdate] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    let result = true
    if (email === '' && password === '') {
      result = false;
      alert("All fields are required")
    }
    else if (email === null || email === '') {
      result = false;
      alert("username is required")
    }
    else if (password === null || password === '') {
      result = false;
      alert("password is required")
    }
    return result;
  }

  const ProceedLogin = async (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    if (validate()) {
      const data = await login(user)
      if (data) {
        localStorage.setItem("user", JSON.stringify(data?.user))
        localStorage.setItem("token", JSON.stringify(data?.token));
        navigate("/")
      }
    }
  }

  return (
    <div className="row">
      <div className="offset-lg-3 col-lg-6" style={{ marginTop: "100px" }}>
        <form onSubmit={ProceedLogin} className="container">
          <div className="card">
            <div className="card-header">
              <h2>User Login</h2>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => emailupdate(e.target.value)}
                  className="form-control"
                ></input>
              </div>
              <div className="form-group">
                <label>
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => passwordupdate(e.target.value)}
                  className="form-control"
                ></input>
              </div>
            </div>
            <div className="card-footer">
              <div style={{ margin: "10px 0 10px 0" }}>
                <button type="submit" className="btn btn-primary me-2">
                  Login
                </button>
                <Link className="btn btn-success" to={"/register"}>
                  New User
                </Link>
              </div>
              <div>
                <span>Forget Password?</span>
                <Link to={"/forgatePassword"} style={{ marginLeft: "5px" }}>Click Here</Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
