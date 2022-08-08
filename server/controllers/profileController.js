const Buyer = require("../models/Buyer");
const Seller = require("../models/Seller");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
module.exports.updateProfile_put = async (req, res) => {
  const { userFirstName, userLastName, userEmail, userAddress, userPhone } =
    req.body;
  let user;
  try {
    let update = {
      firstName: userFirstName,
      lastName: userLastName,
      address: userAddress,
      phone: userPhone,
    };
    let email = { email: userEmail };
    user = await Buyer.findOneAndUpdate(email, update, { new: true });
    return res.status(200).json({});
  } catch (err) {
    return res.status(400).json({ errors: err.message });
  }
};
module.exports.updatePassword_put = async (req, res) => {
  const { password, newPassword, email } = req.body;
  let user;
  try {
    user = await Buyer.login(email, password);
    const salt = await bcrypt.genSalt();
    let cryptPassword = await bcrypt.hash(newPassword, salt);
    let update = {
      password: cryptPassword,
    };
    let emails = { email: email };
    user = await Buyer.findOneAndUpdate(emails, update, { new: true });
    return res.status(200).json({});
  } catch (err) {
    return res.status(400).json({ errors: err.message });
  }
};

module.exports.getAllSeller_get = async (req, res) => {
  try {
    const user = await Seller.find({});
    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({ errors: err.message });
  }
};
