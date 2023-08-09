const express = require("express")
// const { router } = require("../app")
const { getAllProducts,
     createProduct, 
     updateProduct, 
     deleteProduct, 
     getProduct } =
        require("../controller/productController")

const errorHandler = require("../utils/errorHandler")
const asyncHandler = require("../middleware/asyncerrorhandle")

const isAdmin = require ("../middleware/isadmin")



const router = express.Router()

router.route("/product").get(asyncHandler(getAllProducts))
router.route("/product/new").post(isAdmin,asyncHandler(createProduct))

router.route("/product/:id")
.put(isAdmin, asyncHandler(updateProduct))
.delete(isAdmin, asyncHandler(deleteProduct))
.get(asyncHandler(getProduct))

router.use(errorHandler)

module.exports= router