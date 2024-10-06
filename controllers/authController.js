// controllers/authController.js
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const errorHandler = require('../utils/errorHandler');
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

exports.register = async (req, res) => {
  const { username, password, email } = req.body;
  const existingUser = userModel.findUser((user) => user.username === username);

  if (existingUser) {
    return res.status(409).json({ message: "User already exists." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: Date.now(),
      username,
      password: hashedPassword,
      email,
    };

    userModel.addUser(newUser);
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    errorHandler(res, error, "Error registering user");
  }
};

// controllers/authController.js
exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = userModel.findUser((u) => u.username === username);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  try {
    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign(
        { id: user.id, username: user.username },
        secretKey,
        { expiresIn: "1h" }
      );
      res.json({ message: "Login successful.", token });
    } else {
      res.status(401).json({ message: "Invalid credentials." });
    }
  } catch (error) {
    errorHandler(res, error, "Error during login");
  }
};
