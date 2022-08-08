const Buyer = require("../models/Buyer");
const Seller = require("../models/Seller");

const checkDupUser = async (req, res, next) => {
  if (req.body.isSeller) {
    await Buyer.exists({ email: req.body.email }, function (err, doc) {
      if (doc !== null) {
        req.errorsFromMid = "email already in buyer";
      }
      next();
    });
  } else {
    await Seller.exists({ email: req.body.email }, function (err, doc) {
      if (doc !== null) {
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
