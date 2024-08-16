// controllers/assignControllers.js
const Assignment = require("../models/assignModel");

exports.createAssignment = (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ message: "Title and description are required" });
  }
  const teacher_id = req.user.username;
  Assignment.create(title, description, teacher_id, (err, result) => {
    if (err) throw err;
    res.status(201).json({ id: result.insertId }); // Make sure insertId is correct
  });
};


exports.getAssignments = (req, res) => {
  const teacher_id = req.user.username;
  Assignment.findAll(teacher_id,(err, results) => {
    if (err) return res.status(500).json({ message: "Database error", error: err.message });
    res.json(results);
  });
};

exports.updateAssignment = (req, res) => {
  const { id } = req.params; // This should be the ID from the URL
  const { title, description } = req.body;

  if (!id || !title || !description) {
    return res.status(400).json({ message: "ID, title, and description are required" });
  }

  Assignment.update(id, title, description, req.user.username, (err, result) => {
    if (err) {
      console.error(err); // Log error for debugging
      return res.status(500).json({ message: "An error occurred while updating the assignment" });
    }
    if (result.affectedRows === 0) {
      return res.status(403).json({ message: "Not authorized to update this assignment" });
    }
    res.json({ message: "Assignment updated successfully" });
  });
};


exports.deleteAssignment = (req, res) => {
  const { id } = req.params;

  // Validation checks
  if (!id || isNaN(id)) {
    return res.status(400).json({ message: "Valid ID is required" });
  }

  Assignment.delete(id, req.user.username, (err, result) => {
    if (err) return res.status(500).json({ message: "An error occurred", error: err.message });
    if (result.affectedRows === 0) {
      return res.status(403).json({ message: "Not authorized to delete this assignment" });
    }
    res.json({ message: "Assignment deleted successfully" });
  });
};
