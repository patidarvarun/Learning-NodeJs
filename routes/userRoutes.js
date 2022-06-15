const express = require("express");
const { Register, login } = require("../controllers/userControllers");
const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(login);

module.exports = router;
