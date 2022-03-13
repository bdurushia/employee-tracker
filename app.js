const inquirer = require('inquirer');
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysqlpwd',
  database: 'employeeTrackerDB'
});

connection.connect(err => {
  if (err) throw err;

  console.log('MySql Connected as ID' + connection.threadId);
  introPrompt();
});

class DB {
  constructor(connection) {
    this.connection = connection;
  }
}

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
  .then(({ choice }) => {
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
        connection.end();
        break;
    }
  });
}

function viewAllDepartments() {
  connection.query(`
    SELECT department.name AS Departments, department.id AS ID 
    FROM department;
    `,
    (err, results) => {
      if (err) throw err;
      console.table(results);
      introPrompt();
    }
  );
}


function viewAllRoles() {
  connection.query(`
    SELECT role.title AS Job_Title, role.id AS Role_ID, 
    department.name AS Department, role.salary AS Salary 
    FROM department 
    JOIN role ON department.id = role.department_id 
    ORDER BY department.id;
    `,
    (err, results) => {
      if (err) throw err;
      console.table(results);
      introPrompt();
    }
  );
}


function viewAllEmployees() {
  connection.query(`
    SELECT employee.first_name, employee.last_name, role.title AS Title, 
    role.salary AS Salary, department.name AS Department, 
    CONCAT(Manager.first_name, ' ', Manager.last_name) AS Manager 
    FROM employee 
    INNER JOIN role ON employee.role_id = role.id 
    INNER JOIN department ON role.department_id = department.id
    LEFT JOIN employee Manager ON employee.manager_id = Manager.id;
    `,
    (err, results) => {
      if (err) throw err;
      console.table(results);
      introPrompt();
    }
  );
}


function addDepartment() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'ENTER the name of the department you would like to add:'
    }
  ]).then(answer => {
      connection.query(`INSERT INTO department SET ? `,
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
  connection.query(`SELECT role.title AS Job_Title, role.salary AS Salary 
            FROM role;`,
    () => {
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
          connection.query(`INSERT INTO role SET ? `,
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
  let query = `
    SELECT DISTINCT
    role.id, role.title, employee.role_id, employee.manager_id,
    CONCAT(Manager.first_name, ' ', Manager.last_name) AS Manager
    FROM employee
    INNER JOIN role
    ON employee.role_id = role.id
    INNER JOIN employee Manager
    On employee.manager_id = Manager.id;
    `;
  connection.query(query, (err, res) => {
    if (err) throw err;

    const roleChoices = res.map(({ id, title }) => ({
      name: title,
      value: id
    }));

    const managerChoices = res.map(({ manager_id, Manager }) => ({
      name: Manager,
      value: manager_id
    }));

    console.log(managerChoices);

    inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'Enter their first name:'
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'Enter their last name:'
      },
      {
        type: 'list',
        name: 'roleID',
        message: 'Select their role/job title:',
        choices: roleChoices
      },
      {
        type: 'confirm',
        name: 'chooseManagerConfirm',
        message: 'Do they have a manager?',
        default: true
      },
      {
        type: 'list',
        name: 'managerID',
        message: 'Choose their manager',
        choices: managerChoices,
        when: ({chooseManagerConfirm}) => {
          if (!chooseManagerConfirm) {
            return false;
          } else {
            return true;
          }
        }
      }
    ])
    .then(answer => {
      connection.query(`INSERT INTO employee SET ? `,
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: answer.roleID,
          manager_id: answer.managerID
        },
        (err, answer) => {
          if (err) throw err;
          
          console.table(answer);
          introPrompt();
        }
      )
    })
  });
}


function updateEmployeeRole() {
  console.log('Upadting employee role');
}

