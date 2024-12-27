const jwt = require("jsonwebtoken");
const { ENV } = require("../config/environment.js");

function generateToken(payload = {}, expiresIn = "7d") {
  return jwt.sign(payload, ENV.ACCESS_TOKEN_SECRET, { expiresIn });
}

module.exports = { generateToken };
