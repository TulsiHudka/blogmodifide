import React from 'react'
import { useState } from 'react'
import { sendPasswordLink } from '../services/passwordApi';

function ForgatePassword() {
    const [email, emailupdate] = useState("");
    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await sendPasswordLink(email)
        console.log(response);
        if (response.status === 201) {
            alert("Password reset link send successfully in your Email")
        } else {
            alert("Invalid User")
        }
        emailupdate('')
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
