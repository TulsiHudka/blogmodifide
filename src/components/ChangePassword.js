import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom';

function ChangePassword() {
    const [password, passwordupdate] = useState("");
    const [status, statusupdate] = useState("");
    const params = useParams();
    const id = params.id;
    const token = params.token;

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(password);
        if (status === 201) {

            await fetch(`http://localhost:8000/password/changedPassword/${id}/${token}`, {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ password })
            })
        }
    }

    useEffect(() => {
        const abc = async () => {

            const res = await fetch(`http://localhost:8000/password/verifytoken/${id}/${token}`, {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ id, token })
            })
            console.log(res);
            statusupdate(res.status)
        }
        abc()
    }, [])


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
