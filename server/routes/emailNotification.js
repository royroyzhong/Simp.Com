const nodemailer = require("nodemailer");
var express = require("express");
var router = express.Router();

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "simplecommercedoge@gmail.com",
        pass:"mkppjktxfuxzlyph" // APP Password

        // pass: 'simplecom01doge' // Login Password
    }
})

function reformatProductName(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

router.post('/', function (req, res, next) {
    const name = req.query['name']

    var mailOptions = {
        from: 'simplecommercedoge@gmail.com',
        to: 'isabellayang@outlook.com',
        subject: 'Something you want has been stocked',
        text: reformatProductName(name) + " is ready to be purchased! Don't miss out! "
    };
    
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return res.status(400).send(error);
        } else {
            return res.json(req.body);
        }
    });
})

module.exports = router;
