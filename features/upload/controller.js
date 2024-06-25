import { StatusCodes } from "http-status-codes";
import { apiResponse } from "../../helper/apiResponse.js";
import fileService from "./service.js";

const uploadFile = async (req, res) => {
  try {
    const { files } = req;

    const uploadFilePromises = [];

    for (const file of files) {
      uploadFilePromises.push(
        fileService.uploadFile({
          buffer: file.buffer,
          mimetype: file.mimetype,
        })
      );
    }

    const data = await Promise.all(uploadFilePromises);

    return apiResponse({
      res,
      statusCode: StatusCodes.CREATED,
      message: "File uploaded successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    return apiResponse({
      res,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
};
const deleteFile = async (req, res) => {
  try {
    const { fileKeys } = req.body;

    const deleteFilePromises = [];

    for (const fileKey of fileKeys) {
      deleteFilePromises.push(fileService.deleteFile({ fileKey }));
    }

    const data = await Promise.all(deleteFilePromises);

    return apiResponse({
      res,
      statusCode: StatusCodes.OK,
      message: "File deleted successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    return apiResponse({
      res,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
};

const updateFile = async (req, res) => {
  try {
    const { url } = req.body;
    const { file } = req;

    const data = await fileService.updateFile({
      url: url,
      mimetype: file.mimetype,
      buffer: file.buffer,
    });

    return apiResponse({
      res,
      statusCode: StatusCodes.OK,
      message: "File deleted successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    return apiResponse({
      res,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
};

export default {
  uploadFile,
  deleteFile,
  updateFile,
};
