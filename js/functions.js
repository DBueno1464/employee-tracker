const cTable = require('console.table');

const viewAllDept = () => {

    console.log('Assesed viewAllDept function');

    let sql = `select * from department`;

    db.query(sql, (err, res) => {
        if (err) {
            throw err;
        } else {
        console.log('Assesed db.query');
        console.table(res);
        promptUser();
        };
    });
};

module.exports = { viewAllDept };