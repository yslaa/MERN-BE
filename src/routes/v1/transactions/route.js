const { Router } = require("express");
const transactionController = require("./controller.js");
const { METHOD, PATH, ROLE } = require("../../../constants/index.js");
const {
  verifyJWT,
  authorizeRoles,
} = require("../../../middlewares/verifyToken.js");

const router = Router();

const transactionRoutes = [
  {
    method: METHOD.GET,
    roles: [ROLE.ADMIN, ROLE.CUSTOMER],
    middleware: [verifyJWT],
    handler: transactionController.getAllTransaction,
  },
  {
    method: METHOD.GET,
    path: PATH.DELETED,
    roles: [ROLE.ADMIN],
    middleware: [verifyJWT],
    handler: transactionController.getAllTransactionDeleted,
  },
  {
    method: METHOD.GET,
    path: PATH.ID,
    roles: [ROLE.ADMIN, ROLE.CUSTOMER],
    middleware: [verifyJWT],
    handler: transactionController.getSingleTransaction,
  },
  {
    method: METHOD.POST,
    roles: [ROLE.CUSTOMER],
    middleware: [verifyJWT],
    handler: transactionController.createNewTransaction,
  },
  {
    method: METHOD.PATCH,
    path: PATH.EDIT,
    roles: [ROLE.ADMIN],
    middleware: [verifyJWT],
    handler: transactionController.updateTransaction,
  },
  {
    method: METHOD.DELETE,
    path: PATH.DELETE,
    roles: [ROLE.ADMIN],
    middleware: [verifyJWT],
    handler: transactionController.deleteTransaction,
  },
  {
    method: METHOD.PUT,
    path: PATH.RESTORE,
    roles: [ROLE.ADMIN],
    middleware: [verifyJWT],
    handler: transactionController.restoreTransaction,
  },
  {
    method: METHOD.DELETE,
    path: PATH.FORCE_DELETE,
    roles: [ROLE.ADMIN],
    middleware: [verifyJWT],
    handler: transactionController.forceDeleteTransaction,
  },
];

transactionRoutes.forEach((route) => {
  const { method, path = "", roles = [], middleware = [], handler } = route;
  router[method](path, middleware.concat(authorizeRoles(...roles)), handler);
});

module.exports = router;
