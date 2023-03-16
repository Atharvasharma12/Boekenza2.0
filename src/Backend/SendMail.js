const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function sendmail(data) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  console.log("mail send");
  console.log(data.email, data.otp);

  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "bo.marvin9@ethereal.email",
      pass: "4352sGMJpGcdusAvH8",
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "<bo.marvin9@ethereal.email>", // sender address
    to: `${data.email}`, // list of receivers
    subject: "Registration verification", // Subject line
    text: `otp for verification is ${data.otp}`, // plain text body
    // html: "<b> otp for verification is {otp} </b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

sendmail().catch(console.error);

module.exports = sendmail;
