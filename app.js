const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysqlpwd',
  database: 'employeeTrackerDB'
});

db.connect(err => {
  if (err) throw err;

  console.log('MySql Connected as ID' + db.threadId);
  introPrompt();
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
        'Update an Employee Role',
        'End Program'
      ]
    }
  ])
  .then(function({ choice }) {
    switch (choice) {
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
  db.query('SELECT department.name AS Departments, department.id AS ID FROM `department`',
    function(err, results) {
      if (err) throw err;
      console.table(results);
      introPrompt();
    }
  );
}


function viewAllRoles() {
  db.query('SELECT role.title AS Job_Title, role.id AS Role_ID, department.name AS Department, role.salary AS Salary FROM `department` JOIN `role` ON department.id = role.department_id ORDER BY department.id',
    function(err, results) {
      if (err) throw err;
      console.table(results);
      introPrompt();
    }
  );
}


function viewAllEmployees() {
  console.log('Employees');
}


function addDepartment() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'ENTER the name of the department you would like to add:'
    }
  ]).then(answer => {
      db.query('INSERT INTO department SET ? ',
      {
        name: answer.name
      },
      (err, answer) => {
        if (err) throw err;
        
        console.table(answer);
        introPrompt();
      }
      )
  })
}


function addRole() {
  db.query('SELECT role.title AS Job_Title, role.salary AS Salary FROM `role` ',
    function() {
      inquirer.prompt([
        {
          type: 'input',
          name: 'title',
          message: 'ENTER the title of the role you would like to add:'
        },
        {
          type: 'input',
          name: 'salary',
          message: 'ENTER the salary of the role:'
        }
      ]).then(answer => {
          db.query('INSERT INTO role SET ? ',
            {
              title: answer.title,
              salary: answer.salary
            },
            (err, answer) => {
              if (err) throw err;
              
              console.table(answer);
              introPrompt();
            }
          );
      });
    }
  );
}


function addEmployee() {
  console.log('Adding Employee');
  // inquirer.prompt([
  //   {
  //     type: 'input',
  //     name: 'firstName',
  //     message: 'Enter their first name:'
  //   },
  //   {
  //     type: 'input',
  //     name: 'lastName',
  //     message: 'Enter thier last name:'
  //   },
  //   {
      
  //   }
  // ])
}


function updateEmployeeRole() {
  console.log('Upadting employee role');
}

