import Joi from "joi";
import dotenv from "dotenv";
import enums from "./enum.js";
import { parseJoiError } from "../helper/apiResponse.js";

const nodeEnv = process.env.NODE_ENV;

dotenv.config({
  path: nodeEnv === enums.nodeEnvEnums.DEVELOPMENT ? ".env.dev" : ".env",
});

console.log(nodeEnv === enums.nodeEnvEnums.DEVELOPMENT ? ".env.dev" : ".env");

const envVarsSchema = Joi.object({
  PORT: Joi.number(),
  MONGODB_URL: Joi.string().trim().description("Mongodb url"),
  CLIENT_URL: Joi.string().trim().description("Client url"),
  BASE_URL: Joi.string().trim().description("Base URL"),
  FRONTEND_URL: Joi.string().trim().optional().description("Frontend URL"),
  SERVER_URL: Joi.string().trim().description("Server url"),
  JWT_SECRET_KEY: Joi.string().description("Jwt secret key"),

  SMTP_HOST: Joi.string().description("server that will send the emails"),
  SMTP_PORT: Joi.number().description("port to connect to the email server"),
  SMTP_USERNAME: Joi.string().description("username for email server"),
  SMTP_PASSWORD: Joi.string().description("password for email server"),
  EMAIL_FROM: Joi.string().description(
    "the from field in the emails sent by the app"
  ),

  GOOGLE_CLIENT_ID: Joi.string().description("google client id"),
  GOOGLE_CLIENT_SECRET: Joi.string().description("google client secret"),
  GOOGLE_REDIRECT_URL: Joi.string().description("google redirect url"),

  DIGITAL_OCEAN_DIRNAME: Joi.string().description("digitalOcean folder name"),
  DIGITAL_OCEAN_SPACES_ACCESS_KEY: Joi.string().description(
    "digital ocean spaces access key"
  ),
  DIGITAL_OCEAN_SPACES_SECRET_KEY: Joi.string().description(
    "digital ocean spaces secret key"
  ),
  DIGITAL_OCEAN_SPACES_REGION: Joi.string().description(
    "digital ocean spaces region"
  ),
  DIGITAL_OCEAN_SPACES_BASE_URL: Joi.string().description(
    "digital ocean spaces base url"
  ),
  DIGITAL_OCEAN_BUCKET_NAME: Joi.string().description(
    "digital ocean spaces bucket name"
  ),
  DIGITAL_OCEAN_ENDPOINT: Joi.string().description(
    "digital ocean spaces bucket name"
  ),

  SOFASCORE_FREE_API_URL: Joi.string().description("sofascore free api url"),
  SOFASCORE_PAID_API_URL: Joi.string().description("sofascore paid api url"),
  SOFASCORE_API_MODE: Joi.string().allow("free", "paid"),
  SOFASCORE_API_KEY: Joi.string(),
})
  .unknown()
  .prefs({ errors: { label: "key" } });

const { value: envVars, error } = envVarsSchema.validate(process.env, {
  abortEarly: false,
});

if (error) {
  const parsedError = parseJoiError(error);
  console.log("Config Error: ", parsedError);
}

export default {
  port: envVars.PORT,
  nodeEnv: nodeEnv,
  mongodb: {
    url: envVars.MONGODB_URL,
    options: {},
  },
  base_url: envVars.BASE_URL,
  frontendUrl: envVars.FRONTEND_URL,
  server_url: envVars.SERVER_URL,
  client_url: envVars.CLIENT_URL,
  jwt: {
    secretKey: envVars.JWT_SECRET_KEY,
    expiresIn: envVars.JWT_TOKEN_EXPIRES_IN,
  },
  otpExpiryDurationSeconds: envVars.OTP_EXPIRY_DURATION_SECONDS,
  google: {
    clientId: envVars.GOOGLE_CLIENT_ID,
    clientSecret: envVars.GOOGLE_CLIENT_SECRET,
    redirectUrl: envVars.GOOGLE_REDIRECT_URL,
  },
  cloud: {
    digitalocean: {
      rootDirname: envVars.DIGITAL_OCEAN_DIRNAME,
      region: envVars.DIGITAL_OCEAN_SPACES_REGION,
      baseUrl: envVars.DIGITAL_OCEAN_SPACES_BASE_URL,
      bucketName: envVars.DIGITAL_OCEAN_BUCKET_NAME,
      endpoint: envVars.DIGITAL_OCEAN_ENDPOINT,
      credentials: {
        accessKeyId: envVars.DIGITAL_OCEAN_SPACES_ACCESS_KEY,
        secretAccessKey: envVars.DIGITAL_OCEAN_SPACES_SECRET_KEY,
      },
    },
  },
  nodemailer: {
    host: envVars.SMTP_HOST,
    port: envVars.SMTP_PORT,
    auth: {
      user: envVars.SMTP_USERNAME,
      pass: envVars.SMTP_PASSWORD,
    },
  },
  email: {
    from: envVars.EMAIL_FROM,
  },

  sofascore: {
    apiMode: envVars.SOFASCORE_API_MODE,
    freeUrl: envVars.SOFASCORE_FREE_API_URL,
    paidUrl: envVars.SOFASCORE_PAID_API_URL,
    apiKey: envVars.SOFASCORE_API_KEY,
  },
};
