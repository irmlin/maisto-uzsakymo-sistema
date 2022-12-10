import axiosInstance from "../httpClient"

export const getCitiesCounties = async () => {
  try {
      return await axiosInstance.get("/cities");
  } catch (err) {
      console.error("Error occured while selecting cities", err.response);
      return err.response;
  }
};