import { apiResponse } from "../../helper/apiResponse.js";
import { StatusCodes } from "http-status-codes";
import cacheService from "../cache/service.js";
import categoryService from "./service.js";
import cacheTTL from "../cache/constants.js";
import Tournament from "./tournamentSchema.js";

const getAllTournamentsByCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("id...", id);

    // const key = cacheService.getCacheKey(req);

    // let data = cacheService.getCache(key);
    // console.log("data from cache", data);

    // if (!data) {
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
    //   console.log("Request headers:", headers);

    //   data = await categoryService.getAllTournamentsByCategory(id, headers);
    //   console.log("data from service", data);

    //   cacheService.setCache(key, data, cacheTTL.ONE_DAY);
    // }

    // const tournamentEntry = new Tournament({ data });
    // await tournamentEntry.save();

    const url = `https://www.sofascore.com/api/v1/category/${id}/unique-tournaments`;
    const response = await axios.get(url, { headers });
    console.log("response------------", response)
    // return response.data;

    return apiResponse({
      res,
      data: response.data,
      status: true,
      message: "unique tournament by category fetched successfully",
      statusCode: StatusCodes.OK,
    });
  } catch (error) {
    console.log("Error occurred:", error);

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