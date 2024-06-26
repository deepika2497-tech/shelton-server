import upload from "../../config/multer.config.js";
import validate from "../../middleware/validate.js";
import { verifyToken } from "../../middleware/verifyToken.js";
import authController from "./controller.js";
import authValidation from "./validation.js";
import express from "express";

const route = express.Router();

// ----------------
// POST Methods
// ----------------

// verify token
route.post(
  "/verify/token",
  upload.none(),
  verifyToken,
  authController.verifyToken
);

// register
route.post(
  "/register/email",
  upload.none(),
  validate(authValidation.registerByEmail),
  authController.registerByEmail
);

route.post(
  "/register/mobile",
  upload.none(),
  validate(authValidation.registerByMobile),
  authController.registerByMobile
);

// login
route.post(
  "/login/email",
  upload.none(),
  validate(authValidation.loginByEmail),
  authController.loginByEmail
);
route.post(
  "/login/mobile",
  upload.none(),
  validate(authValidation.loginByMobile),
  authController.loginByMobile
);

route.post(
  "/login/google",
  upload.none(),
  validate(authValidation.loginByGoogle),
  authController.loginByGoogle
);

// forgot password
route.post(
  "/forgot-password/email",
  upload.none(),
  validate(authValidation.forgotPasswordEmail),
  authController.forgotPasswordEmail
);
route.post(
  "/forgot-password/mobile",
  upload.none(),
  validate(authValidation.forgotPasswordMobile),
  authController.forgotPasswordMobile
);

// OTP Verification
route.post(
  "/verify/email/otp",
  upload.none(),
  validate(authValidation.verifyEmailOTP),
  authController.verifyEmailOTP
);
route.post(
  "/verify/mobile/otp",
  upload.none(),
  validate(authValidation.verifyMobileOTP),
  authController.verifyMobileOTP
);

// resend otp verification
route.post(
  "/resend/otp/email",
  upload.none(),
  validate(authValidation.resendEmailOTP),
  authController.resendEmailOTP
);
route.post(
  "/resend/otp/mobile",
  upload.none(),
  validate(authValidation.resendMobileOTP),
  authController.resendMobileOTP
);

// ----------------
// PATCH Methods
// ----------------

// change password
route.post(
  "/change-password",
  upload.none(),
  verifyToken,
  validate(authValidation.changePassword),
  authController.changePassword
);

// reset password
route.post(
  "/reset-password",
  upload.none(),
  verifyToken,
  validate(authValidation.resetPassword),
  authController.resetPassword
);

export default route;
