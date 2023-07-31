const User = require("../models/usermodel");

const asyncHandler = require("../middleware/asyncerrorhandle")



// @desc    Create a new user
// @route   POST /api/v1/registeruser
// @access  Public
exports.createUser = asyncHandler(async (req, res) => {
    const { name, email, password, avatar } = req.body;
  
    // Create a new user using the User model
    const user = await User.create({ name, email, password, avatar });
  
    res.status(201).json({
      success: true,
      user,
    });
  });
  
  // @desc    Get all users
  // @route   GET /api/v1/users
  // @access  Public
  exports.getAllUsers = asyncHandler(async (req, res) => {
    // Fetch all users using the User model
    const users = await User.find();
  
    res.status(200).json({
      success: true,
      users,
    });
  });
  
  // @desc    Get user by ID
  // @route   GET /api/v1/users/:id
  // @access  Public
  exports.getUserById = asyncHandler(async (req, res) => {
    const userId = req.params.id;
  
    // Find user by ID using the User model
    const user = await User.findById(userId);
  
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  
    res.status(200).json({
      success: true,
      user,
    });
  });
  
  // @desc    Update user by ID
  // @route   PUT /api/v1/users/:id
  // @access  Public
  exports.updateUserById = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const { name, email, password, avatar } = req.body;
  
    // Find user by ID and update using the User model
    const user = await User.findByIdAndUpdate(
      userId,
      { name, email, password, avatar },
      { new: true, runValidators: true }
    );
  
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  
    res.status(200).json({
      success: true,
      user,
    });
  });
  
  // @desc    Delete user by ID
  // @route   DELETE /api/v1/users/:id
  // @access  Public
  exports.deleteUserById = asyncHandler(async (req, res) => {
    const userId = req.params.id;
  
    // Find user by ID and delete using the User model
    const user = await User.findByIdAndDelete(userId);
  
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  });

  