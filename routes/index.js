const express = require("express");
const cors = require("cors");
// var morgan = require("morgan");  its show the frontEnd current api name
require("dotenv").config();
const product = require("./productRoutes");
const register = require("./userRoutes");
const category = require("./categoriesRoutes");

const app = express();
app.use(express.json());
app.use(cors());
// app.use(morgan("combined"));
// app.use(express.static(__dirname + "/public"));
// app.use("/uploads", express.static("uploads"));
app.use("/api", product);
app.use("/api", register);
app.use("/api", category);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Home page</h1>");
});
module.exports = app;
