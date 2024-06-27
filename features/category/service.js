import axiosInstance from "../../config/axios.config.js";

const getLeagueTournamentList = async (id) => {
  const { data } = await axiosInstance.get(
    `/api/v1/category/${id}/unique-tournaments`
  );

  return data.groups?.[0]?.uniqueTournaments ?? [];
};

export default {
  getLeagueTournamentList,
};
