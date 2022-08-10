const nodemailer = require("nodemailer");
var express = require("express");
const Product = require("../models/Product");
var router = express.Router();

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "simplecommercedoge@gmail.com",
    pass: "mkppjktxfuxzlyph", // APP Password

    // pass: 'simplecom01doge' // Login Password
  },
});

function reformatProductName(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

router.post("/", function (req, res) {
  const productId = req.query["id"];

  Product.findById(productId, function (err, result) {
    if (err) {
      res.status(404).send(err);
    } else {
      if (result.storage === 0) {
        result.wishlistUsers.forEach(function (currTo) {
          var mailOptions = {
            from: "simplecommercedoge@gmail.com",
            to: currTo,
            subject: "Something you want has been stocked",
            text:
              reformatProductName(result.name) +
              " is ready to be purchased! Don't miss out! ",
          };
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              return res.status(400).send(error);
            }
          });
        });
      }
      return res.json(null);
    }
  });
});

module.exports = router;
