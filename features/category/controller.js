import { apiResponse } from "../../helper/apiResponse.js";
import { StatusCodes } from "http-status-codes";
import cacheService from "../cache/service.js";
import categoryService from "./service.js";
import cacheTTL from "../cache/constants.js";
// import Tournament from "./tournamentSchema.js";

const getAllTournamentsByCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("id...", id)
    const key = cacheService.getCacheKey(req);

    let data = cacheService.getCache(key);
    console.log("data", data)

    if (!data) {
      data = await categoryService.getAllTournamentsByCategory(id);
      cacheService.setCache(key, data, cacheTTL.ONE_DAY);
    }
    console.log("data1", data)

    return apiResponse({
      res,
      data: data,
      status: true,
      message: "unique tournament by category fetched successfully",
      statusCode: StatusCodes.OK,
    });
  } catch (error) {
    console.log("calling...", error);

    // Additional logging for debugging
    if (error.response) {
      console.log("Response data:", error.response.data);
      console.log("Response status:", error.response.status);
      console.log("Response headers:", error.response.headers);
    } else if (error.request) {
      console.log("Request data:", error.request);
    } else {
      console.log("Error message:", error.message);
    }

    next(error);
  }
};

export default {
  getAllTournamentsByCategory,
};