const db = require("../config/db");

exports.getTodo = async () => {
  const [row] = await db.query("SELECT * FROM todo");
  return row;
};

exports.createTodo = async (todo) => {
  try {
    const formattedDate = new Date(todo.due_date)
      .toISOString()
      .slice(0, 19) // "2025-07-04T18:30:00"
      .replace("T", " "); // → "2025-07-04 18:30:00"
    const result = await db.query(
      `
        INSERT INTO todo 
        (todo, completion, status, priority, category, notes, due_date)
        values (?, ?, ?, ?, ?, ?, ?)
    `,
      [
        todo.todo,
        todo.completion,
        todo.status,
        todo.priority,
        todo.category,
        todo.notes,
        formattedDate,
      ]
    );
    return {
      id: result.insertId,
      ...todo,
      due_date: formattedDate, // return MySQL format in response
    };
  } catch (error) {
    console.error("Error inserting todo:", error);
    throw error;
  }
};

exports.updateTodo = async (id, todo) => {
  try {
    console.log("id is: ", id);
    console.log("id is: ", todo);
    const formattedDate = todo.due_date
      ? new Date(todo.due_date).toISOString().slice(0, 19).replace("T", " ")
      : null;
    const [result] = await db.query(
      `
    UPDATE todo 
    SET 
    todo = ? ,
    completion = ?,
    status = ? ,
    priority = ? ,
    category = ? ,
    notes = ? ,
    due_date = ?
    WHERE id = ?
    `,
      [
        todo.todo,
        todo.completion,
        todo.status,
        todo.priority,
        todo.category,
        todo.notes,
        formattedDate,
        id,
      ]
    );
    return {
      id,
      ...todo,
      due_date: formattedDate, // return MySQL format in response
    };
  } catch (error) {
    console.error("Error inserting todo:", error);
    throw error;
  }
};

exports.deleteTodo = async (id) => {
  try {
    await db.query(
      `
        DELETE FROM todo WHERE id = ?
        `,
      id
    );
  } catch (err) {
    console.error("Error delteing todo:", err);
    throw error;
  }
};
