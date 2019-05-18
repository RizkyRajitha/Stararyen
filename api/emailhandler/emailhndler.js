var nodemailer = require("nodemailer");
//const config = require("../config/keys");
var jwt= require('jsonwebtoken')

const passwordResetApi = "http://localhost:3000/resetpassword";
const emailConfirmApi = "http://localhost:3000/confirmemail";

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kithminiatdev@gmail.com",
    pass:   process.env.emailcred//config.config.mailapppass
  }
});

//console.log(config.jwtexp)

exports.mailhandlerpasswordreset = (email, id,firstname,lastname) => {

  try {
    var token = jwt.sign({"id":id},'authdemo', { expiresIn: "10m" })
  } catch (error) {
    console.log(error)
  }

  var mailOptions = {
    from: "kithminiatdev@gmail.com",
    to: email,
    subject: "password reset",
    text: "visit - ",
    html: `<h2>  hello ${firstname} ${lastname}  <br>  </h2><h1> please visit -${passwordResetApi}/${token}  to reset your password </h1>`
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("send email - " + email);
      console.log("Email sent: " + info.response);
    }
  });
};

exports.mailhandleremailconfirm = (email, id,firstname,lastname) => {

  try {
    var token = jwt.sign({"id":id},'authdemo', { expiresIn: "10m" })
  } catch (error) {
    console.log(error)
  }

  console.log("sending confirm email ............");
  var mailOptions = {
    from: "kithminiatdev@gmail.com",
    to: email,
    subject: "email confirmation",
    text: "visit - ",
    html: `<h2>  hello ${firstname} ${lastname}  <br>  </h2><h1> please visit -${emailConfirmApi}/${token}  to confirm your email </h1>`
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("send email - " + email);
      console.log("Email sent: " + info.response);
    }
  });
};

//module.exports = {mailhandlerpasswordreset,mailhandleremailconfirm};
