const service = require("../service/todo.service");

exports.getTodo = async (req, res) => {
  try {
    const result = await service.getTodo();
    console.log(result);
    res.status(200).json(result);
  } catch (err) {
    throw err;
  }
};

exports.createTodo = async (req, res) => {
  const todo = req.body;
  try {
    const response = await service.createTodo(todo);
    res.status(200).json(response);
  } catch (err) {
    throw err;
  }
};

exports.updateTodo = async (req, res) => {
  const id = req.params.id;
  const todo = req.body;
  try {
    const response = await service.updateTodo(id, todo);
    res.status(200).json(response);
  } catch (err) {
    throw err;
  }
};

exports.deleteTodo = async (req , res) => {
  const id = req.params.id;
  console.log('id is: ',id);
  try{
    const response = await service.deleteTodo(id);
    res.status(200).json({message: "task deleted successfully" , response})
  } catch (err) {
    throw err;
  }
}