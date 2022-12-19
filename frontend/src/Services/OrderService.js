import axiosInstance from "../httpClient"

export const getAvailableOrders = async (cityId) => {
    try {
        return await axiosInstance.get(`/orders/${cityId}`);
    } catch (err) {
        console.error("Could not fetch available orders.", err.response);
        return err.response;
    }
};

export const updateOrderStatus = async (orderId, newStatus) => {
    try {
        return await axiosInstance.put(`/orders/${orderId}/status`, {newStatus});
    } catch (err) {
        console.error("Could not update order status.", err.response);
        return err.response;
    }
};

export const assignOrderToCourier = async (courierId, orderId) => {
    try {
        return await axiosInstance.put(`/orders/${orderId}/assign-courier`, {courierId});
    } catch (err) {
        console.error("Could not assign courier to order.", err.response);
        return err.response;
    }
};

export const cancelDelivery = async (orderId, courierId) => {
    try {
        return await axiosInstance.put(`/orders/${orderId}/cancel-courier`, {courierId});
    } catch (err) {
        console.error("Could not cancel delivery.", err.response);
        return err.response;
    }
};

export const getOrderById = async (orderId) => {
    try {
        return await axiosInstance.get(`/orders/${orderId}/get-one`);
    } catch (err) {
        console.error("Could not fetch available orders.", err.response);
        return err.response;
    }
};

export const getCourierCompletedOrders = async (userId) => {
    try {
        return await axiosInstance.get(`/orders/by-courier/${userId}`);
    } catch (err) {
        console.error("Could not fetch courier's orders.", err.response);
        return err.response;
    }
}

export const getRestaurantCompletedOrders = async (userId) => {
    try {
        return await axiosInstance.get(`/orders/by-restaurant/${userId}`);
    } catch (err) {
        console.error("Could not fetch courier's orders.", err.response);
        return err.response;
    }
}
export const getClientOrders = async (userId) => {
    try {
        return await axiosInstance.get(`/orders/${userId}/client`);
    } catch (err) {
        console.error("Could not fetch courier's orders.", err.response);
        return err.response;
    }
}

export const makeOrder = async (orderData) => {
    try {
        return await axiosInstance.post(`/orders/create`, orderData);
    } catch (err) {
        console.error("Could not create order.", err.response);
        return err.response;
    }
};
