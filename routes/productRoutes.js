const express = require("express");
const {
  Get_All_Product,
  Create_Product,
  Update_Product,
  Delete_Product,
  Searching,
  upload,
  pagination,
} = require("../controllers/productControllers");
const isVerify = require("../middleware/authenticationCheck");
const router = express.Router();

router.route("/getProducts").get(isVerify, Get_All_Product);
router.route("/getProducts/:key").get(Searching);
router.route("/create_products").post(upload.single("image"), Create_Product);
router.route("/update_products/:id").put(Update_Product);
router.route("/delete_products/:id").delete(Delete_Product);
router.route("/paginate/:page?").get(pagination);

module.exports = router;
