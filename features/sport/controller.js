import { apiResponse } from "../../helper/apiResponse.js";
import { StatusCodes } from "http-status-codes";
import cacheService from "../cache/service.js";
import sportService from "./service.js";
import cacheTTL from "../cache/constants.js";

const getCategories = async (req, res, next) => {
  try {
    const { sport } = req.params;

    const key = cacheService.getCacheKey(req);

    let data = cacheService.getCache(key);

    if (!data) {
      data = await sportService.getCategories(sport);

      cacheService.setCache(key, data, cacheTTL.ONE_DAY);
    }

    return apiResponse({
      res,
      data: data,
      status: true,
      message: "Tournament leagues fetched successfully",
      statusCode: StatusCodes.OK,
    });
  } catch (error) {
    next(error);
  }
};
const getDailyEventCount = async (req, res, next) => {
  try {
    const { timezoneOffset } = req.params;

    const key = cacheService.getCacheKey(req);

    let data = cacheService.getCache(key);

    if (!data) {
      data = await sportService.getDailyEventCount(timezoneOffset);

      cacheService.setCache(key, data, cacheTTL.TEN_SECONDS);
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
  getCategories,
  getDailyEventCount,
};
