const express = require("express");
const {
  AddProToCart,
  get_Cart_data,
} = require("../controllers/CartController");

const router = express.Router();

router.route("/addTocart").post(AddProToCart);
router.route("/getCartItem").get(get_Cart_data);

module.exports = router;
