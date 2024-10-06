// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

module.exports = (req, res, next) => {
  const token = req.headers['authorization'];

  if (token) {
    jwt.verify(token.split(' ')[1], secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized access.' });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'No token provided.' });
  }
};