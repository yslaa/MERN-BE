const { Router } = require("express");
const productController = require("./controller.js");
const { METHOD, PATH, ROLE } = require("../../../constants/index.js");
const {
  verifyJWT,
  authorizeRoles,
} = require("../../../middlewares/verifyToken.js");

const router = Router();

const productRoutes = [
  {
    method: METHOD.GET,
    roles: [ROLE.ADMIN, ROLE.CUSTOMER],
    middleware: [verifyJWT],
    handler: productController.getAllProduct,
  },
  {
    method: METHOD.GET,
    path: PATH.DELETED,
    roles: [ROLE.ADMIN],
    middleware: [verifyJWT],
    handler: productController.getAllProductDeleted,
  },
  {
    method: METHOD.GET,
    path: PATH.ID,
    roles: [ROLE.ADMIN, ROLE.CUSTOMER],
    middleware: [verifyJWT],
    handler: productController.getSingleProduct,
  },
  {
    method: METHOD.POST,
    roles: [ROLE.ADMIN],
    middleware: [verifyJWT],
    handler: productController.createNewProduct,
  },
  {
    method: METHOD.PATCH,
    path: PATH.EDIT,
    roles: [ROLE.ADMIN],
    middleware: [verifyJWT],
    handler: productController.updateProduct,
  },
  {
    method: METHOD.DELETE,
    path: PATH.DELETE,
    roles: [ROLE.ADMIN],
    middleware: [verifyJWT],
    handler: productController.deleteProduct,
  },
  {
    method: METHOD.PUT,
    path: PATH.RESTORE,
    roles: [ROLE.ADMIN],
    middleware: [verifyJWT],
    handler: productController.restoreProduct,
  },
  {
    method: METHOD.DELETE,
    path: PATH.FORCE_DELETE,
    roles: [ROLE.ADMIN],
    middleware: [verifyJWT],
    handler: productController.forceDeleteProduct,
  },
];

productRoutes.forEach((route) => {
  const { method, path = "", roles = [], middleware = [], handler } = route;
  router[method](path, middleware.concat(authorizeRoles(...roles)), handler);
});

module.exports = router;
