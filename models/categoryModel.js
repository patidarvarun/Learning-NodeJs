const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Category = Schema({
  name: { type: String, required: [true, "Please Enter Category Name"] },
  image: { type: String, required: [true, "Please Upload Image"] },
});

var category = mongoose.model("prodCategorys", Category);
module.exports = category;
