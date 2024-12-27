const { allowedOrigins } = require("../config/allowedOrigins.js");
const { STATUSCODE } = require("../constants/index.js");
const createError = require("http-errors");

const corsOptions = {
  origin: (origin, callback) =>
    !origin || allowedOrigins.indexOf(origin) !== STATUSCODE.NEGATIVE_ONE
      ? callback(null, true)
      : callback(
          createError(STATUSCODE.FORBIDDEN, "Not allowed by CORS"),
          false,
        ),
  credentials: true,
  exposedHeaders: ["Access-Control-Allow-Origin"],
};

module.exports = { corsOptions };
