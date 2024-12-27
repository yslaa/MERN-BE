const createError = require("http-errors");
const { STATUSCODE, RESOURCE } = require("../constants/index.js");
const { ENV } = require("../config/environment.js");

const notFound = (req, res, next) => {
  next(createError(STATUSCODE.NOT_FOUND, RESOURCE.NOT_FOUND));
};

const errorHandler = (error, req, res, next) => {
  let statusCode = error.status || STATUSCODE.INTERNAL_SERVER_ERROR;
  let errorMessage = error.message;

  if (error.name === RESOURCE.VALIDATION_ERROR)
    statusCode = STATUSCODE.BAD_REQUEST;
  errorMessage = error.message;

  res.status(statusCode).json({
    status: false,
    message: errorMessage,
    timestamp: new Date().toISOString(),
    url: req.originalUrl,
    stack: ENV.NODE_ENV === RESOURCE.PRODUCTION ? undefined : error.stack,
  });
};

const addErrorHandler = (app) => {
  app.use(notFound);
  app.use(errorHandler);
};

module.exports = { addErrorHandler };
