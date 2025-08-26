require("dotenv").config();
const app = require('./src/app')
const pool = require('./src/config/db');

app.listen(3000 , ()=> {
    console.log('Backend running on http://localhost:3000');
})