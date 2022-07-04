const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Cart = Schema({
  userId: { type: String, required: [true, "UserId is required"] },
  productId: { type: String, required: [true, "ProductId is required"] },
  quantity: { type: Number, required: [true, "Please provide quantity"] },
});

var carts = mongoose.model("cart", Cart);
module.exports = carts;
