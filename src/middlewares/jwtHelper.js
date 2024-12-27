const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const { ENV } = require("../config/environment.js");
const { STATUSCODE } = require("../constants/index.js");

function extractToken(authorizationHeader) {
  const token = authorizationHeader.split(" ")[STATUSCODE.ONE];

  if (!token)
    throw createError(STATUSCODE.UNAUTHORIZED, "Access token is missing");

  return token;
}

function verifyToken(token) {
  const verifiedToken = jwt.verify(token, ENV.ACCESS_TOKEN_SECRET);

  return verifiedToken;
}

module.exports = { extractToken, verifyToken };
