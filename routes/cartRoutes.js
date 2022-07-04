const express = require("express");
const { AddProToCart } = require("../controllers/CartController");

const router = express.Router();

router.route("/addTocart").post(AddProToCart);

module.exports = router;
