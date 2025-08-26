const service = require("../service/todo.service");

exports.getTodo = async (req, res) => {
  try {
    const result = await service.getTodo();
    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching todos:", err);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

exports.createTodo = async (req, res) => {
  const todo = req.body;
  try {
    const response = await service.createTodo(todo);
    res.status(201).json(response);
  } catch (err) {
    console.error("Error creating todo:", err);
    res.status(500).json({ error: "Failed to create todo" });
  }
};

exports.updateTodo = async (req, res) => {
  const id = req.params.id;
  const todo = req.body;
  try {
    const response = await service.updateTodo(id, todo);
    res.status(200).json(response);
  } catch (err) {
    console.error("Error updating todo:", err);
    res.status(500).json({ error: "Failed to update todo" });
  }
};

exports.deleteTodo = async (req, res) => {
  const id = req.params.id;
  try {
    await service.deleteTodo(id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Error deleting todo:", err);
    res.status(500).json({ error: "Failed to delete todo" });
  }
};
