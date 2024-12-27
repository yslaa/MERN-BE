const express = require("express");
const { addMiddlewares } = require("./src/middlewares/middleware.js");
const { addRoutes } = require("./src/routes/index.js");
const { addErrorHandler } = require("./src/utils/errorHandler.js");
const { connectDB } = require("./src/config/connectDB.js");
const { ENV } = require("./src/config/environment.js");

const app = express();

function run() {
  addMiddlewares(app);
  addRoutes(app);
  addErrorHandler(app);

  connectDB(ENV.DATABASE_URI).then(() => {
    console.log(`Host Database connected to ${ENV.DATABASE_URI}`);
    app.listen(ENV.PORT, () => {
      console.log(`Server is running on port ${ENV.PORT}`);
    });
  });
}

run();
