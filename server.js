const express = require('express');
const mysql = require('mysql2');
const sequelize = require('./config/connections');

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
      user: DB_USER,
      // TODO: Add MySQL password here
      password: DB_PASSWORD,
      database: DB_NAME
    },
    console.log(`Connected to the company_db database.`)
  );

app.use((req, res) => {
    res.status(404).end();
});

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening`));
});