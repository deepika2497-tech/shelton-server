import ThemeModel from "./models/themeSchema.js";
import UserModel from "../user/model.js";
import { StatusCodes } from "http-status-codes";
import { apiResponse } from "../../helper/apiResponse.js";
import AboutUs from "./models/aboutUsSchema.js";

const getTheme = async (req, res) => {
    try {
        const theme = await ThemeModel.find();
        res.json(theme);
    } catch (error) {
        res.status(500).send(error);
    }
};

const logout = (req, res) => {
    try {
        req.headers.authorization = null;
        return apiResponse({
            res,
            statusCode: StatusCodes.OK,
            message: "Logged out successfully",
            status: true,
          });
    } catch (error) {
        console.error(error);
        return apiResponse({
            res,
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            status: false,
            message: "Internal server error",
         });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedUser = await UserModel.findByIdAndUpdate(id, updatedData, { new: true });
        return apiResponse({
            res,
            statusCode: StatusCodes.OK,
            message: "Profile updated successfully",
            status: true,
            data: updatedUser,
        });
    } catch (error) {
        console.error(error);
        return apiResponse({
            res,
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            status: false,
            message: "Internal server error",
        });
    }
};

const getAboutUs = async (req, res) => {
    try {
        const aboutUsInfo = await AboutUs.find();
        return apiResponse({
            res,
            statusCode: StatusCodes.OK,
            message: "About us fetched successfully",
            status: true,
            data: aboutUsInfo[0]?.content,
        });
    } catch (error) {
        console.error(error);
        return apiResponse({
            res,
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            status: false,
            message: "Internal server error",
        });
    }
}


export default {
    getTheme,
    logout,
    updateProfile,
    getAboutUs,
};
