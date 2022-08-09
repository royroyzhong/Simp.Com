var express = require("express");
var router = express.Router();
const profileController = require("../controllers/profileController");
const auth = require("../middleware/authJwt");

router.put("/user/profile", profileController.updateProfile_put);
router.put("/seller/user/profile", profileController.updateProfile_put);
router.put("/user/profile/password", profileController.updatePassword_put);
router.put(
  "/seller/user/profile/password",
  profileController.updatePassword_put
);
router.get(
  "/user/sellers",
  auth.verifyToken,
  profileController.getAllSeller_get
);

module.exports = router;
