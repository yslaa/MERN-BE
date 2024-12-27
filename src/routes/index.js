const { V1 } = require("./v1/index.js");
const { RESOURCE } = require("../constants/index.js");

const routes = [...V1];

const addRoutes = (app) => {
  routes.forEach((route) => {
    app.use(`${RESOURCE.API}${route.url}`, route.route);
  });
};

module.exports = { addRoutes };
