const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table');

const { viewAllDept } = require('./js/functions');

const app = express();

const PORT = process.env.PORT || 3001;


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

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'Please make a selection:',
            choices: [
                'view all departments',
                'view all roles',
                'view all employees',
                'add a department',
                'add a role',
                'add an employee',
                'update an employee role'
            ]
        }
    ])
        .then((answers) => {
            let choices = answers;

            if (choices === 'view all departments') {
                viewAllDept();
            }

        })
};


promptUser();

app.listen(PORT, () => { });