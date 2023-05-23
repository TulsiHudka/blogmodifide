import api from "./interceptor";
import { APIS } from "../Url/appUrl";

export const sendPasswordLink = async (email) => {
    try {
        const response = await api.post(`${APIS.PASSWORD_API}/sendpasswordlink`, { email: email })
        return response
    } catch (e) {
        alert(e)
    }
}

export const changedPassword = async (id, token, password) => {
    try {
        const response = await api.put(`${APIS.PASSWORD_API}/changedPassword/${id}/${token}`, { password: password })
        return response
    } catch (e) {
        alert(e)
    }
}

export const verifyToken = async (id, token) => {
    try {
        const response = await api.get(`${APIS.PASSWORD_API}/verifytoken/${id}/${token}`)
        return response
    } catch (e) {
        alert("heloooooo")
    }
}