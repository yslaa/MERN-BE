const createError = require("http-errors");
const { getToken, isTokenBlacklisted } = require("../middlewares/blacklist.js");
const { extractToken, verifyToken } = require("../middlewares/jwtHelper.js");
const { STATUSCODE } = require("../constants/index.js");

function verifyJWT(req, res, next) {
  const token = extractToken(req.headers.authorization);

  !token
    ? next(createError(STATUSCODE.UNAUTHORIZED, "Access denied"))
    : getToken() !== token
      ? next(createError(STATUSCODE.UNAUTHORIZED, "Invalid token"))
      : isTokenBlacklisted()
        ? next(createError(STATUSCODE.UNAUTHORIZED, "Token is Expired"))
        : (() => {
            req.user = verifyToken(token);
            next();
          })();
}

function authorizeRoles(...allowedRoles) {
  return function (req, res, next) {
    return allowedRoles.length === STATUSCODE.ZERO ||
      !req.user.role ||
      allowedRoles.includes(req.user.role)
      ? next()
      : next(
          createError(
            STATUSCODE.UNAUTHORIZED,
            `Roles ${req.user.role} are not allowed to access this resource`,
          ),
        );
  };
}

module.exports = { verifyJWT, authorizeRoles };
