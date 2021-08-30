const inquirer = require('inquirer');

inquirer.prompt([
    {
        type: 'list',
        name: 'functions',
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