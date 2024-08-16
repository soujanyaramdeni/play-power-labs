// models/userModels.js
const db = require("../db");

const User = {
  findByUsername: (username, callback) => {
    const query = "SELECT * FROM users WHERE username = ?";
    db.query(query, [username], callback);
  },
  createUser: (username, hashedPassword, callback) => {
    if (!username || !hashedPassword) {
      return callback(new Error("Username and password are required"));
    }
    const query = "INSERT INTO users (username, password) VALUES (?, ?)";
    db.query(query, [username, hashedPassword], callback);
  },
};

module.exports = User;
