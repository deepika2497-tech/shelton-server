import Joi from "joi";

const verifyToken = {
  body: Joi.object({
    token: Joi.string().required(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

const verifyOTP = {
  body: Joi.object().keys({
    otp: Joi.number().integer().required(),
    email: Joi.string().email().optional(),
    mobileNumber: Joi.number().integer().optional(),
  }),
};
const resendOTP = {
  body: Joi.object().keys({
    email: Joi.string().email().optional(),
    mobileNumber: Joi.number().integer().optional(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().lowercase().required(),
  }),
};

const changePassword = {
  body: Joi.object().keys({
    oldPassword: Joi.string().label("Old password").required(),
    newPassword: Joi.string().label("New password").required(),
    confirmNewPassword: Joi.string().valid(Joi.ref("newPassword")).required(),
  }),
};
const resetPassword = {
  body: Joi.object().keys({
    password: Joi.string().required().label("password"),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  }),
};

const signinWithGoogle = {
  body: Joi.object().keys({
    idToken: Joi.string().required().label("Id token"),
  }),
};

export default {
  verifyToken,
  resendOTP,
  login,
  verifyOTP,
  forgotPassword,
  changePassword,
  resetPassword,
  signinWithGoogle,
};
