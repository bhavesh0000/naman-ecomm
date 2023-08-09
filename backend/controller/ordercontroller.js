const asyncHandler =require("../middleware/asyncerrorhandle")

const Order = require("../models/ordermodel")

// Create order
exports.createOrder = asyncHandler(async (req, res) => {
    const { products, totalAmount } = req.body;
    const user = req.user.id; // Get user ID from the token
  
    const order = await Order.create({ user, products, totalAmount });
  
    res.status(201).json({
      success: true,
      order,
    });
  });