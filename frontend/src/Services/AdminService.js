import axiosInstance from "../httpClient"

export const getunaprovedRestaurants = async () => {
  try {
      return await axiosInstance.get("/unaprovedRestaurants");
  } catch (err) {
      console.error("Error occured while selecting restaurants", err.response);
      return err.response;
  }
}

export const approveRestaurant = async(restaurantId, rate, adminId) => {
  try {
    return await axiosInstance.put(`/unaprovedRestaurants/${restaurantId}`, {rate, adminId});
} catch (err) {
    console.error("Error occured while selecting restaurants", err.response);
    return err.response;
}
}

export const getunaprovedCouriers = async () => {
  try {
      return await axiosInstance.get("/unaprovedCouriers");
  } catch (err) {
      console.error("Error occured while selecting restaurants", err.response);
      return err.response;
  }
}

export const approveCourier = async(courierId, rate, adminId) => {
  try {
    return await axiosInstance.put(`/unaprovedCouriers/${courierId}`, {rate, adminId});
} catch (err) {
    console.error("Error occured while selecting restaurants", err.response);
    return err.response;
}
}
