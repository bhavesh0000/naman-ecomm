const ErrorHandler = require("../middleware/error")

const isAdmin = (req, res, next) => {
    // Check if the user is an admin
    if (req.user && req.user.isAdmin) {
      next(); // User is admin, proceed to the next middleware
    } else {
      return next(new ErrorHandler('Unauthorized: Admin access only', 403));
    }
  };
  
  module.exports = isAdmin;