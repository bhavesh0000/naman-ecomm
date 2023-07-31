const handleErrors = (err, req, res, next) => {
    console.error(err.stack);
  
    // Mongoose validation error
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((error) => error.message);
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    // MongoDB CastError
  if (err.name === "CastError" && err.kind === "ObjectId") {
    return res.status(400).json({
      success: false,
      message: "Invalid MongoDB ObjectId",
    });
  }

  
  
    // Default server error
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  };
  
  module.exports = handleErrors;
  