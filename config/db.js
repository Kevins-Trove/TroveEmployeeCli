const connection = require("./connection");
const display = require("../lib/displayClass");
const constants = require('../lib/constantsClass');

class DB {
 

  // Functions
  viewTable = function(name){
    let sql = '';
    // give exception for different tables

    if (name == constants.EMPLOYEE ){
      sql = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.last_name , ', ', manager.first_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;";
    } else if (name == constants.ROLE) {
     sql = "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;";
    } else  {
     sql = "SELECT * FROM department;";
    } 
    
    connection.promise().query(sql)
      .then( ([rows,fields]) => {
        display.renderTableHeader(name, fields);
        display.renderTableFields(rows);
        display.renderTableFooter();
          
      })
      .catch((err) => console.log(err))
      .then( () => console.log("\n"));
  }

  viewDepartmentBudgets = function(name){
    connection.promise().query("SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;")
      .then( ([rows,fields]) => {
        display.renderTableHeader(name, fields);
        display.renderTableFields(rows);
        display.renderTableFooter();
          
      })
      .catch((err) => console.log(err))
      .then( () => console.log("\n"));
  }
 
  employeesByDepartment = function(name){
    connection.promise().query("SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id ;")
      .then( ([rows,fields]) => {
        display.renderTableHeader(name, fields);
        display.renderTableFields(rows);
        display.renderTableFooter();
          
      })
      .catch((err) => console.log(err))
      .then( () => console.log("\n"));
  }

  employeesByManager = function(name){
    connection.promise().query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, CONCAT(manager.last_name , ', ', manager.first_name ) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id ORDER BY manager;")
    .then( ([rows,fields]) => {
      display.renderTableHeader(name, fields);
      display.renderTableFields(rows);
      display.renderTableFooter();
        
    })
    .catch((err) => console.log(err))
    .then( () => console.log("\n"));
  }

   // Find all roles, join with departments to display the department name
   getDepartments() {
    const result =  connection.promise().query(
      "SELECT department.id, department.name FROM department;"
    ).then( ([rows, fields]) => {

      let roles = rows;
      const roleChoices = roles.map(({ id, name }) => ({
        name: `${id} - ${name}`,
        value: `${id}`
    }));
      return roleChoices;
        
    })
    .catch((err) => console.log(err))
    .then( (choices) => choices);
    
    return result;
  }
   
    // Find all managers
    getManagers() {
      const result =  connection.promise().query(
        "SELECT employee.id, employee.first_name, employee.last_name FROM employee;"
      ).then( ([rows, fields]) => {

        let roles = rows;
        const choices = roles.map(({ id, last_name, first_name }) => ({
          name: `${id} - ${last_name}, ${first_name}`,
          value: `${id}`
        }));
        return choices;
          
      })
      .catch((err) => console.log(err))
      .then( (choices) => choices);
      
      return result;
    }
  
  
    // Find all roles, join with departments to display the department name
    getRoles() {
      const result =  connection.promise().query(
        "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
      ).then( ([rows, fields]) => {

        let roles = rows;
        const roleChoices = roles.map(({ id, title }) => ({
          name: `${id} - ${title}`,
          value: `${id}`
        }));
        return roleChoices;
          
      })
      .catch((err) => console.log(err))
      .then( (choices) => choices);
      
      return result;
    }
     
    createRole = function(role){
      return connection.promise().query("INSERT INTO role SET ?", role);
    }

    createDepartment = function(department){
      return connection.promise().query("INSERT INTO department SET ?", department);
    }

    createEmployee = function(employee){
      return connection.promise().query("INSERT INTO employee SET ?", employee);
    }

    deleteRole = function(role){
      return connection.promise().query("DELETE FROM role WHERE id = ?", role);
    }

    deleteDepartment = function(department){
      return connection.promise().query("DELETE FROM department WHERE id = ?", department);
    }

    deleteEmployee = function(employee){
      return connection.promise().query("DELETE FROM employee WHERE id = ?", employee);
    }

}



module.exports = new DB(connection);