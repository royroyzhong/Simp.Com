const jwt = require("jsonwebtoken");
const maxAge = 24 * 60 * 60;
// const BuyerModels=require("../models")
// const Seller = require("../models/Buyer copy");
const Buyer = require("../models/Buyer");
const Seller = require("../models/Seller");
const dbo = require("../db/conn");
const mongoose = require("mongoose");

let User = [
  {
    name: "seller",
    email: "456@gmail.com",
    pwd: "123",
  },
  {
    name: "buyer",
    email: "123@gmail.com",
    pwd: "123",
  },
];
let users = {
  name: "seller",
  email: "123@gmail.com",
  pwd: "123123",
  userToken: "123123",
};

module.exports.login_post = (req, res) => {
  console.log(req.body.isSeller);
  const { userEmail, password } = req.body;
  // try {
  //   const user = await buyer/seller.login(useremail, password);
  //   res.status(200).json({ user: user._id });
  // } catch (err) {
  //   res.status(400).json({err});
  // }

  console.log({ userEmail, password });
  console.log(req.body);
  if (!req.body) {
    return res.status(400).send({ message: "400" });
  }
  //seller
  if (userEmail == User[0].email && password == User[0].pwd) {
    const token = generateAccessToken(userEmail);
    // res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    return res.json({ user: User[0], token: token });
  }
  //buyer
  if (userEmail == User[1].email && password == User[1].pwd) {
    const token = generateAccessToken(userEmail);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    return res.json({ user: User[1], token: token });
  }
  return res.status(404).send("email or password incorrect");
};
module.exports.login_get = (req, res) => {
  // const token = req.cookies.jwt;
  // console.log("token: " + token);
  res.send("login get");
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
    // const dbConnect = dbo.getDb();
    // await mongoose.connect(
    //   "mongodb+srv://doge-455:doge-123@sandbox.uqu5r.mongodb.net/?retryWrites=true&w=majority"
    // );

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
    const token = generateAccessToken(id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: id });
  } catch (err) {
    const errors = handleError(err);
    console.log(err.message);
    // console.log(err.code);
    res.status(400).json({ errors });
  }
};
module.exports.signup_get = (req, res) => {
  res.render("signup get");
};
module.exports.logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.send("logout");
};
function generateAccessToken(useremail) {
  return jwt.sign({ useremail: useremail }, process.env.TOKEN_SECRET, {
    expiresIn: "1h",
  });
}
const handleError = (err) => {
  if (err.code === 11000) {
    return "email is already registered";
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
};
