const Task = require("../models/Task");

// Controller function to create a new task
exports.createTask = async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;
  try {
    // Create a new task and associate it with the authenticated user
    const newTask = new Task({
      title,
      description,
      status,
      priority,
      dueDate,
      user: req.user.id, // Assign the authenticated user's ID to the task
    });

    const task = await newTask.save();
    res.json(task);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Controller function to get all tasks for the authenticated user
exports.getAllTasks = async (req, res) => {
  try {
    // Find all tasks associated with the authenticated user
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Controller function to update a task
exports.updateTask = async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;
  try {
    // Find the task by ID
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check if the authenticated user owns the task
    if (task.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: "Not authorized to update this task" });
    }

    // Update the task fields
    task.title = title;
    task.description = description;
    task.status = status;
    task.priority = priority;
    task.dueDate = dueDate;

    await task.save();
    res.json(task);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Controller function to delete a task
exports.deleteTask = async (req, res) => {
  try {
    // Find the task by ID
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check if the authenticated user owns the task
    if (task.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: "Not authorized to delete this task" });
    }

    // Delete the task
    await task.remove();
    res.json({ message: "Task removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
