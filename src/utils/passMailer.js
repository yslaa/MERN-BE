const { transporter } = require("../config/mail.js");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
const { ENV } = require("../config/environment.js");

const mail = path.join(__dirname, "../views/reset.html");
const content = fs.readFileSync(mail, "utf8");

const template = handlebars.compile(content);

function sendEmail(email, randomCode) {
  const replacement = {
    randomCode: randomCode,
  };

  const index = template(replacement);

  return transporter.sendMail({
    from: ENV.EMAIL,
    to: `${email}`,
    subject: "Reset Account Password",
    html: index,
  });
}

module.exports = { sendEmail };
