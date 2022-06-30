var express = require("express");
var router = express.Router();
const dotenv = require("dotenv");
const auth = require("../middleware/authJwt");
const checkDupUser = require("../middleware/signUpVerification");
const authControllers = require("../controllers/authController");
dotenv.config();
// const token = crypto.randomBytes(48).toString("base64url");

router.get("/signup", authControllers.signup_get);
router.post("/signup", checkDupUser.checkDupUser, authControllers.signup_post);
router.get("/login", auth.verifyToken, authControllers.login_get);
router.post("/login", authControllers.login_post);
router.get("/logout", authControllers.logout_get);

module.exports = router;
