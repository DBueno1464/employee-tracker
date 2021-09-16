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

    let sql = `select role.id, role.title, role.salary, department.name FROM role INNER JOIN department ON role.department_id = department.id`

    db.query(sql, (err, res) => {
        console.table(res);
        promptUser();
    });
};

const viewAllEmps = () => {

    console.log('Assesed viewAllEmps function');

    let sql = `select employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name, employee.manager_id from employee 
    
    INNER JOIN role ON employee.role_id = role.id
    
    INNER JOIN department ON role.department_id = department.id

    ORDER BY employee.id
    `;

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
                console.table(res);
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
            console.log(name, salary, department);

            const sql = `
                INSERT INTO role (title, salary, department_id)
                VALUES
                (?, ?, ?);
                `;

            db.query(sql, [name, salary, department], (err, res) => {
                console.table(res);
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
            type: 'list',
            name: 'role',
            message: "What is your role?",
            choices: [
                `sales person`,
                `acountant`,
                `funny person`
            ]
        },
        {
            type: 'list',
            name: 'manager',
            message: 'and who is your manager?',
            choices: [
                `Venus Willendorf`,
                `Maxxy Tibby`,
                `Amanda Tutor`,
                `I do not have a manager`
            ]
        }
    ])
        .then((answers) => {

            var nameFirst = answers.firstname;
            var nameLast = answers.lastname;
            var role = answers.role;
            let managerID = answers.manager;

            console.log(nameFirst, nameLast, role, managerID);

            switch (managerID) {
                case `Venus Willendorf`:
                    managerID = 1;
                    break;
                case `Maxxy Tibby`:
                    managerID = 2;
                    break;
                case `Amanda Tutor`:
                    managerID = 3;
                    break;
                case `I do not have a manager`:
                    managerID = null;
            }

            switch (role) {
                case `sales person`:
                    role = 1;
                    break;
                case `acountant`:
                    role = 2;
                    break;
                case `funny person`:
                    role = 3;
            }

            console.log(nameFirst, nameLast, role, managerID);

            let sql = `
            INSERT INTO employee ( first_name, last_name, role_id, manager_id )
            VALUES
            (?, ?, ?, ?);
            `;

            db.query(sql, [nameFirst, nameLast, role, managerID], (err, res) => {
                console.table(res); // function where I'll get res to use as a list
          
                promptUser();
            });
        })
        .catch((err) => {
            if (err) {
                console.log(err);
            };
        });
        

};

const updateEmpRole = () => { 
    // select * from employees => take res and 
};


promptUser();

app.listen(PORT, () => { });