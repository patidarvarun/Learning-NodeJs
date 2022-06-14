var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const products = mongoose.Schema({
  name: { type: String, required: [true, "please enter name"] },
  price: { type: Number, required: [true, "please enter price"] },
  image: { type: String, required: [true, "please enter image"] },
});

var product = mongoose.models.products || mongoose.model("products", products);
module.exports = product;
