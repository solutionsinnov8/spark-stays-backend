const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);

    // Special case for admin
    if (decoded.userId === 'admin-id' && decoded.role === 'admin') {
      req.user = { _id: 'admin-id', role: 'admin', fullName: 'Admin' };
      return next();
    }

    // Regular user check
    const user = await User.findById(decoded.userId).select('-password');
    console.log("User Found:", user);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Token Verification Error:", error);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};


module.exports = authenticateUser;
