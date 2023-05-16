import api from "./interceptor";
import { APIS } from "../Url/appUrl";
import axios from "axios";


export const register = async (data) => {
    try {
        const response = await axios.post(`${APIS.USER_API}/register`, data, {
            headers: { "content-type": "application/json" }
        })
        const user = await response?.data;
        if (!user) {
            alert("User not Registered")
        } else {
            alert("User Registered Successfully")
        }
    } catch (e) {
        alert("Something went wrong!!");
    }
}

export const login = async (data) => {
    try {
        const response = await axios.post(`${APIS.USER_API}/login`, data, {
            headers: { "content-type": "application/json" }
        })
        const user = response?.data;
        const token = user?.token;
        if (!token) {
            alert("Please check login credentials")
        } else {
            alert("Login successfully")
            return user
        }
    } catch (e) {
        alert("something went wrong!!")
    }
}

