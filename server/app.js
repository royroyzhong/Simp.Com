require("dotenv").config({ path: "./config.env" });
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var winston = require("winston"), expressWinston = require("express-winston");
var cors = require("cors");
var authRouter = require("./routes/authRoutes");
const mongoose = require("mongoose");





//cors for cookies in frontend
const corsOptions = {
  origin: "http://localhost:3000", // must match to frontend path
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
const dbo = require("./db/conn");

var app = express();

// Logger configuration 
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

app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  )
}));

// // sync perform a database connection when the server starts
// dbo.connectToServer(function (err) {
//   if (err) {
//     console.error(err);
//     process.exit();
//   }
// });

//async
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

app.use("/index", (req, res) => {
  res.render("index");
});
app.use(authRouter);

module.exports = app;
