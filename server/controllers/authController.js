const jwt = require("jsonwebtoken");
const maxAge = 24 * 60 * 60;
const Buyer = require("../models/Buyer");
const Seller = require("../models/Seller");
const mongoose = require("mongoose");
module.exports.login_post = async (req, res) => {
  const { userEmail, password } = req.body;
  let user, token;
  try {
    if (req.body.isSeller) {
      user = await Seller.login(userEmail, password);
    } else {
      user = await Buyer.login(userEmail, password);
    }
    token = generateAccessToken(userEmail, req.body.isSeller);
    if (req.body.isRemember) {
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    } else {
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 2 });
    }
    res.status(200).json({
      userID: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: req.body.isSeller,
    });
  } catch (err) {
    res.status(400).json({ errors: err.message });
  }
};
module.exports.googlelogin_post = async (req, res) => {
  // let user, token;
  console.log(req.body.data);
  const { email, firstName, lastName } = req.body.data;
  try {
    let emails = { email: email };
    let user = await Buyer.findOne(emails);
    console.log(user);
    if (!user) {
      let newUser = {
        firstName,
        lastName,
        email: email,
        password: 12341234,
        isSeller: false,
      };
      console.log("newUser");
      console.log(newUser);
      user = await Buyer.create(newUser);
    }
    token = generateAccessToken(email, false);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({
      userID: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: req.body.isSeller,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ errors: err.message });
  }
};

module.exports.login_get = async (req, res) => {
  let user;
  try {
    let email = req.body.user.data.useremail;
    if (req.body.user.data.role) {
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
    res.status(200).json(account);
  } catch (err) {
    res.status(400).json({ errors: err.message });
  }
};

module.exports.signup_post = async (req, res) => {
  try {
    //init obj
    console.log("post sign up");
    console.log(req.errorsFromMid);
    const { firstName, lastName, email, password, passwordConfirm, company } =
      req.body;
    if (password !== passwordConfirm) {
      return res.status(400).json({ errors: "password not match" });
    }
    if (req.errorsFromMid !== undefined) {
      return res.status(400).json({ errors: req.errorsFromMid });
    }
    let id, user, role;

    if (!req.body.isSeller) {
      const { firstName, lastName, email, password } = req.body;

      buyer = await Buyer.create({
        firstName,
        lastName,
        email,
        password,
        isSeller: req.body.isSeller,
      });
      id = buyer._id;
    } else {
      console.log("first1");
      const { firstName, lastName, email, password, company } = req.body;
      seller = await Seller.create({
        firstName,
        lastName,
        email,
        password,
        company,
        isSeller: req.body.isSeller,
      });
      id = seller._id;
    }
    const token = generateAccessToken(email, req.body.isSeller);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({});
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json({ errors });
  }
};
module.exports.signup_get = (req, res) => {
  res.render("signup get");
};
module.exports.logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  return res.redirect("/login");
  // res.send("logout");
};
function generateAccessToken(useremail, role) {
  return jwt.sign(
    { data: { useremail: useremail, role: role } },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "1h",
    }
  );
}
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
