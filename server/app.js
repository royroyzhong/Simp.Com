require("dotenv").config({ path: "./config.env" });
var express = require("express");
var app = express();

// ++++++++++++++++++ Logger Config ++++++++++++++++++ //
var winston = require("winston"), expressWinston = require("express-winston");
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}}"

}));

app.use(
  expressWinston.errorLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
  })
);

// ++++++++++++++++++ Cookies & Securities ++++++++++++++++++ //
var cookieParser = require("cookie-parser");
var cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000", // must match to frontend path
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

// ++++++++++++++++++ Database Config ++++++++++++++++++ //
var path = require("path");
var mongoose = require("mongoose");

const dbURI =
  "mongodb+srv://doge-455:doge-123@sandbox.uqu5r.mongodb.net/cpsc455-doge-com?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log(err));

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// ++++++++++++++++++ Router Config ++++++++++++++++++ //
var authRouter = require("./routes/authRoutes");
var productRouter = require("./routes/productRoutes");

app.use("/index", (req, res) => {
  res.render("index");
});
app.use(authRouter);
app.use("/products", productRouter)

module.exports = app;
