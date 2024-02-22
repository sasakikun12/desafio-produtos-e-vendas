const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.SECRET_TOKEN;

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    console.error(err)
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.userId = decoded.userId;
    next();
  });
};

module.exports = verifyToken;