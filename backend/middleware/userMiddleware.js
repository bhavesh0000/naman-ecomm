const bcrypt = require("bcryptjs");

// Middleware to hash the user's password before saving it to the database
const hashPassword = async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    // Generate a salt to hash the password
    const salt = await bcrypt.genSalt(10);

    // Hash the user's password
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  hashPassword,
};