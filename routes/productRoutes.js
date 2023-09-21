const express = require("express");

const router = express.Router();
const {
  getAllProducts,
  createProducts,
} = require("../controllers/productController");
const { uploadProductImage } = require("../controllers/uploadsController");

router.route("/").get(getAllProducts).post(createProducts);

router.route("/uploads").post(uploadProductImage);

module.exports = router;
