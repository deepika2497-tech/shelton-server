import { apiResponse } from "../../helper/apiResponse.js";
import { StatusCodes } from "http-status-codes";
import cacheService from "../cache/service.js";
import sportService from "./service.js";
import cacheTTL from "../cache/constants.js";
import EventCount from "./models/eventCountSchema.js";
import Category from "./models/categorySchema.js";

const getCategories = async (req, res, next) => {
  try {
    const { sport } = req.params;
    const key = cacheService.getCacheKey(req);
    let data = cacheService.getCache(key);
    if (!data) {
      // Check if data exists in the database
      const categoryEntry = await Category.findOne({ sport });

      if (categoryEntry) {
        data = categoryEntry.data;
      } else {
        // Fetch data from the API
        data = await sportService.getCategories(sport);
        cacheService.setCache(key, data, cacheTTL.ONE_DAY);

        // Store the fetched data in the database
        const newCategoryEntry = new Category({ sport, data });
        await newCategoryEntry.save();
      }
    }

    return apiResponse({
      res,
      data: data,
      status: true,
      message: "Tournament leagues fetched successfully",
      statusCode: StatusCodes.OK,
    });
  } catch (error) {
    if (error.response && error.response.status === 403) {
      return apiResponse({
        res,
        status: false,
        message: "Forbidden: You don't have permission to access this resource.",
        statusCode: StatusCodes.FORBIDDEN,
      });
    }
    next(error);
  }
};


const getDailyEventCount = async (req, res, next) => {
  try {
    const { timezoneOffset } = req.params;

    const key = cacheService.getCacheKey(req);

    let data = cacheService.getCache(key);

    if (!data) {
      // Check if data exists in the database
      const eventCountEntry = await EventCount.findOne({ timezoneOffset });
      if (eventCountEntry) {
        data = eventCountEntry.data;
      } else {

        // Fetch data from the API
        data = await sportService.getDailyEventCount(timezoneOffset);
        cacheService.setCache(key, data, cacheTTL.TEN_SECONDS);

        // Store the fetched data in the database
        const newEventCountEntry = new EventCount({ data, timezoneOffset });
        await newEventCountEntry.save();
      }
    }

    let formattedData = Object.keys(data).map(key => {
      return {
          id: key,
          name: key.charAt(0).toUpperCase() + key.slice(1).replace(/-/g, ' '),
          live: data[key].live,
          total: data[key].total
      };
  });

    return apiResponse({
      res,
      data: formattedData,
      status: true,
      message: "Event count fetched successfully",
      statusCode: StatusCodes.OK,
    });
  } catch (error) {
    return apiResponse({
      res,
      status: false,
      message: error.message,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
};

export default {
  getCategories,
  getDailyEventCount,
};
