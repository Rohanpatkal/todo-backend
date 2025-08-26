const express = require('express');
const cors = require("cors");
const todoRoutes = require('./routes/todo.routes');

const app = express();

app.use(cors({
    origin: "*",  // your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

app.use("/api/todos",todoRoutes);

module.exports = app;