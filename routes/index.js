const express = require("express");
const cors = require("cors");
// var morgan = require("morgan");
require("dotenv").config();
const product = require("./productRoutes");

const app = express();
app.use(express.json());
app.use(cors());
// app.use(morgan("combined"));
// app.use(express.static(__dirname + "/public"));
// app.use("/uploads", express.static("uploads"));
app.use("/api", product);

module.exports = app;
