var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const products = Schema(
  {
    name: { type: String, required: [true, "please enter name"] },
    price: { type: Number, required: [true, "please enter price"] },
    image: { type: String, required: [true, "please enter image"] },
    cat_id: {
      type: Schema.Types.ObjectId,
      ref: "prodCategorys",
      required: [true, "please enter Cat_id"],
    },
  },
  { timestamps: true }
);

var product = mongoose.model("products", products);
module.exports = product;
