var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var jwt = require("jsonwebtoken");

var indexRouter = require("./routes/index");
var buyerUsersRouter = require("./routes/buyerUsers");
var sellerUsersRouter = require("./routes/sellerUsers");
var user = require("./routes/login");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// //middleware that checks if JWT token exists and verifies it if it does exist.
// //In all the future routes, this helps to know if the request is authenticated or not.
// app.use(function (req, res, next) {
//   // check header or url parameters or post parameters for token
//   var token = req.headers["authorization"];
//   if (!token) return next();

//   token = token.replace("Bearer ", "");

//   jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
//     if (err) {
//       return res.status(401).json({
//         success: false,
//         message: "Please register Log in using a valid email to submit posts",
//       });
//     } else {
//       req.user = user;
//       next();
//     }
//   });
// });

app.use("/", indexRouter);
app.use("/buyerUsers", buyerUsersRouter);
app.use("/sellerUsers", sellerUsersRouter);
app.use("/login", user);

module.exports = app;
