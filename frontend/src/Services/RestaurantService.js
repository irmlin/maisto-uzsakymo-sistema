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

export const CreateRestaurantMeal = async (restaurantId, rate) => {
  try {
      return await axiosInstance.put(`/meals/${restaurantId}/createmeal`, {rate});
  } catch (err) {
      console.error("Could not create meal.", err.response);
      return err.response;
  }
};

export const UpdateRestaurantMeal = async (mealid, rate) => {
    try {
        return await axiosInstance.put(`/meals/${mealid}/updatemeal`, {rate});
    } catch (err) {
        console.error("Could not update meal.", err.response);
        return err.response;
    }
  };

export const GetRestaurantMeal = async (mealid) => {
    try {
        return await axiosInstance.get(`/meals/${mealid}/getmeal`);
    } catch (err) {
        console.error("Could not find meal.", err.response);
        return err.response;
    }
  };

export const DeleteRestaurantMeal = async (mealid) => {
  try {
      return await axiosInstance.put(`/meals/${mealid}/deletemeal`);
  } catch (err) {
      console.error("Could not delete meal.", err.response);
      return err.response;
  }
};
