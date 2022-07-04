const Buyer = require("../models/Buyer");
const Seller = require("../models/Seller");

const checkDupUser = async (req, res, next) => {
  if (req.body.isSeller) {
    console.log("is Seller ");
    await Buyer.exists({ email: req.body.email }, function (err, doc) {
      console.log(doc);
      if (doc !== null) {
        console.log("found in buyer");
        // return res.status(400).json({ errors: "email already in buyer" });
        req.errorsFromMid = "email already in buyer";
        console.log(req.errors);
      }
      console.log("next");
      next();
    });
  } else {
    await Seller.exists({ email: req.body.email }, function (err, doc) {
      console.log("is Buyer ");
      console.log(doc);
      if (doc !== null) {
        console.log("found in seller");
        // return res.status(400).json({ µerrors: "email already in seller" });
        req.errorsFromMid = "email already in seller";
      }
      next();
    });
  }
};
const dupCheck = {
  checkDupUser: checkDupUser,
};
module.exports = dupCheck;
