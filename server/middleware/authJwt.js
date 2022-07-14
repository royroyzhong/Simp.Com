const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const jwt_decode = require("jwt-decode");

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
    res.locals.user = decoded.data;
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

verifyGoogleToken = (req, res, next) => {
  console.log("google token midware");
  try {
    const user = jwt_decode(req.body.jwt);
    let data = {
      email: user.email,
      firstName: user.family_name,
      lastName: user.given_name,
      picture: user.picture,
    };

    res.locals.user = data;
    next();
  } catch (err) {
    res.status(401).send({
      message: "Unauthorized!",
    });
  }
};
generateAccessTokenWithRememberMe = (useremail, role) => {
  return jwt.sign(
    { data: { useremail: useremail, role: role } },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );
};
generateAccessTokenWithoutRememberMe = (useremail, role) => {
  return jwt.sign(
    { data: { useremail: useremail, role: role } },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "5m",
    }
  );
};
const authJwt = {
  verifyToken: verifyToken,
  buyerCheck: buyerCheck,
  sellerCheck: sellerCheck,
  verifyGoogleToken: verifyGoogleToken,
  generateAccessTokenWithRememberMe: generateAccessTokenWithRememberMe,
  generateAccessTokenWithoutRememberMe: generateAccessTokenWithoutRememberMe,
};
module.exports = authJwt;
