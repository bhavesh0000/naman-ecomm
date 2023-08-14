const asyncHandler =require("../middleware/asyncerrorhandle")

const Order = require("../models/ordermodel")

// Create order
exports.createOrder = asyncHandler(async (req, res) => {
  const { products, deliveryAddress, billingAddress, offers } = req.body;

  const order = await Order.create({
    user: req.user._id,
    products,
    deliveryAddress,
    billingAddress,
    offers,
  });

  res.status(201).json({
    success: true,
    order,
  })
})
// @desc    Get a single order by ID
// @route   GET /api/v1/orders/:id
// @access  Private
exports.getSingleOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('products.product', 'name price');

  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found',
    });
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// @desc    Get logged in user's orders
// @route   GET /api/v1/orders/myorders
// @access  Private
exports.myOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// @desc    Get all orders
// @route   GET /api/v1/orders
// @access  Private/Admin
exports.getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate('user', 'name email');

  res.status(200).json({
    success: true,
    orders,
  });
});

// @desc    Update order status by ID
// @route   PUT /api/v1/orders/:id
// @access  Private/Admin
exports.updateOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found',
    });
  }

  order.deliveredAt = new Date();
  await order.save();

  res.status(200).json({
    success: true,
    message: 'Order status updated',
  });
});

// @desc    Delete order by ID
// @route   DELETE /api/v1/orders/:id
// @access  Private/Admin
exports.deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found',
    });
  }

  await order.remove();

  res.status(200).json({
    success: true,
    message: 'Order deleted',
  });
})
