const dotenv = require("dotenv");
const { RESOURCE } = require("../constants/index.js");

dotenv.config({
  path: "./src/config/.env",
});

const ENV = {
  NODE_ENV: process.env.NODE_ENV || RESOURCE.DEVELOPMENT,
  PORT: process.env.PORT || 4000,
  DATABASE_URI:
    process.env.DATABASE_URI ||
    "mongodb://localhost:27017/YOUR_DATABASE_NAME?directConnection=true",
  SALT_NUMBER: Number(process.env.SALT_NUMBER) || 12,
  ACCESS_TOKEN_SECRET:
    process.env.ACCESS_TOKEN_SECRET || "your_access_token_secret",
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "your_cloud_name",
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "your_api_key",
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "your_api_secret",
  EMAIL: process.env.EMAIL || "your_email",
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || "your_email_password",
  PAYMAYA_SANDBOX_PUBLIC_KEY:
    process.env.PAYMAYA_SANDBOX_PUBLIC_KEY || "your_paymaya_sandbox_public_key",
  PAYMAYA_SANDBOX_SECRET_KEY:
    process.env.PAYMAYA_SANDBOX_SECRET_KEY || "your_paymaya_sandbox_secret_key",
  PAYMAYA_SANDBOX_SERVER:
    process.env.PAYMAYA_SANDBOX_SERVER || "your_paymaya_sandbox_server",
  CURRENCY: process.env.CURRENCY || "PHP",
};

module.exports = { ENV };
