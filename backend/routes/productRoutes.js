const express = require("express")
// const { router } = require("../app")
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProduct } = require("../controller/productController")

const errorHandler = require("../utils/errorHandler")
const asyncHandler = require("../middleware/asyncerrorhandle")



const router = express.Router()

router.route("/product").get(asyncHandler(getAllProducts))
router.route("/product/new").post(asyncHandler(createProduct))

router.route("/product/:id").put(asyncHandler(updateProduct)).delete(asyncHandler(deleteProduct)).get(asyncHandler(getProduct))

router.use(errorHandler)

module.exports= router