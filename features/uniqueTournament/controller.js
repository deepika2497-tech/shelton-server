import { apiResponse } from "../../helper/apiResponse.js";
import { StatusCodes } from "http-status-codes";
import cacheService from "../cache/service.js";
import service from "./service.js";
import cacheTTL from "../cache/constants.js";

const getTournamentById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const key = cacheService.getCacheKey(req);

    let data = cacheService.getCache(key);

    if (!data) {
      data = await service.getTournamentById(id);

      cacheService.setCache(key, data, cacheTTL.ONE_DAY);
    }

    return apiResponse({
      res,
      body: data,
      status: true,
      message: "unique tournament fetched successfully",
      statusCode: StatusCodes.OK,
    });
  } catch (error) {
    next(error);
  }
};

const getSeasonsByTournament = async (req, res, next) => {
  try {
    const { id } = req.params;

    const key = cacheService.getCacheKey(req);

    let data = cacheService.getCache(key);

    if (!data) {
      data = await service.getSeasonsByTournament(id);

      cacheService.setCache(key, data, cacheTTL.ONE_DAY);
    }

    return apiResponse({
      res,
      data: data,
      status: true,
      message: "Seasons fetched successfully",
      statusCode: StatusCodes.OK,
    });
  } catch (error) {
    next(error);
  }
};

const getFeaturedEventsByTournament = async (req, res, next) => {
  try {
    const { id } = req.params;

    const key = cacheService.getCacheKey(req);

    let data = cacheService.getCache(key);

    if (!data) {
      data = await service.getFeaturedEventsByTournament(id);

      cacheService.setCache(key, data, cacheTTL.ONE_MINUTE);
    }

    return apiResponse({
      res,
      data: data,
      status: true,
      message: "Featured events fetched successfully",
      statusCode: StatusCodes.OK,
    });
  } catch (error) {
    next(error);
  }
};

const getMediaByTournament = async (req, res, next) => {
  try {
    const { id } = req.params;

    const key = cacheService.getCacheKey(req);

    let data = cacheService.getCache(key);

    if (!data) {
      data = await service.getMediaByTournament(id);

      cacheService.setCache(key, data, cacheTTL.ONE_HOUR);
    }

    return apiResponse({
      res,
      data: data,
      status: true,
      message: "Media fetched successfully",
      statusCode: StatusCodes.OK,
    });
  } catch (error) {
    next(error);
  }
};

const getSeasonInfoByTournament = async (req, res, next) => {
  try {
    const { id, seasonId } = req.params;

    const key = cacheService.getCacheKey(req);

    let data = cacheService.getCache(key);

    if (!data) {
      data = await service.getSeasonInfoByTournament(id, seasonId);

      cacheService.setCache(key, data, cacheTTL.ONE_HOUR);
    }

    return apiResponse({
      res,
      data: data,
      status: true,
      message: "Season info fetched successfully",
      statusCode: StatusCodes.OK,
    });
  } catch (error) {
    next(error);
  }
};

const getSeasonStandingByTournament = async (req, res, next) => {
  try {
    const { id, seasonId, type } = req.params;

    const key = cacheService.getCacheKey(req);

    let data = cacheService.getCache(key);

    if (!data) {
      data = await service.getSeasonStandingByTournament(id, seasonId, type);

      cacheService.setCache(key, data, cacheTTL.TEN_SECONDS);
    }

    return apiResponse({
      res,
      data: data,
      status: true,
      message: "Season standing fetched successfully",
      statusCode: StatusCodes.OK,
    });
  } catch (error) {
    next(error);
  }
};

const getSeasonTopPlayersByTournament = async (req, res, next) => {
  try {
    const { id, seasonId, positionDetailed } = req.params;

    const key = cacheService.getCacheKey(req);

    let data = cacheService.getCache(key);

    if (!data) {
      data = await service.getSeasonTopPlayersByTournament(
        id,
        seasonId,
        positionDetailed
      );

      cacheService.setCache(key, data, cacheTTL.ONE_HOUR);
    }

    return apiResponse({
      res,
      data: data,
      status: true,
      message: "Season top players fetched successfully",
      statusCode: StatusCodes.OK,
    });
  } catch (error) {
    next(error);
  }
};

const getSeasonMatchesByTournament = async (req, res, next) => {
  try {
    const { id, seasonId, span, page } = req.params;

    const key = cacheService.getCacheKey(req);

    let data = cacheService.getCache(key);

    if (!data) {
      data = await service.getSeasonMatchesByTournament(
        id,
        seasonId,
        span,
        page
      );

      cacheService.setCache(key, data, cacheTTL.ONE_HOUR);
    }

    return apiResponse({
      res,
      data: data,
      status: true,
      message: "Season matches fetched successfully",
      statusCode: StatusCodes.OK,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getSeasonsByTournament,
  getFeaturedEventsByTournament,
  getMediaByTournament,
  getSeasonInfoByTournament,
  getSeasonStandingByTournament,
  getSeasonTopPlayersByTournament,
  getSeasonMatchesByTournament,
  getTournamentById,
};
