import { apiResponse } from "../../helper/apiResponse.js";
import { StatusCodes } from "http-status-codes";
import cacheService from "../cache/service.js";
import categoryService from "./service.js";
import cacheTTL from "../cache/constants.js";
import TournamentList from "./models/tournamentListSchema.js";

const getAllTournamentsByCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const key = cacheService.getCacheKey(req);
    let data = cacheService.getCache(key);

    if (!data) {
       // Check if data exists in the database
       const categoryTournament = await TournamentList.findOne({ categoryId: id });
       if (categoryTournament) {
        data = categoryTournament.data;
      } else {
         // Fetch data from the API
        data = await categoryService.getAllTournamentsByCategory(id);
        cacheService.setCache(key, data, cacheTTL.ONE_DAY);

        // Store the fetched data in the database
        const tournamentEntry = new TournamentList({ categoryId: id, data });
        await tournamentEntry.save();
      }
    }

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
