const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60;
// const BuyerModels=require("../models")
// const Seller = require("../models/Buyer copy");
const Buyer = require("../models/Buyer");
const seller = require("../models/Seller");
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
module.exports.signup_post = (req, res) => {

  const { firstName, lastName, email, password, passwordConfirm, company } =
    req.body;

  if (!req.body.isSeller) {
    const { firstName, lastName, email, password, passwordConfirm } = req.body;
  } else {
    console.log("first1");
    const { firstName, lastName, email, password, passwordConfirm, company } =
      req.body;
  }
  res.send("signup post");
};
module.exports.signup_get = (req, res) => {
  res.render("signup get");
};
module.exports.logout_get = (req, res) => {
  console.log("log out");
  res.cookie("jwt", "", { maxAge: 1 });
  res.send("logout");
};
function generateAccessToken(useremail) {
  return jwt.sign({ useremail: useremail }, process.env.TOKEN_SECRET, {
    expiresIn: "1h",
  });
}
