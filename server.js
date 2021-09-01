const express = require('express');
const mysql = require('mysql2');
//const sequelize = require('./config/connections');
const dotenv = require('dotenv');
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'cats',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
  );

app.use((req, res) => {
    res.status(404).end();
});

// sequelize.sync({ force: false }).then(() => {
//     app.listen(PORT, () => console.log(`Now listening`));
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});