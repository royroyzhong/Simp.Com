const jwt = require("jsonwebtoken");
const maxAge = 60 * 60 * 1000;
const Buyer = require("../models/Buyer");
const Seller = require("../models/Seller");
const mongoose = require("mongoose");
const auth = require("../middleware/authJwt");

module.exports.login_post = async (req, res) => {
  const { userEmail, password } = req.body;
  let user;
  try {
    if (req.body.isSeller) {
      user = await Seller.login(userEmail, password);
    } else {
      user = await Buyer.login(userEmail, password);
    }
    let token;
    if (req.body.isRemember) {
      token = auth.generateAccessTokenWithRememberMe(
        userEmail,
        req.body.isSeller
      );
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 24 });
    } else {
      token = auth.generateAccessTokenWithoutRememberMe(
        userEmail,
        req.body.isSeller
      );
      res.cookie("jwt", token, { httpOnly: true, maxAge: (maxAge * 5) / 60 });
    }
    return res.status(200).json({
      userID: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: req.body.isSeller,
      email: user.email,
    });
  } catch (err) {
    return res.status(400).json({ errors: err.message });
  }
};
module.exports.googlelogin_post = async (req, res) => {
  const { email, firstName, lastName } = res.locals.user;
  try {
    let emails = { email: email };
    let user = await Buyer.findOne(emails);
    if (!user) {
      let newUser = {
        firstName,
        lastName,
        email: email,
        password: 12341234,
        isSeller: false,
        onlineStatus: true,
      };
      user = await Buyer.create(newUser);
    } else {
      let online = { onlineStatus: true };
      user = await Buyer.findOneAndUpdate({ email }, online);
    }
    token = auth.generateAccessTokenWithRememberMe(email, false);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 24 });
    return res.status(200).json({
      userID: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: req.body.isSeller,
    });
  } catch (err) {
    return res.status(400).json({ errors: err.message });
  }
};

module.exports.login_get = async (req, res) => {
  let user;
  try {
    let email = res.locals.user.useremail;
    if (res.locals.user.role) {
      user = await Seller.findOne({ email });
    } else {
      user = await Buyer.findOne({ email });
    }
    let account = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      address: user.address,
      phone: user.phone,
    };
    return res.status(200).json(account);
  } catch (err) {
    return res.status(400).json({ errors: err.message });
  }
};

module.exports.signup_post = async (req, res) => {
  try {
    const { firstName, lastName, email, password, passwordConfirm, company } =
      req.body;
    if (password !== passwordConfirm) {
      return res.status(400).json({ errors: "password not match" });
    }
    if (req.errorsFromMid !== undefined) {
      return res.status(400).json({ errors: req.errorsFromMid });
    }

    let user;
    if (!req.body.isSeller) {
      const { firstName, lastName, email, password } = req.body;
      user = await Buyer.create({
        firstName,
        lastName,
        email,
        password,
        isSeller: req.body.isSeller,
        onlineStatus: true,
      });
    } else {
      const { firstName, lastName, email, password, company } = req.body;
      user = await Seller.create({
        firstName,
        lastName,
        email,
        password,
        company,
        isSeller: req.body.isSeller,
        onlineStatus: true,
      });
    }
    const token = auth.generateAccessTokenWithRememberMe(
      email,
      req.body.isSeller
    );
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 24 });
    res.status(201).json({ role: req.body.isSeller });
  } catch (err) {
    const errors = handleError(err);
    return res.status(400).json({ errors });
  }
};

module.exports.logout_get = async (req, res) => {
  try {
    let email = res.locals.user.useremail;
    let role = res.locals.user.role;
    let offline = { onlineStatus: false };
    if (role) {
      await Seller.findOneAndUpdate({ email }, offline);
    } else {
      await Buyer.findOneAndUpdate({ email }, offline);
    }
  } catch (err) {
    return res.status(400).json({ errors: err.message });
  }
  res.cookie("jwt", "", { maxAge: 1 });
  return res.redirect("/login");
};

const handleError = (err) => {
  if (err.code === 11000 && err.message.includes("email")) {
    return "email is already registered";
  }
  if (err.code === 11000 && err.message.includes("company")) {
    return "company is already registered";
  }
  if (err.message.includes("Please enter a valid email")) {
    return "Please enter a valid email";
  }
  if (err.message.includes("Please enter an email")) {
    return "Please enter an email";
  }
  if (err.message.includes("Please enter a company name")) {
    return "Please enter a company name";
  }
  if (err.message.includes("Please enter first name")) {
    return "Please enter first name";
  }
  if (err.message.includes("Please enter last name")) {
    return "Please enter last name";
  }
  if (err.message.includes("Please enter a password")) {
    return "Missing password, Please enter a password";
  }
  if (err.message.includes("shorter than the minimum allowed")) {
    return "shorter than the minimum allowed";
  }
  if (err.message.includes("incorrect email")) {
    return "incorrect email";
  }
  if (err.message.includes("incorrect password")) {
    return "incorrect password";
  }
};
