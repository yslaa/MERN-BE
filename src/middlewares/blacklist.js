let jwtToken = "";
let blacklistedToken = "";

function setToken(token) {
  jwtToken = token;
}

function getToken() {
  return jwtToken || null;
}

function blacklistToken() {
  blacklistedToken = jwtToken;
}

function isTokenBlacklisted() {
  return jwtToken === blacklistedToken;
}

module.exports = {
  setToken,
  getToken,
  blacklistToken,
  isTokenBlacklisted,
};
