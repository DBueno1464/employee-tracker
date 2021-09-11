const cTable = require('console.table');
const db = require('../config/connection');
const mysql = require('mysql2');

const viewAllDept = () => {

    console.log('Assesed viewAllDept function');

    let sql = `select name from company_db.department`;

    db.query(sql, (err, res) => {
       console.table(res);
    //    promptUser();
    });
};

module.exports = { viewAllDept };