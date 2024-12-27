const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("morgan");
const compression = require("compression");
const { corsOptions } = require("../config/corsOptions.js");
const { RESOURCE } = require("../constants/index.js");
const { transaction } = require("./transaction.js");

const middlewares = [
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false }),
  cors(corsOptions),
  logger(RESOURCE.DEV),
  compression(),
  transaction,
];

const addMiddlewares = (app) => {
  middlewares.forEach((middleware) => {
    app.use(middleware);
  });
};

module.exports = { addMiddlewares };
