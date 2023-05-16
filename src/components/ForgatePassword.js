import React from 'react'
import { useState } from 'react'
import { APIS } from '../Url/appUrl';

function ForgatePassword() {

    const [email, emailupdate] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();
        await fetch(`${APIS.PASSWORD_API}/sendpasswordlink`, {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ email })
        })
    }

    return (
        <div className="row" style={{ width: "70%" }}>
            <div className="offset-lg-3 col-lg-6" style={{ margin: "18% 50% " }}>
                <form onSubmit={submitHandler} className="container">
                    <div className="card">
                        <div className="card-header">
                            <h2>Confirm Email</h2>
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

export default ForgatePassword
