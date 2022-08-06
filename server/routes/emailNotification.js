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

var mailOptions = {
    from: 'simplecommercedoge@gmail.com',
    to: 'isabellayang@outlook.com',
    subject: 'Something you want has been stocked',
    text: "Banana is ready to be purchased! Don't miss out! "
};


router.post('/', function (req, res, next) {
    console.log(req.body);
    transporter.sendMail(mailOptions, function (error, info) {
        console.log("before")
        if (error) {
            console.log(error);
            return res.status(400).send(error);
        } else {
            return res.json(req.body);
        }
    });
})

module.exports = router;
