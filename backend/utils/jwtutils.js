const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
      } catch (error) {
        // If the token is invalid or expired, an error will be thrown
        throw new Error('Invalid or expired token');
      }
      
};

module.exports = { generateToken, verifyToken };