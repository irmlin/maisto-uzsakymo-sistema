import axios from "axios";

const axiosInstance = axios.create({
    baseURL:
        "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
    },
});


export const getCitiesCounties = async () => {
  try {
      return await axiosInstance.get("/cities");
  } catch (err) {
      console.error("Error occured while selecting cities", err.response);
      return err.response;
  }
};