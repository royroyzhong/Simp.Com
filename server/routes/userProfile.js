var express = require("express");
var router = express.Router();
const profileController = require("../controllers/profileController");

router.put("/user/profile", profileController.updateProfile_put);
router.put("/user/profile/password", profileController.updatePassword_put);

module.exports = router;
