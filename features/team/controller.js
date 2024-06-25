import { apiResponse } from "../../helper/apiResponse.js";
import { StatusCodes } from "http-status-codes";
import cacheService from "../cache/service.js";
import service from "./service.js";
import cacheTTL from "../cache/constants.js";

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

export default {
  getTeamPerformance,
  getTopPlayers,
  getTeamDetails,
  getTeamPLayers,
};
