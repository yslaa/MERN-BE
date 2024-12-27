const { generateToken } = require("../middlewares/generateToken.js");

function generateAccess(payload = {}) {
  const accessToken = generateToken(payload, "7d");
  return {
    access: accessToken,
  };
}

module.exports = { generateAccess };
