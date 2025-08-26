const model = require("../model/todo.model");

exports.getTodo = async () => {
  const result = await model.getTodo();
  return result;
};

exports.createTodo = async (todo) => {
  const result = await model.createTodo(todo);
  return result;
};

exports.updateTodo = async (id, todo) => {
  const result = await model.updateTodo(id, todo);
  return result;
};

exports.deleteTodo = async (id) => {
    const result = await model.deleteTodo(id);
    return result;
}