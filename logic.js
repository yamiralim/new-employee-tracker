const inquirer = require("inquirer")
const mysql = require("mysql");
const cTable = require('console.table');

// Create connection to MySQL database
const connection = mysql.createConnection({
    host: 'localhost',
    // port: 3306,
    user: 'root',
    password: '1130',
    database: 'emp_tracker_db',
  });
  
  // Connect to database
  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to database as id ' + connection.threadId);
    startApp();
  });



// Function to start the application
function startApp() {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View all departments':
          viewDepartments();
          break;

        case 'View all roles':
          viewRoles();
          break;

        case 'View all employees':
          viewEmployees();
          break;

        case 'Add a department':
          addDepartment();
          break;

        case 'Add a role':
          addRole();
          break;

        case 'Add an employee':
          addEmployee();
          break;

        case 'Update an employee role':
          updateEmployeeRole();
          break;

        case 'Exit':
          connection.end();
          break;
      }
    });
}

// Function to view all departments
function viewDepartments() {
  const query = 'SELECT * FROM departments';
  connection.query(query, (err, data) => {
    if (err) throw err;
    console.table(data);
    startApp();
  });
}

// Function to view all roles
function viewRoles() {
  const query = 'SELECT * FROM roles';
  connection.query(query, (err, data) => {
    if (err) throw err;
    console.table(data);
    startApp();
  });
}

// Function to view all employees
function viewEmployees() {
  const query = 'SELECT * FROM employees';
  connection.query(query, (err, data) => {
    if (err) throw err;
    console.table(data);
    startApp();
  });
}

// Function to add a department
function addDepartment() {
  inquirer
    .prompt({
      name: 'name',
      type: 'input',
      message: 'What is the name of the department?',
    })
    .then((answer) => {
      const query = 'INSERT INTO departments SET ?';
      connection.query(query, { name: answer.name }, (err, res) => {
        if (err) throw err;
        console.log(`Added department: ${answer.name}`);
        startApp();
      });
    });
}

// Function to add a role
function addRole() {
  const query = 'SELECT * FROM departments'
  connection.query(query, (err, res) => {
    if (err) throw err;
    inquirer
    .prompt([
    {
    name: 'title',
    type: 'input',
    message: 'What is the title of the role?',
    },
    {
    name: 'salary',
    type: 'input',
    message: 'What is the salary of the role?',
    },
    {
    name: 'department',
    type: 'list',
    message: 'Which department does the role belong to?',
    choices: res.map((department) => department.name),
    },
    ])
    .then((answer) => {
    const department = res.find(
    (department) => department.name === answer.department
    );
    const query = 'INSERT INTO roles SET ?';
    connection.query(
    query,
    {
    title: answer.title,
    salary: answer.salary,
    department_id: department.id,
    },
    (err, res) => {
    if (err) throw err;
    console.log(`Added role: ${answer.title}`);
    startApp();
    }
    );
    });
    });
    }
    
    // Function to add an employee
    function addEmployee() {
    const query = "SELECT employees.id, CONCAT(emp.first_name, ' ', employees.last_name) AS name FROM employees" ;
    connection.query(query, (err, res) => {
    if (err) throw err;
    inquirer
    .prompt([
    {
    name: 'firstName',
    type: 'input',
    message: 'What is the employee first name?',
    },
    {
    name: 'lastName',
    type: 'input',
    message: 'What is the employee last name?',
    },
    {
    name: 'role',
    type: 'list',
    message: 'What is the employee role?',
    choices: getRoleChoices(),
    },
    ])
    .then((answer) => {
    const roles = getRoleId(answer.role);
    const query = 'INSERT INTO employees SET ?';
    connection.query(
    query,
    {
    first_name: answer.firstName,
    last_name: answer.lastName,
    role_id: answer.rolesId,
    manager_id: manager,
    },
    (err, res) => {
    if (err) throw err;
    console.log(`Added employees: ${answer.firstName} ${answer.lastName}`);
    startApp();
    }
    );
    });
    });
    }
    
    // Function to update an employee role
    function updateEmployeeRole() {
    const query = " SELECT employees.id, CONCAT(employees.first_name, ' ', employees.last_name) AS name FROM employees" ;
    connection.query(query, (err, res) => {
    if (err) throw err;
    inquirer
    .prompt([
    {
    name: 'employee',
    type: 'list',
    message: 'Which employee do you want to update?',
    choices: getEmployeeChoices(res),
    },
    {
    name: 'role',
    type: 'list',
    message: 'What is the employee new role?',
    choices: getRoleChoices(),
    },
    ])
    .then((answer) => {
    const employee = getEmployeeId(answer.employee, res);
    const role = getRoleId(answer.role);
    const query = 'UPDATE employees SET role_id = ? WHERE id = ?';
    connection.query(query, [role, employee], (err, res) => {
if (err) throw err;
console.log(`Updated employee role`);
startApp();
});
});
});
}