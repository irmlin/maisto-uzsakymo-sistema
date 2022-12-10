import {ROLES} from "../Enums/Enums";
import axiosInstance from "../httpClient"

export const registerNewUser = async (role, data) => {
    try {
        let endpoint = "";
        if (role === ROLES.COURIER)
            endpoint = "/register/courier";
        else if (role === ROLES.CLIENT)
            endpoint = "/register/client";
        else if (role === ROLES.RESTAURANT)
            endpoint = "/register/restaurant";

        return await axiosInstance.post(endpoint, data);
    } catch (err) {
        console.error("Could not register new user ", err.response);
        return err.response;
    }
};

export const getUserData = async (role, id) => {
    try {
        let endpoint = "";
        if (role === ROLES.COURIER)
            endpoint = `/courier/${id}/data`;
        else if (role === ROLES.CLIENT)
            endpoint = `/client/${id}/data`;
        else if (role === ROLES.RESTAURANT)
            endpoint = `/restaurant/${id}/data`;
        return await axiosInstance.get(endpoint);
    } catch (err) {
        console.error("Could not fetch user data.", err.response);
        return err.response;
    }
};

export const login = async (details) => {
    try {
        return await axiosInstance.post("/login", details);
    } catch (err) {
        console.error("Could not login", err.response);
        return err.response;
    }
};

export const updateCourierTransport = async (id, transport) => {
    try {
        return await axiosInstance.put(`/courier/${id}/transport`, {transport});
    } catch (err) {
        console.error("Could not update courier transport", err.response);
        return err.response;
    }
}

export const updateCourierStatus = async (id, status) => {
    try {
        return await axiosInstance.put(`/courier/${id}/status`, {status});
    } catch (err) {
        console.error("Could not update courier status", err.response);
        return err.response;
    }
}