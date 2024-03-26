const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

// Route to create a new task
router.post("/", authMiddleware, taskController.createTask);

// Route to get all tasks for the authenticated user
router.get("/", authMiddleware, taskController.getAllTasks);

// Route to update a task
router.put("/:id", authMiddleware, taskController.updateTask);

// Route to delete a task
router.delete("/:id", authMiddleware, taskController.deleteTask);

module.exports = router;
