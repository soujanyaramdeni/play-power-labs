// models/assignModels.js
const db = require("../db");

const Assignment = {
  create: (title, description, teacher_id, callback) => {
    const query = "INSERT INTO assignments (title, description, teacher_id) VALUES (?, ?, ?)";
    db.query(query, [title, description, teacher_id], (err, result) => {
      if (err) return callback(err);
      return callback(null, { insertId: result.insertId });
    });
  },
  
  findAll: (teacher_id, callback) => {
    const query = "SELECT * FROM assignments WHERE teacher_id=?";
    db.query(query, teacher_id, callback);
  },
  update: (id, title, description, teacher_id, callback) => {
    if (!id || !title || !description || !teacher_id) {
      return callback(new Error("ID, title, description, and teacher ID are required"));
    }
    const query = "UPDATE assignments SET title = ?, description = ? WHERE id = ? AND teacher_id = ?";
    db.query(query, [title, description, id, teacher_id], callback);
  },
  delete: (id, teacher_id, callback) => {
    if (!id || !teacher_id) {
      return callback(new Error("ID and teacher ID are required"));
    }
    const query = "DELETE FROM assignments WHERE id = ? AND teacher_id = ?";
    db.query(query, [id, teacher_id], callback);
  },
};

module.exports = Assignment;
