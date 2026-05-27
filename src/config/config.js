import dotenv from "dotenv";

const environment = process.env.NODE_ENV || "DEVELOPMENT";

dotenv.config({ path: environment === "DEVELOPMENT" ? "./.env.development" : "./.env.production" });

export default {
  MONGO_URL: process.env.MONGO_URL,
  PORT: process.env.PORT || 8080,
  BASE_URL: process.env.BASE_URL,
  SESSION_SECRET: process.env.SESSION_SECRET || "secretkey",
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  MAILING_EMAIL: process.env.MAILING_EMAIL,
  MAILING_PASSWORD: process.env.MAILING_PASSWORD,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
  STRIPE_BASE_URL: process.env.STRIPE_BASE_URL,
  TEST_MODE: process.env.TEST_MODE === "true",
};
