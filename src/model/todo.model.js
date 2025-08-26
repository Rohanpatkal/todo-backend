const db = require("../config/db");

// ✅ Get all todo
exports.getTodo = async () => {
  const result = await db.query("SELECT * FROM todo ORDER BY id ASC");
  return result.rows; // pg returns rows[]
};

// ✅ Create a todo
exports.createTodo = async (todo) => {
  try {
    const formattedDate = todo.due_date
      ? new Date(todo.due_date).toISOString().slice(0, 19).replace("T", " ")
      : null;

    const result = await db.query(
      `
        INSERT INTO todo 
        (todo, completion, status, priority, category, notes, due_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
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

    return result.rows[0];
  } catch (error) {
    console.error("Error inserting todo:", error);
    throw error;
  }
};

// ✅ Update a todo
exports.updateTodo = async (id, todo) => {
  try {
    const formattedDate = todo.due_date
      ? new Date(todo.due_date).toISOString().slice(0, 19).replace("T", " ")
      : null;

    const result = await db.query(
      `
        UPDATE todo 
        SET 
          todo = $1,
          completion = $2,
          status = $3,
          priority = $4,
          category = $5,
          notes = $6,
          due_date = $7,
          updated_at = NOW()
        WHERE id = $8
        RETURNING *
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

    return result.rows[0];
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
};

// ✅ Delete a todo
exports.deleteTodo = async (id) => {
  try {
    await db.query(`DELETE FROM todo WHERE id = $1`, [id]);
    return { success: true };
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};
