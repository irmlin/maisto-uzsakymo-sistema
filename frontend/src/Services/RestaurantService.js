import axiosInstance from "../httpClient"

export const getRestaurants = async (cityId) => {
    try {
        return await axiosInstance.get(`/restaurants/${cityId}`);
    } catch (err) {
        console.error("Could not fetch restaurants.", err.response);
        return err.response;
    }
};

export const getRestaurantMeals = async (restaurantId) => {
  try {
      return await axiosInstance.get(`/meals/${restaurantId}`);
  } catch (err) {
      console.error("Could not fetch restaurant meals.", err.response);
      return err.response;
  }
};