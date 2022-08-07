const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");

verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }
  jwt.verify(
    token,
    "-ntXnNLuNzTn7sMb1PjeHXchuNXReXzTr0z3nNv0u3P2plwcG0UntOaYoYW-54K6",
    (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }
      res.locals.user = decoded.data;
      next();
    }
  );
};

verifyGoogleToken = (req, res, next) => {
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
    "-ntXnNLuNzTn7sMb1PjeHXchuNXReXzTr0z3nNv0u3P2plwcG0UntOaYoYW-54K6",
    {
      expiresIn: "1d",
    }
  );
};

generateAccessTokenWithoutRememberMe = (useremail, role) => {
  return jwt.sign(
    { data: { useremail: useremail, role: role } },
    "-ntXnNLuNzTn7sMb1PjeHXchuNXReXzTr0z3nNv0u3P2plwcG0UntOaYoYW-54K6",
    {
      expiresIn: "5m",
    }
  );
};

const authJwt = {
  verifyToken: verifyToken,
  verifyGoogleToken: verifyGoogleToken,
  generateAccessTokenWithRememberMe: generateAccessTokenWithRememberMe,
  generateAccessTokenWithoutRememberMe: generateAccessTokenWithoutRememberMe,
};

module.exports = authJwt;
