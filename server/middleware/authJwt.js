const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const User = [
  {
    name: "seller",
    email: "456@gmail.com",
    pwd: "123123",
  },
  {
    name: "buyer",
    email: "123@gmail.com",
    pwd: "123",
  },
];
verifyToken = (req, res, next) => {
  // try {
  const token = req.cookies.jwt;
  console.log("verifyToken: " + token);
  if (!token) {
    console.log("!token");
    return res.status(403).send({
      message: "No token provided!",
    });
  }
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.tokenData = decoded;
    next();
  });
  // } catch {
  //   res.status(401).json({
  //     error: new Error("Invalid request!"),
  //   });
  // }
};

sellerCheck = (req, res, next) => {
  //   User.findByPk(req.userId).then((user) => {
  //     user.getRoles().then((roles) => {
  //       for (let i = 0; i < roles.length; i++) {
  //         if (roles[i].name === "seller") {
  //           next();
  //           return;
  //         }
  //       }
  //       res.status(403).send({
  //         message: "Require Moderator or Admin Role!",
  //       });
  //     });
  //   });
  if (req.name == "seller") {
    next();
    return;
  }
  res.status(403).send({
    message: "Require Seller Role!",
  });
};
buyerCheck = (req, res, next) => {
  //   User.findByPk(req.userId).then((user) => {
  //     user.getRoles().then((roles) => {
  //       for (let i = 0; i < roles.length; i++) {
  //         if (roles[i].name === "seller") {
  //           next();
  //           return;
  //         }
  //       }
  //       res.status(403).send({
  //         message: "Require Moderator or Admin Role!",
  //       });
  //     });
  //   });
  if (req.name == "buyer") {
    next();
    return;
  }
  res.status(403).send({
    message: "Require Buyer Role!",
  });
};

const authJwt = {
  verifyToken: verifyToken,
  buyerCheck: buyerCheck,
  sellerCheck: sellerCheck,
};
module.exports = authJwt;
