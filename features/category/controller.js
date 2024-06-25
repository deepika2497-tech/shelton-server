import { apiResponse } from "../../helper/apiResponse.js";
import { StatusCodes } from "http-status-codes";
import cacheService from "../cache/service.js";
import categoryService from "./service.js";
import cacheTTL from "../cache/constants.js";
import Tournament from "./tournamentSchema.js";

const getAllTournamentsByCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("________________", id)

    const key = cacheService.getCacheKey(req);

    let data = cacheService.getCache(key);

    if (!data) {
      // Check if data exists in the database
      const tournamentEntry = await Tournament.findOne({ categoryId: id });

      if (tournamentEntry) {
        data = tournamentEntry.tournaments;
      } else {
        // Fetch data from the service
        data = await categoryService.getAllTournamentsByCategory(id);

        // Store the fetched data in the database
        const newTournamentEntry = new Tournament({ categoryId: id, tournaments: data });
        await newTournamentEntry.save();
      }

      // Cache the data
      cacheService.setCache(key, data, cacheTTL.ONE_DAY);
    }

    // console.log("data", data);

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
