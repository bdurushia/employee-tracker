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

function introPrompt() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What do you want to do? Select an option below: ',
      choices: [
        'Add a Department',
        'Add a Role',
        'Add an Employee',
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Update an Employee Role',
        // 'Clear a Table', --> Will utilize this at a later date
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

      case 'Update an Employee Role':
        selectEmployee();
        break;

      case 'Clear a Table':
        clearTable();
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
    SELECT 
    role.id, role.title, role.salary
    FROM role;
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
        
        console.log('Department added to database!');
        introPrompt();
      }
    );
  });
}

function addRole() {
  connection.query(`
    SELECT
    role.id, role.title, role.salary, role.department_id,
    department.id, department.name
    FROM role
    INNER JOIN department
    ON role.department_id = department.id
    ;`,
    (err, res) => {
      if (err) throw err;

      const departmentChoices = res.map(({ department_id, name }) => ({
        name: name,
        value: department_id
      }));

      inquirer.prompt([
        {
          type: 'input',
          name: 'roleName',
          message: 'ENTER the title of the role you would like to add:'
        },
        {
          type: 'input',
          name: 'salaryInput',
          message: 'ENTER the salary of the role:'
        },
        {
          type: 'list',
          name: 'departmentInput',
          message: 'Choose the department they belong to:',
          choices: departmentChoices
        }
      ]).then(answer => {
          connection.query(`INSERT INTO role SET ? `,
            {
              title: answer.roleName,
              salary: answer.salaryInput,
              department_id: answer.departmentInput
            },
            (err, answer) => {
              if (err) throw err;
              
              console.log('Role added to database!');
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
    ON employee.manager_id = Manager.id;
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
          
          console.table('Employee added to database!');
          introPrompt();
        }
      )
    })
  });
}

function selectEmployee() {
  let query = `
    SELECT 
    employee.id,
    CONCAT(Employee.first_name, ' ', Employee.last_name) AS Employee
    FROM employee;
    `;
  connection.query(query, (err, res) => {
    if (err) throw err;

    const employeeChoices = res.map(({ id, Employee }) => ({
      name: Employee,
      value: id
    }));

    inquirer.prompt(
      {
        type: 'list',
        name: 'employeeName',
        message: 'Choose and employee to update their role:',
        choices: employeeChoices
      }
    )
    .then(answer => {
      let EmployeeName = answer.employeeName 
      updateRole(EmployeeName);
    });
  });
}

function updateRole(EmployeeName) {
  let query = `
    SELECT
    role.id, role.title
    FROM role;
    `;
  connection.query(query, (err, res) => {
    if (err) throw err;

    const roleChoices = res.map(({ id, title }) => ({
      name: title,
      value: id
    }));

    inquirer.prompt(
      {
        type: 'list',
        name: 'roleChoice',
        message: 'Choose a role:',
        choices: roleChoices
      }
    )
    .then(answer => {
      let roleChosen = answer.roleChoice;
      let employeeChosen = EmployeeName;
        connection.query(`
          UPDATE employee
          SET employee.role_id = ${roleChosen}
          WHERE employee.id = ${employeeChosen};
          `,
          (err, res) => {
            if (err) throw err;

            console.log('Employee updated!');
            introPrompt();
          }
        );
      }
    );
  });
}

// --------------------------------->>>>>>>>> Clear Function querys to be finish at a later date, currently not necessary for the acceptence criteria
// function clearTable() {
//   inquirer.prompt(
//     {
//       type: 'list',
//       name: 'choice',
//       message: 'Which table would you like to clear?',
//       choices: ['Departments', 'Roles', 'Employees', 'CANCEL CLEAR OPTION']
//     }
//   ).then(({ choice }) => {
//     switch (choice) {
//       case 'Departments':
//         clearDepartments();
//         break;
      
//       case 'Roles':
//         clearRoles();
//         break;
      
//       case 'Employees':
//         clearEmployees();
//         break;
      
//       case 'CANCEL CLEAR OPTION':
//         introPrompt();
//         break;
//     }
//   });
// }

// function clearDepartments(){
//   let query = `TRUNCATE department;`
//   connection.query(query, (err, res) => {
//     if (err) throw err;

//     console.table(res);

//     console.log('Departments table data cleared!');
//     introPrompt();
//   });
// }

// function clearRoles(){
//   let query = `TRUNCATE TABLE role;`
//   connection.query(query, (err, res) => {
//     if (err) throw err;

//     console.table(res);

//     console.log('Roles table data cleared!');
//     introPrompt();
//   });
// }

// function clearEmployees(){
//   let query = `TRUNCATE employee;`
//   connection.query(query, (err, res) => {
//     if (err) throw err;

//     console.table(res);

//     console.log('Employee table data cleared!');
//     introPrompt();
//   });
// }
