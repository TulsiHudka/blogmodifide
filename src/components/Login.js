import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, emailupdate] = useState("");
  const [password, passwordupdate] = useState("");
  const navigate = useNavigate();

  const user = {
    email,
    password,
  };

  function ProceedLogin(e) {
    e.preventDefault();
    axios.get("http://localhost:5000/users").then((response) => {
      console.log(response);
      const user1 = response.data.filter((res) => {
        if (
          res.role === "user" &&
          res.password === user.password &&
          res.email === user.email
        ) {
          return res;
        } else if (
          res.role === "admin" &&
          res.password === user.password &&
          res.email === user.email
        ) {
          return res;
        }
      });
      console.log(user1);
      if (user1.length > 0) {
        const user12 = user1[0];
        localStorage.setItem("user", JSON.stringify(user12));
        navigate("/");
      }
    });
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
              <button type="submit" className="btn btn-primary me-2">
                Login
              </button>
              <Link className="btn btn-success" to={"/register"}>
                New User
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
