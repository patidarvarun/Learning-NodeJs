var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const users = Schema({
  name: { type: String, required: [true, "Please Enter Name"] },
  email: { type: String, unique: true, required: [true, "Please Enter Email"] },
  phone: { type: String, required: [true, "Please Enter Phone No."] },
  password: {
    type: String,
    minlength: 6,
    required: [true, "Please Enter Password"],
  },
  role: { type: String, default: "user" },
});

var user = mongoose.model("users", users);
module.exports = user;
