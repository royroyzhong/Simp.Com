var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var authRouter = require("./routes/authRoutes");
const corsOptions = {
  origin: "http://localhost:3000", // must match to frontend path
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
var app = express();

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/index", (req, res) => {
  res.render("index");
});
app.use(authRouter);

module.exports = app;
