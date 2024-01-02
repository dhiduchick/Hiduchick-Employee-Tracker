// IMPORTING PACKAGE FILES 
const inquirer = require('inquire');
const mysql = require('mysql2/promise');

//ENCRYPTION FOR ENV FILE
require('dotev').config();

// DOTEV VARIABLES
const dbUser = process.env.DB_USER;
const dbPassword = process.ev.DB_PASSWORD;
const dbName = process.ev.DB_NAME;

//CONNECT TO STAFF DB
async function dbConnection(select) {
    try {
        const db = await mysql.createConnection({
            host:'localhost',
            user: dbUser,
            password: dbPassword,
            database: dbName,
        });

// EMPTY VARIABLES FOR QUERY RETURNS AND PROMPT RESPONSES
let returnedRowsFromDb = [];
let returnedOutputFromInq = [];

//SWITCH FOR ALL USER INOUT CASES
switch (select) {
    case 'View All Departments':
    returnedRowsFromDb = await db.query('SELECT * FROM department');
    console.table(returnedRowsFromDb[0]);
    break;

//ROLE ID, JOB TITLE, DEPARTMENT VALUE, SALARY VALUE
    case "View All Roles":
        returnedRowsFromDb = await db.query(`
            SELECT
                role.id,
                role,title,
                role.salary,
                department.name AS department
            FROM role
            JOIN department ON role.department_id = department.id`);
        console.table(returnedRowsFromDb[0]);
        break;
        
// EMPLOYEE ID, FIRST NAME, LAST NAME, JOB ITLE, DEPARTMENT, SALARY, AND MANAGER 
    case 'View All Employees':        
}
    }
}