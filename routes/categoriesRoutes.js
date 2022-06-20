const express = require("express");
const {
  create_Category,
  upload,
  get_Category,
  update_Category,
  delete_Category,
} = require("../controllers/categoryControllers");

const router = express.Router();

router.route("/createCategory").post(upload.single("image"), create_Category);
router.route("/getCategory").get(get_Category);
router
  .route("/updateCategory/:id")
  .put(upload.single("image"), update_Category);
router.route("/deleteCategory/:id").delete(delete_Category);

module.exports = router;
