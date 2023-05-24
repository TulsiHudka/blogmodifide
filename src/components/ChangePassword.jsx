import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { verifyToken } from '../services/passwordApi';
import { changedPassword } from '../services/passwordApi';

function ChangePassword() {
    const [password, passwordupdate] = useState("");
    const [status, statusupdate] = useState("");
    const params = useParams();
    const id = params.id;
    const token = params.token;
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(password);
        if (status === 201) {
            changedPassword(id, token, password)
            alert("password changed sucessfully")
            navigate("/login")
        }
    }

    useEffect(() => {
        const validate = async () => {
            const response = await verifyToken(id, token)
            if (response) {
                alert("user validate succesfully")
            } else {
                alert("Password Reset Link expired, Generate new Link")
                navigate("/login")
            }
            console.log(response);
            statusupdate(response.status)
        }
        validate()
    }, [id, token, navigate])

    return (
        <div className="row" style={{ width: "70%" }}>
            <div className="offset-lg-3 col-lg-6" style={{ margin: "18% 50% " }}>
                <form onSubmit={submitHandler} className="container">
                    <div className="card">
                        <div className="card-header">
                            <h2>New Password</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>
                                    Password
                                </label>
                                <input
                                    value={password}
                                    onChange={(e) => passwordupdate(e.target.value)}
                                    className="form-control"
                                ></input>
                            </div>
                        </div>
                        <div className="card-footer" style={{ margin: "10px 0 10px 0" }}>
                            <button type="submit" className="btn btn-primary me-2" style={{ width: "100%" }}>
                                Send
                            </button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChangePassword
