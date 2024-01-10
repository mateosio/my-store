const nodemailer = require("nodemailer");
const {config} = require("./api/config/config");


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "siomateo8@gmail.com",
    pass: config.emailPassword,
  },
  tls: {
    rejectUnauthorized: false
  }
});

// async..await is not allowed in global scope, must use a wrapper
async function sendMail() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'siomateo8@gmail.com', // sender address
    to: "siomateo8@gmail.com", // list of receivers
    subject: "Correo enviado desde node", // Subject line
    text: "Hola Mate", // plain text body
    html: "<b>Hola Mate</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
}

sendMail();
