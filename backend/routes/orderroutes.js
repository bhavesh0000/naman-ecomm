const express = require("express")


const { createOrder } = require("../controller/ordercontroller")


const errorHandler = require("../utils/errorHandler")

const asyncHandler = require("../middleware/asyncerrorhandle")

const { verifyToken } = require('../utils/jwtutils')

const isAdmin = require('../middleware/isadmin')

const router = express.Router()


// @route   POST /api/v1/orders
// @access  Private (Only logged-in users)
router.route("/orders").post(verifyToken, asyncHandler(createOrder));


router.use(errorHandler)