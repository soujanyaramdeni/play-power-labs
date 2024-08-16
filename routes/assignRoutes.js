const express = require("express");
const {
  createAssignment,
  getAssignments,
  updateAssignment,
  deleteAssignment,
} = require("../controllers/assignController");
const authenticateToken = require("../authentication");
const router = express.Router();

router.post("/", authenticateToken, createAssignment);
router.get("/", authenticateToken, getAssignments);
router.put("/:id", authenticateToken, updateAssignment);
router.delete("/:id", authenticateToken, deleteAssignment);

module.exports = router;
