const { Router } = require("express");
const inventoryController = require("./controller.js");
const { METHOD, PATH, ROLE } = require("../../../constants/index.js");
const {
  verifyJWT,
  authorizeRoles,
} = require("../../../middlewares/verifyToken.js");

const router = Router();

const inventoryRoutes = [
  {
    method: METHOD.GET,
    roles: [ROLE.ADMIN],
    middleware: [verifyJWT],
    handler: inventoryController.getAllInventory,
  },
  {
    method: METHOD.GET,
    path: PATH.DELETED,
    roles: [ROLE.ADMIN],
    middleware: [verifyJWT],
    handler: inventoryController.getAllInventoryDeleted,
  },
  {
    method: METHOD.GET,
    path: PATH.ID,
    roles: [ROLE.ADMIN],
    middleware: [verifyJWT],
    handler: inventoryController.getSingleInventory,
  },
  {
    method: METHOD.POST,
    roles: [ROLE.ADMIN],
    middleware: [verifyJWT],
    handler: inventoryController.createNewInventory,
  },
  {
    method: METHOD.PATCH,
    path: PATH.EDIT,
    roles: [ROLE.ADMIN],
    middleware: [verifyJWT],
    handler: inventoryController.updateInventory,
  },
  {
    method: METHOD.DELETE,
    path: PATH.DELETE,
    roles: [ROLE.ADMIN],
    middleware: [verifyJWT],
    handler: inventoryController.deleteInventory,
  },
  {
    method: METHOD.PUT,
    path: PATH.RESTORE,
    roles: [ROLE.ADMIN],
    middleware: [verifyJWT],
    handler: inventoryController.restoreInventory,
  },
  {
    method: METHOD.DELETE,
    path: PATH.FORCE_DELETE,
    roles: [ROLE.ADMIN],
    middleware: [verifyJWT],
    handler: inventoryController.forceDeleteInventory,
  },
];

inventoryRoutes.forEach((route) => {
  const { method, path = "", roles = [], middleware = [], handler } = route;
  router[method](path, middleware.concat(authorizeRoles(...roles)), handler);
});

module.exports = router;
