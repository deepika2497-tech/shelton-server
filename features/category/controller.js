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
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'max-age=0',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36',
        'Referer': 'https://www.sofascore.com/cricket',
        'Sec-Ch-Ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
        'Sec-Ch-Ua-Mobile': '?1',
        'Sec-Ch-Ua-Platform': '"Android"',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'X-Requested-With': '98f801',
        'Cookie': '_gcl_au=1.1.1425047944.1718961610; _fbp=fb.1.1719052976970.390423490768285702; _scid=f0473888-564f-46c2-9bf6-aab7b681325f; _sctr=1%7C1718994600000; _ga=GA1.1.290726334.1718961610; _scid_r=f0473888-564f-46c2-9bf6-aab7b681325f; _ga_KJHB74QT9D=GS1.1.1719055263.2.0.1719055265.0.0.0; __gads=ID=e43b033d8144a92e:T=1718961617:RT=1719314856:S=ALNI_MYCKe7hZLdJVDgPb5oW7aqnnpiraA; __gpi=UID=00000e59bf8cfff8:T=1718961617:RT=1719314856:S=ALNI_MYPfWVttG_Xfawldg0TOxX2ZOCJ1g; __eoi=ID=0d75557f7be47e6b:T=1718961617:RT=1719314856:S=AA-AfjYVFgzdgxCPDIEr7JsDaJn0; _ga_QH2YGS7BB4=GS1.1.1719312433.21.1.1719314857.0.0.0; _ga_3KF4XTPHC4=GS1.1.1719312432.21.1.1719314857.60.0.0; _ga_HNQ9P9MGZR=GS1.1.1719312433.21.1.1719314857.59.0.0; FCNEC=%5B%5B%22AKsRol_gTEaH8OVcgWaWv4j2h1JmVKydJpAudnd6aT13Sqv6k3Xq2iHnbL_K86qsHU1H3UwTFxXIjuvn_zucRPyCgbtylB6tLHN0moDqECJ_xHlczMh58fkqG8rvwk-3ejSy-N6bz4O0QoCFK3KYuocKlURWTWfLKg%3D%3D%22%5D%5D'
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
