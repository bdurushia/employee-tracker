const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysqlpwd',
  database: 'employee_tracker_db'
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('MySql Connected as ID' + db.threadId);
  // introPrompt();
});

function introPrompt() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What do you want to do? Select an option below: ',
      choices: [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add a Department',
        'Add a Role',
        'Add an Employee',
        'Update an Employee Role'
      ]
    }
  ])
  .then(function(answer) {
    switch (answer) {
      case 'View All Departments':
        viewAllDepartments();
        break;

      case 'View All Roles':
        viewAllRoles();
        break;

      case 'View All Employees':
        viewAllEmployees();
        break;

      case 'Add a Department':
        addDepartment();
        break;

      case 'Add a Role':
        addRole();
        break;

      case 'Add an Employee':
        addEmployee();
        break;

      case 'Update am Employee Role':
        updateEmployeeRole();
        break;

      case 'End Program':
        db.end();
        break;
    }
  });
}

function viewAllDepartments() {
  console.log('Departments');
}


function viewAllRoles() {
  console.log("Roles");
}


function viewAllEmployees() {
  console.log('Employees');
}


function addDepartment() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Type the name of the department you would like to add:'
    }
  ]).then(answer => {
      let query = db.query('INSERT INTO department SET ? ',
      {
        name: answer.name
      },
      function(err, answer) {
        if (err) throw err;
        
        console.table(answer);
        introPrompt();
      }
      )
  })
}


function addRole() {

}


function addEmployee() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'Enter their first name:'
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'Enter thier last name:'
    },
    {
      
    }
  ])
}


function updateEmployeeRole() {

}

