import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { ProfileMenu } from "../context/ProfileMenu";

const Login = () => {
    // const [email, emailupdate] = useState('');
    // const [password, passwordupdate] = useState('');

    const {emailupdate, passwordupdate, email, password, checkRoledupdate, checkLogindupdate} = useContext(ProfileMenu)

    const navigate=useNavigate();
    const user={
        email, password
    }

    useEffect(() => {
        fetch("http://localhost:5000/users")
         .then((response) => response.json())
         .then((data) => console.log(data));
        //  .catch((error) => console.error(error));
       }, []);


    function ProceedLogin(e) {
        e.preventDefault()
        axios.get("http://localhost:5000/users").then((response) => {
             console.log(user); 
             response.data.map((res) => { 
                 if ( res.role === "user" && res.password === user.password && res.email === user.email) { 
                    checkRoledupdate(false)
                    checkLogindupdate(true)
                    emailupdate("")
                    passwordupdate("")
                    navigate("/"); 
                }

                 else if ( res.role === "admin" && res.password === user.password && res.email === user.email ) { 
                    checkRoledupdate(true)
                    checkLogindupdate(true)
                    emailupdate("")
                    passwordupdate("")
                    navigate("/"); 
                } 
            }); 
        });
    }
    
    return (
        <div className="row">
            <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
                <form onSubmit={ProceedLogin} className="container">
                    <div className="card">
                        <div className="card-header">
                            <h2>User Login</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>Email<span className="errmsg">*</span></label>
                                <input value={email} onChange={e => emailupdate(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label>Password <span className="errmsg">*</span></label>
                                <input type="password" value={password} onChange={e => passwordupdate(e.target.value)} className="form-control"></input>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary me-2">Login</button>
                            <Link className="btn btn-success" to={'/register'}>New User</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
