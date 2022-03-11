const express = require('inquirer');
const mysql = require('mysql');

const db = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: 'mysqlpwd',
    database: 'employee_tracker_db'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql Connected as ID' + db.threadId)
});

