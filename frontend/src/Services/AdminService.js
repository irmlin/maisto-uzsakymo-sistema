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
      console.error("Error occured while selecting couriers", err.response);
      return err.response;
  }
}

export const approveCourier = async(courierId, rate, adminId) => {
  try {
    return await axiosInstance.put(`/unaprovedCouriers/${courierId}`, {rate, adminId});
} catch (err) {
    console.error("Error occured while selecting couriers", err.response);
    return err.response;
}
}

export const getCouriers = async () => {
  try {
      return await axiosInstance.get("/couriers");
  } catch (err) {
      console.error("Error occured while selecting couriers", err.response);
      return err.response;
  }
}

export const deleteCouriers = async (courierId) => {
  try {
      return await axiosInstance.delete(`/couriers/${courierId}`);
  } catch (err) {
      console.error("Error occured while selecting couriers", err.response);
      return err.response;
  }
}

export const editCourier = async (courierId, rate) => {
  try {
      return await axiosInstance.put(`/couriers/${courierId}/agreement`, {rate});
  } catch (err) {
      console.error("Error occured while selecting couriers", err.response);
      return err.response;
  }
}

export const getRestaurants = async () => {
  try {
      return await axiosInstance.get("/restaurants");
  } catch (err) {
      console.error("Error occured while selecting restaurants", err.response);
      return err.response;
  }
}

export const deleteRestaurant = async (restaurantId) => {
  try {
      return await axiosInstance.delete(`/restaurants/${restaurantId}`);
  } catch (err) {
      console.error("Error occured while selecting couriers", err.response);
      return err.response;
  }
}

export const editRestaurant = async (restaurantId, tax) => {
  try {
      return await axiosInstance.put(`/restaurants/${restaurantId}/agreement`, {tax});
  } catch (err) {
      console.error("Error occured while selecting couriers", err.response);
      return err.response;
  }
}
