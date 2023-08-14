const User = require("../models/usermodel");

const asyncHandler = require("../middleware/asyncerrorhandle")

const { generateToken } = require("../utils/jwtutils")

// @desc    Create a new user
// @route   POST /api/v1/registeruser
// @access  Public
exports.createUser = asyncHandler(async (req, res) => {
    const { name, email, password, avatar } = req.body;
  
    // Create a new user using the User model
    const newUser = await User.create({ name, email, password, avatar });

    // Generate JWT token

    const token = generateToken({ id: user._id})
  
    res.status(201).json({
      success: true,
       user: newUser,
      token,
 })
  });

 // @desc    User login and generate JWT token
// @route   POST /api/v1/login
// @access  Public
exports.userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken({ id: user._id });

    res.status(200).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
});

// @desc    User logout and clear cookies
// @route   GET /api/v1/logout
// @access  Private
exports.logout = asyncHandler(async (req, res) => {
  clearCookies(res);

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});


  // @desc    Request Password Reset (Generate Token)
// @route   POST /api/v1/request-password-reset
// @access  Public
exports.requestPasswordReset = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email }).select("-password");
    

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

     // Generate a random 6-digit reset token
     const resetToken = Math.floor(100000 + Math.random() * 900000).toString();

    // Generate a reset token and set the expiration time
    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiration = new Date(Date.now() + 60 * 60 * 1000); // Token expires in 1 hour


    await user.save();

    // You can implement email sending functionality here to send the reset token to the user's email

    res.status(200).json({
      success: true,
      message: "Password reset token generated successfully",
      resetToken: user.resetPasswordToken,
    });
  } catch (error) {
    // Log the error to the console or log file for debugging purposes
    console.error("Error in requestPasswordReset:",error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

// @desc    Reset Password
// @route   POST /api/v1/reset-password
// @access  Public
exports.resetPassword = asyncHandler(async (req, res) => {
  const { resetToken, newPassword } = req.body;

  try {
    // Find the user by the reset token and check if it's valid and not expired
    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordTokenExpiration: { $gt: new Date() }, // Check if the token is not expired
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      })
    }

    // Reset the password and clear the reset token fields
    user.password = newPassword;
    user.resetPasswordToken = null;
    user.resetPasswordTokenExpiration = null;
    await user.save()

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    })
  }
})

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
  })


  