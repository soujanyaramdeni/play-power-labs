// controllers/authControllers.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const { SECRET_KEY } = require("../config");

exports.register = (req, res) => {
  const { username, password } = req.body;

  // Validation checks
  if (!username || typeof username !== 'string' || username.trim().length < 3) {
    return res.status(400).json({ message: "Valid username is required (min 3 characters)" });
  }
  if (!password || typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long" });
  }

  User.findByUsername(username, (err, results) => {
    if (err) return res.status(500).json({ message: "Database error", error: err.message });
    if (results.length > 0) {
      return res.status(400).json({ message: "Username already exists" });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ message: "Error hashing password", error: err.message });

      User.createUser(username, hashedPassword, (err, result) => {
        if (err) return res.status(500).json({ message: "Database error", error: err.message });
        res.status(201).json({ message: "User registered successfully" });
      });
    });
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  // Validation checks
  if (!username || typeof username !== 'string' || username.trim().length < 3) {
    return res.status(400).json({ message: "Valid username is required (min 3 characters)" });
  }
  if (!password || typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long" });
  }

  User.findByUsername(username, (err, results) => {
    if (err) return res.status(500).json({ message: "Database error", error: err.message });

    if (results.length === 0) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ message: "Error comparing passwords", error: err.message });

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid username or password" });
      }

      const token = jwt.sign({ username: user.username }, SECRET_KEY, {
        expiresIn: "24h",
      });

      res.json({ token });
    });
  });
};
