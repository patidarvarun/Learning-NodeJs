const express = require("express");
const isVerify = require("../middleware/authenticationCheck");
const {
  Register,
  login,
  get_User,
  update_User,
  delete_User,
  sendUserResetPassword,
  userPasswordReset,
  changeUserPassword,
} = require("../controllers/userControllers");
const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(login);
router.route("/getUser").get(isVerify, get_User);
router.route("/updateUser/:id").put(update_User);
router.route("/deleteUser/:id").delete(delete_User);
router.route("/send-reset-password-email").post(sendUserResetPassword);
router.route("/reset-password/:id/:token").post(userPasswordReset);
router.route("/changePassword").post(changeUserPassword);

module.exports = router;
