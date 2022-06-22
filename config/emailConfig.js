require("dotenv").config();
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: process.env.EMAil_HOST,
  port: process.env.EMAil_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // generated ethereal user
    pass: process.env.EMAIL_PASS, // generated ethereal password
  },
});
module.exports = transporter;
// var transporter = nodemailer.createTransport(ccc);
