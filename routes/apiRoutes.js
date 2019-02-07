var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.user,
    pass: process.env.pass
  }
});

module.exports = function(app) {
  app.post("/sendContactEmail", function(req, res) {
    // Get contact form data from ajax POST request
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var message = req.body.message;

    // Create a mail with the above data
    var mailOptions = {
      from: "cppan0@gmail.com",
      to: "cppan0@gmail.com",
      subject: `${name} has contacted you via your portfolio's contact form!`,
      text: `
        name: ${name} \n
        email: ${email} \n
        phone: ${phone} \n
        \n ${message}
      `
    };

    // Send email with modemailer
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
        // respond with error code
        res.sendStatus(503);
      } else {
        console.log("Email sent: " + info.response);
        // respond with success code
        res.sendStatus(200);
      }
    });
  });
};
