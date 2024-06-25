import axiosInstance from "../../config/axios.config.js";

const getAllTournamentsByCategory = async (id) => {
  const { data } = await axiosInstance.get(
    `/api/v1/category/${id}/unique-tournaments`
  );
  console.log("___________________________", data)
  return data.groups?.[0]?.uniqueTournaments ?? [];
};

export default {
  getAllTournamentsByCategory,
};


// import axios from 'axios';

// const getAllTournamentsByCategory = async (id, headers) => {
//   const url = `https://www.sofascore.com/api/v1/category/${id}/unique-tournaments`;
//   const response = await axios.get(url, { headers });
//   return response.data;
// };

// export default {
//   getAllTournamentsByCategory,
// };
