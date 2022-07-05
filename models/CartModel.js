const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Cart = Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, "UserId is required"],
      ref: "users",
    },
    cart: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

var carts = mongoose.model("cart", Cart);
module.exports = carts;
