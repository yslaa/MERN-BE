const mongoose = require("mongoose");
const { STATUSCODE } = require("../constants/index.js");
const { ENV } = require("../config/environment.js");

async function connectDB() {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(ENV.DATABASE_URI);
  } catch (error) {
    console.error(error);
    process.exit(STATUSCODE.ONE);
  }
}

module.exports = { connectDB };
