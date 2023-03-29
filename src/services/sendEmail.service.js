const nodemailer = require("nodemailer");

function sendEmail(options) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
	pass: process.env.EMAIL_PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.EMAIL,
      ...options
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if(err) {
        reject({message: `An error has ocurred ${err}`});
      }
      resolve({message: "Email sent successfully"});
    });
  });
}

module.exports = sendEmail;
