// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  // Extract token from headers
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Verify token
    const decodedToken = jwt.verify(token, 'your-secret-key');

    // Attach authenticated user to request object
    req.user = decodedToken;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

exports.authorize = (requiredRole) => {
  return (req, res, next) => {
    if (req.user && req.user.role === requiredRole) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden' });
    }
  };
};
