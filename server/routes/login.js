var express = require("express");
const jwt = require("jsonwebtoken");
var router = express.Router();
var crypto = require("crypto");
const dotenv = require("dotenv");
const auth = require("../middleware/authJwt");
dotenv.config();
// const token = crypto.randomBytes(48).toString("base64url");
const User = [
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
const users = {
  name: "seller",
  email: "123@gmail.com",
  pwd: "123123",
  userToken: "123123",
};
/* GET users listing. */
router.get("/", auth.verifyToken, function (req, res, next) {
  res.send(users);
});

router.post("/", function (req, res, next) {
  const { useremail, password } = req.body;
  console.log({ useremail, password });
  console.log(req.body);
  if (!req.body) {
    return res.status(400).send({ message: "400" });
  }
  //seller
  if (useremail == User[0].email && password == User[0].pwd) {
    const token = generateAccessToken(useremail);
    res.cookie("token", token, { httpOnly: true });
    return res.json({ user: User[0], token: token });
  }
  //buyer
  if (useremail == User[1].email && password == User[1].pwd) {
    const token = generateAccessToken(useremail);
    res.cookie("token", token, { httpOnly: true });
    return res.json({ user: User[1], token: token });
  }
  // if (useremail != users.email || password != users.pwd) {
  //   return res.status(404).send("email or password incorrect");
  // }
  // const token = generateAccessToken(useremail);
  // jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
  //   console.log(decoded);
  // });
  // return res.json({ user: users, token: token });

  return res.status(404).send("email or password incorrect");
});

function generateAccessToken(useremail) {
  return jwt.sign({ useremail: useremail }, process.env.TOKEN_SECRET, {
    expiresIn: "1h",
  });
}
module.exports = router;
