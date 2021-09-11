const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table');

// const { viewAllDept } = require('./js/functions');

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
            let choices = answers.options;
            switch (choices) {
                case 'view all departments':
                    viewAllDept();
                    break;

                case 'view all roles':
                    viewAllRoles();
                    break;

                case 'view all employees':
                    viewAllEmps();
                    break;

                case 'add a department':
                    addDept();
                    break;

                case 'add a role':
                    addRole();
                    break;

                case 'add an employee':
                    addEmp();
                    break;

                case 'update an employee role':
                    updateEmpRole();
                    break;
            }

            console.log(answers);

        })
        .catch((err) => {
            if (err) {
                console.log(err);
            };
        })
};

const viewAllDept = () => {

    console.log('Assesed viewAllDept function');

    let sql = `select * from department`;

    db.query(sql, (err, res) => {
        console.table(res);
        promptUser();
    });
};

const viewAllRoles = () => {

    console.log('Assesed viewAllRoles function');

    let sql = `select * from role`;

    db.query(sql, (err, res) => {
        console.table(res);
        promptUser();
    });
};

const viewAllEmps = () => {

    console.log('Assesed viewAllEmps function');

    let sql = `select * from employee`;

    db.query(sql, (err, res) => {
        console.table(res);
        promptUser();
    });
};

const addDept = () => {

    console.log('Assesed addDept function');

    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department you wish to add?'
        }
    ])
        .then((answers) => {

            let name = answers.name;

            let sql = `
                INSERT INTO department ( name )
                VALUES
                (?);
                `;

            db.query(sql, name, (err, res) => {

                promptUser();
            });
        })
        .catch((err) => {
            if (err) {
                console.log(err);
            };
        })
};

const addRole = () => {


    console.log('Assesed addRole function');


    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the role you wish to add?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the total salary of this role?'
        },
        {
            type: 'list',
            name: 'department',
            message: 'Which department is this role a part of?',
            choices: [
                `sales`,
                `finance`,
                `entertainment`
            ]
        }
    ])
        .then((answers) => {

            var name = answers.name;
            var name = String(name);
            let salary = Number(answers.salary);
            var department = answers.department;
            let randID = Math.floor(Math.random()*10) + 10;

            switch (department) {
                case `sales`:
                    department = 1;
                    break;
                case `finance`:
                    department = 2;
                    break;
                case `entertainment`:
                    department = 3;
                    break;            
            }
            console.log(name,salary,department);

            let sqlEntry = `${randID}, '${name}', ${salary}, ${department}`;

            console.log(sqlEntry);

            let sql = `
                INSERT INTO role
                VALUES
                (${sqlEntry});
                `;

            db.query(sql, (err, res) => {

                promptUser();
            });
        })
        .catch((err) => {
            if (err) {
                console.log(err);
            };
        })
};

const addEmp = () => { 
    

    console.log('Assesed addEmp function');


    inquirer.prompt([
        {
            type: 'input',
            name: 'firstname',
            message: "What is the employee's first name?"
        },
        {
            type: 'input',
            name: 'lastname',
            message: "What is the employee's last name?"
        },
        {
            type: 'input',
            name: 'role',
            message: "What is their role?"
        },
        {
            type: 'input',
            name: 'manager',
            message: "What is the employee's manager?"
        }
    ])
        .then((answers) => {

            let randID = Math.floor(Math.random()*10) + 10;
            var nameFirst = answers.firstname;
            var nameLast = answers.lastname;
            var role = answers.role;
            let managerID = Number(answers.manager);
            
            console.log(randID, nameFirst, nameLast, role, managerID);

            // switch (department) {
            //     case `sales`:
            //         department = 1;
            //         break;
            //     case `finance`:
            //         department = 2;
            //         break;
            //     case `entertainment`:
            //         department = 3;
            //         break;            
            // }
            // console.log(name,salary,department);

            

            

            

            // db.query(sql, (err, res) => {

            //     promptUser();
            // });
        })
        .catch((err) => {
            if (err) {
                console.log(err);
            };
        });

};

const updateEmpRole = () => { };


promptUser();

app.listen(PORT, () => { });