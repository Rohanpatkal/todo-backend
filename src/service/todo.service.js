const model = require("../model/todo.model");

exports.getTodo = async () => {
  return await model.getTodo();
};

exports.createTodo = async (todo) => {
  return await model.createTodo(todo);
};

exports.updateTodo = async (id, todo) => {
  return await model.updateTodo(id, todo);
};

exports.deleteTodo = async (id) => {
  return await model.deleteTodo(id);
};
