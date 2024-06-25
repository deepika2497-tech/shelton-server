import axiosInstance from "../../config/axios.config.js";

const getCategories = async (sport) => {
  const { data } = await axiosInstance.get(`/api/v1/sport/${sport}/categories`);

  return data.categories;
};

const getDailyEventCount = async (timezoneOffset = 0) => {
  const { data } = await axiosInstance.get(
    `/api/v1/sport/${timezoneOffset}/event-count`
  );

  return data;
};

const getAllLiveMatches = async (sport) => {
  const { data } = await axiosInstance.get(`/api/v1/sport/${sport}/events/live`);
  return data;
};

const getAllMatches = async (sport, date) => {
  // using date this format : 2024-06-22
  const { data } = await axiosInstance.get(`/api/v1/sport/${sport}/scheduled-events/2024-06-22`);
  return data;
};

export default {
  getCategories,
  getDailyEventCount,
  getAllLiveMatches,
  getAllMatches
};
