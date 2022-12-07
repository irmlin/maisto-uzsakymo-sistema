import axios from "axios";
import {ROLES} from "../Enums/Enums";

const axiosInstance = axios.create({
    baseURL:
        "http://localhost:3000/",
    headers: {
        "Content-Type": "application/json",
    },
});

export const registerNewUser = async (role, data) => {
    try {
        let endpoint = "";
        if (role === ROLES.COURIER)
            endpoint = "/register-courier";
        else if (role === ROLES.CLIENT)
            endpoint = "/register-client";
        else if (role === ROLES.RESTAURANT)
            endpoint = "/register-restaurant";

        return await axiosInstance.post(endpoint, data);
    } catch (err) {
        console.error("Could not register new user ", err.response);
        return err.response;
    }
};


