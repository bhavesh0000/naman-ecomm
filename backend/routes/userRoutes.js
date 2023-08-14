const express = require("express")

const {
  createUser,
  userLogin,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  requestPasswordReset,
  resetPassword,
} = require("../controller/userController")

const errorHandler = require("../utils/errorHandler")

const asyncHandler = require("../middleware/asyncerrorhandle")

const { verifyToken } = require('../utils/jwtutils')

const isAdmin = require('../middleware/isadmin')

const router = express.Router()



// public routes
// @route   POST /api/v1/registeruser
router.route("/registeruser").post(asyncHandler(createUser));

router.route("/login").post(asyncHandler(userLogin))

// admin routes
router.use(verifyToken)
// @route   GET /api/v1/users
router.route("/users").get(verifyToken , isAdmin, asyncHandler(getAllUsers));

// @route   GET /api/v1/users/:id
// @route   PUT /api/v1/users/:id
// @route   DELETE /api/v1/users/:id
router.route("/users/:id").get(verifyToken , isAdmin, asyncHandler(getUserById))
.put(verifyToken , isAdmin,asyncHandler(updateUserById))
.delete(verifyToken , isAdmin,asyncHandler(deleteUserById));


// @route   POST /api/v1/request-password-reset
router.route("/request-password-reset").post(asyncHandler(requestPasswordReset))

// @route   POST /api/v1/reset-password
router.route("/reset-password").post(asyncHandler(resetPassword))



router.use(errorHandler)

module.exports = router;
