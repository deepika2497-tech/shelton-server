import axiosInstance from "../../config/axios.config.js";

const getTeamPerformance = async (id) => {
  const { data } = await axiosInstance.get(`/api/v1/team/${id}/performance`);

  return data ?? [];
};
const getTopPlayers = async (params) => {
  const { id, uniqueTournamentId, seasonId, type } = params;

  const { data } = await axiosInstance.get(
    `/api/v1/team/${id}/unique-tournament/${uniqueTournamentId}/season/${seasonId}/top-players/${type}`
  );

  return data.topPlayers ?? [];
};
const getTeamDetails = async (params) => {
  const { id } = params;

  const { data } = await axiosInstance.get(`/api/v1/team/${id}`);

  return data ?? [];
};
const getTeamPLayers = async (params) => {
  const { id } = params;

  const { data } = await axiosInstance.get(`/api/v1/team/${id}/players`);

  return data ?? [];
};

export default {
  getTeamPerformance,
  getTopPlayers,
  getTeamDetails,
  getTeamPLayers,
};
