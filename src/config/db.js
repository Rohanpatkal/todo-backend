// src/config/db.js
const { Pool } = require("pg");

const pool = new Pool({
  user: "rohanpatkal",
  host: "dpg-d2mq7cbipnbc73f72990-a.oregon-postgres.render.com",
  database: "todo_db_ej4i",
  password: "EhYr8ZSq3VMiGM2h23FtQYmgJvh92UWK",
  port: 5432,
  ssl: { rejectUnauthorized: false }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
