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
        returnedRowsFromDb = await db.query(`
        SELECT 
        employee.id,
        employee.first_name,
        employee.last_name,
        role.title AS title,
        department.name AS department,
        role.salary AS salary,
        CASE WGEB employee.manager_id IS NOT NULL THEN CONTACT(manager_table.first_name, ' ', manager_table.last_name) ELSE NULL END AS manager
        FROM employee
        JOIN role ON employee.role_id = role_id
        JOIN department ON role.department_id = department_id
        JOIN employee manager_table ON employee.manager_id = manager_table.id`);
    console.table(returnedOutputFromInq[0]);
    break;
    
//ENTER NAME ; DEPARTMENT ADDED TO DB
    case "Add a Dapartment":
    returnedOutputFromInq = await inquirer.prompt([
        {
            name: 'department',
            message: 'Enter new department name:',
        },
    ]);
    
    try {
        returnedRowsFromDb = await db.query(
            `INSERT INTO department (name) VALUES ('${returnedOutputFromInq.department}');`
        );
    } catch (error) {
        console.log('Cannot insert duplicate department.');
    }

    break; 

//ENTER NAME, SALARY, DEPARTMENT; ROLE ADDED TO DB
case 'Add a Role':
    returnedOutputFromInq = await inquirer.prompt([
        {
            name: 'roleName',
            message: 'Enter new role name:',
        },
        {
            name: 'roleSalary',
            message: 'Enter new role salary:',
        },
        {
            name: 'roleDpt',
            message: 'Enter new role department:',
        },
    ]);   
    
// DESTRUCTURE returnedOutputFromInq
const { roleName, roleSalary, roleDpt } = returnedOutputFromInq;

//MAKE VARIABLE TO STORE VALUE FROM THE DB CELL TO GET DEPARTMENT ID 
const returnDepartmentId = await db.query(
    `SELECT IFNULL((ELECT id FROM department WHERE name = '${roleDpt}), 'Department does not exist')`
);


//WRITE A QUERY TO GET THE DEPARTMENT ID FROM THE NAME 
const [rows] = returnDepartmentId;
const department_id = Object.values(rows[0])[0];

//SEE IF THE ID EXISTS IN THE DB OR NOT AND RETURN 'DEPARTMENT DOES NOT EXIST
if(department_id === 'Department does not exist') {
    console.log('Enter a role in an existing department.');
    break;
};    

// ENTER EMPLOYEE FIRST NAME, LAST NAME, ROLE, MANAGER; employee added to the db

case 'Add an Employee':
    returnedOutputFromInq = await inquirer.prompt([
      { name: "first_name",
        message: "Enter new employee's first name:",
      },
      {
        name: "last_name",
        message: "Enter new employee's last name:",
      },
      {
        name: "role",
        message: "Enter new employee's role:",
      },
      {
        name: "manager",
        message: "Enter new employee's manager:",
      },   
    ]);  

    
}

}
    }
