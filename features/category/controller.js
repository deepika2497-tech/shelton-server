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
    console.log("calling...", error)
    next(error);
  }
};

export default {
  getAllTournamentsByCategory,
};
