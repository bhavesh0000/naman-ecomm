const express = require("express")

const {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controller/userController")

const errorHandler = require("../utils/errorHandler")

const asyncHandler = require("../middleware/asyncerrorhandle")

const router = express.Router()


// @route   POST /api/v1/registeruser
router.route("/registeruser").post(asyncHandler(createUser));

// @route   GET /api/v1/users
router.route("/users").get(asyncHandler(getAllUsers));

// @route   GET /api/v1/users/:id
// @route   PUT /api/v1/users/:id
// @route   DELETE /api/v1/users/:id
router.route("/users/:id").get(asyncHandler(getUserById)).put(asyncHandler(updateUserById)).delete(asyncHandler(deleteUserById));

router.use(errorHandler)


module.exports = router;
