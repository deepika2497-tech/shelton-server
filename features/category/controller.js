import { apiResponse } from "../../helper/apiResponse.js";
import { StatusCodes } from "http-status-codes";
import cacheService from "../cache/service.js";
import categoryService from "./service.js";
import cacheTTL from "../cache/constants.js";
import Tournament from "./tournamentSchema.js";

const getAllTournamentsByCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const key = cacheService.getCacheKey(req);

    let data = cacheService.getCache(key);

    if (!data) {
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
      data = await categoryService.getAllTournamentsByCategory(id, headers);

      cacheService.setCache(key, data, cacheTTL.ONE_DAY);
    }

    const tournamentEntry = new Tournament({ data });
    await tournamentEntry.save();


    return apiResponse({
      res,
      data: data,
      status: true,
      message: "unique tournament by category fetched successfully",
      statusCode: StatusCodes.OK,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getAllTournamentsByCategory,
};
