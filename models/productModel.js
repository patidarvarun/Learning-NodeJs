var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const products = Schema({
  name: { type: String, required: [true, "please enter name"] },
  price: { type: Number, required: [true, "please enter price"] },
  image: { type: String, required: [true, "please enter image"] },
});

var product = mongoose.model("products", products);
module.exports = product;
