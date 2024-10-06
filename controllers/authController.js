// controllers/authController.js
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';

exports.register = (req, res) => {
  const { username, password, email } = req.body;
  const existingUser = userModel.findUser(
    (user) => user.username === username
  );

  if (existingUser) {
    return res.status(409).json({ message: 'User already exists.' });
  }

  const newUser = {
    id: Date.now(),
    username,
    password, // Note: In a real app, passwords should be hashed!
    email,
  };

  userModel.addUser(newUser);
  res.status(201).json({ message: 'User registered successfully.' });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  const user = userModel.findUser(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    const token = jwt.sign(
      { id: user.id, username: user.username },
      secretKey,
      { expiresIn: '1h' }
    );
    res.json({ message: 'Login successful.', token });
  } else {
    res.status(401).json({ message: 'Invalid credentials.' });
  }
};