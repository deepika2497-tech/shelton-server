import { apiResponse } from "../../helper/apiResponse.js";
import { StatusCodes } from "http-status-codes";
import cacheService from "../cache/service.js";
import service from "./service.js";
import cacheTTL from "../cache/constants.js";
import PlayerTeam from "./models/playerByteamSchema.js";
import TeamDetails from "./models/teamDetailsSchema.js";
import teamMedia from "./models/teamMediaSchema.js";

const getTeamPerformance = async (req, res, next) => {
  try {
    const { id } = req.params;

    const key = cacheService.getCacheKey(req);

    let data = cacheService.getCache(key);

    if (!data) {
      data = await service.getTeamPerformance(id);

      cacheService.setCache(key, data, cacheTTL.ONE_DAY);
    }

    return apiResponse({
      res,
      data: data,
      statusCode: StatusCodes.OK,
    });
  } catch (error) {
    next(error);
  }
};

const getTopPlayers = async (req, res, next) => {
  try {
    const key = cacheService.getCacheKey(req);

    let data = cacheService.getCache(key);

    if (!data) {
      data = await service.getTopPlayers(req.params);

      cacheService.setCache(key, data, cacheTTL.ONE_DAY);
    }

    return apiResponse({
      res,
      data: data,
      statusCode: StatusCodes.OK,
    });
  } catch (error) {
    next(error);
  }
};
const getTeamDetails = async (req, res, next) => {
  try {
    const key = cacheService.getCacheKey(req);

    let data = cacheService.getCache(key);

    if (!data) {
      data = await service.getTeamDetails(req.params);

      const detailsTeam = await TeamDetails.findOne({
        teamId: req.params.id,
      });

      if (detailsTeam) {
        data = detailsTeam;
      } else {
        // Fetch data from the API
        data = await service.getTeamDetails(req.params);
        cacheService.setCache(key, data, cacheTTL.ONE_DAY);

        // Store the fetched data in the database
        const teamDetailsEntry = new TeamDetails({
          teamId: req.params.id,
          data,
        });
        await teamDetailsEntry.save();
      }

      cacheService.setCache(key, data, cacheTTL.ONE_DAY);
    }

    return apiResponse({
      res,
      data: data,
      statusCode: StatusCodes.OK,
    });
  } catch (error) {
    next(error);
  }
};
const getTeamPLayers = async (req, res, next) => {
  try {
    const key = cacheService.getCacheKey(req);

    let data = cacheService.getCache(key);

    if (!data) {
      data = await service.getTeamPLayers(req.params);

      const teamPlayerData = await PlayerTeam.findOne({
        teamId: req.params.id,
      });

      if (teamPlayerData) {
        data = teamPlayerData;
      } else {
        // Fetch data from the API
        data = await service.getTeamPLayers(req.params);
        cacheService.setCache(key, data, cacheTTL.ONE_DAY);

        // Store the fetched data in the database
        const teamPlayerEntry = new PlayerTeam({ teamId: req.params.id, data });
        await teamPlayerEntry.save();
      }

      cacheService.setCache(key, data, cacheTTL.ONE_DAY);
    }

    return apiResponse({
      res,
      data: data,
      statusCode: StatusCodes.OK,
    });
  } catch (error) {
    next(error);
  }
};

const getTeamMatchesByTeam = async (req, res, next) => {
  try {
    const { id, span, page } = req.params;

    const key = cacheService.getCacheKey(req);

    let data = cacheService.getCache(key);

    if (!data) {
      data = await service.getTeamMatchesByTeam(id, span, page);

      cacheService.setCache(key, data, cacheTTL.ONE_HOUR);
    }

    return apiResponse({
      res,
      data: data,
      status: true,
      message: "Team matches fetched successfully",
      statusCode: StatusCodes.OK,
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return apiResponse({
        res,
        data: null,
        status: true,
        message: "No team matches found",
        statusCode: StatusCodes.OK,
      });
    } else {
      next(error);
    }
  }
};

const getTeamPlayerStatisticsSeasons = async (req, res, next) => {
  try {
    const { id } = req.params;
    const key = cacheService.getCacheKey(req);
    let data = cacheService.getCache(key);

    if (!data) {
      data = await service.getTeamPlayerStatisticsSeasons(id);

      cacheService.setCache(key, data, cacheTTL.ONE_DAY);
    }

    return apiResponse({
      res,
      data: data,
      status: true,
      message: "Team player statistics seasons fetched successfully",
      statusCode: StatusCodes.OK,
    });
  } catch (error) {
    next(error);
  }
};

const getTeamMedia = async (req, res, next) => {
  try {
    const { id } = req.params;

    const key = cacheService.getCacheKey(req);

    let data = cacheService.getCache(key);

    if (!data) {
      data = await service.getTeamMedia(id);

      const teamPlayerData = await teamMedia.findOne({
        teamId: req.params.id,
      });

      if (teamPlayerData) {
        data = teamPlayerData;
      } else {
        // Fetch data from the API
        data = await service.getTeamMedia(id);
        cacheService.setCache(key, data, cacheTTL.ONE_DAY);

        // Store the fetched data in the database
        const teamMediaEntry = new teamMedia({ teamId: req.params.id, data });
        await teamMediaEntry.save();
      }

      cacheService.setCache(key, data, cacheTTL.ONE_DAY);
    }

    return apiResponse({
      res,
      data: data,
      status: true,
      message: "Team media fetched successfully",
      statusCode: StatusCodes.OK,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getTeamPerformance,
  getTopPlayers,
  getTeamDetails,
  getTeamPLayers,
  getTeamMatchesByTeam,
  getTeamPlayerStatisticsSeasons,
  getTeamMedia,
};
