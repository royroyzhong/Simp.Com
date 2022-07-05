const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
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
    req.body.user = decoded;
    next();
  });
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
