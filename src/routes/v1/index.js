const userRoutes = require("./users/route.js");
const productRoutes = require("./products/route.js");
const inventoryRoutes = require("./inventories/route.js");
const transactionRoutes = require("./transactions/route.js");
const { RESOURCE } = require("../../constants/index.js");

const routes = [
  {
    url: RESOURCE.USERS,
    route: userRoutes,
  },
  {
    url: RESOURCE.PRODUCTS,
    route: productRoutes,
  },
  {
    url: RESOURCE.INVENTORIES,
    route: inventoryRoutes,
  },
  {
    url: RESOURCE.TRANSACTIONS,
    route: transactionRoutes,
  },
];

const V1 = routes.map((route) => ({
  url: `${RESOURCE.V1}${route.url}`,
  route: route.route,
}));

module.exports = { V1 };
