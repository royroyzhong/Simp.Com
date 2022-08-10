require("dotenv").config({ path: "./config.env" });
var express = require("express");
var app = express();

// ++++++++++++++++++ Logger Config ++++++++++++++++++ //
var winston = require("winston"),
  expressWinston = require("express-winston");

const myFormat = winston.format.printf(
  ({ level, message, label, timestamp, ...meta }) => {
    let entries = Object.entries(meta.meta);
    let metaString = "";
    for (const [k, v] of entries) {
      metaString += `\u001b[32m[${k}]\u001b[0m : ${JSON.stringify(
        v,
        undefined,
        2
      )} \n`;
    }
    return `${timestamp} ${label} >>> [${level}]: ${message} \n ${metaString}`;
  }
);

app.use(
  expressWinston.logger({
    format: winston.format.combine(
      winston.format.label({ label: "ʕ ·ᴥ· ʔ" }),
      winston.format.timestamp(),
      winston.format.colorize(),
      winston.format.prettyPrint(),
      myFormat
    ),
    transports: [new winston.transports.Console()],
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorize: false,
  })
);

app.use(
  expressWinston.errorLogger({
    level: "info",
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.label({ label: "ʕ ·ᴥ· ʔ" }),
      winston.format.timestamp(),
      winston.format.colorize(),
      winston.format.json()
    ),
  })
);

// ++++++++++++++++++ Cookies & Securities ++++++++++++++++++ //
var cookieParser = require("cookie-parser");
var cors = require("cors");
const corsOptions = {
  origin: "*", // must match to frontend path
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

// ++++++++++++++++++ Router Config ++++++++++++++++++ //
var authRouter = require("./routes/authRoutes");
var userProfile = require("./routes/userProfile");
var productRouter = require("./routes/productRoutes");
var orderRouter = require("./routes/orderRoutes");
var emailRouter = require("./routes/emailNotification");
var imageRouter = require("./routes/imageRoutes");

app.use("/index", (req, res) => {
  res.render("index");
});
app.use(authRouter);
app.use(userProfile);
app.use("/products", productRouter);
app.use("/order", orderRouter);
app.use("/restock", emailRouter);
app.use("/image", imageRouter);

app.use("/", express.static(__dirname + "/public/build"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "build", "index.html"));
});

module.exports = app;
