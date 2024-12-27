const { createTransport } = require("nodemailer");
const { ENV } = require("../config/environment.js");
const { RESOURCE } = require("../constants/index.js");

const transporter = createTransport({
  service: RESOURCE.GMAIL,
  auth: {
    user: ENV.EMAIL,
    pass: ENV.EMAIL_PASSWORD,
  },
});

module.exports = { transporter };
