import axiosInstance from "../httpClient"

export const getAvailableOrders = async (cityId) => {
    try {
        return await axiosInstance.get(`/orders/${cityId}`);
    } catch (err) {
        console.error("Could not fetch available orders.", err.response);
        return err.response;
    }
};