const connection = require("./connection");
const display = require("../lib/displayClass");

class DB {
 

  // Functions
  viewQueryByTable = function(tableName){
    console.log("\n");
    connection.promise().query("SELECT * FROM employee")
      .then( ([rows,fields]) => {
          console.table(rows);
      })
      .catch(console.log)
      .then( () => console.log("\n"));
  }

  viewEmployees = function(){
      console.log("\n");
      connection.promise().query("SELECT * FROM employee")
        .then( ([rows,fields]) => {
            console.table(rows);
        })
        .catch(console.log)
        .then( () => console.log("\n"));
  }

  viewRoles = function(){
    
    
    connection.promise().query("SELECT * FROM role")
      .then( ([rows,fields]) => {
        display.renderTableHeader("Roles", fields);
        display.renderTableFields(rows);
        display.renderTableFooter();
          
      })
      .catch(console.log)
      .then( () => console.log("\n"));
  }

  viewDepartments = function(){
    console.table("\n");
    connection.promise().query("SELECT * FROM Department")
      .then( ([rows,fields]) => {
          console.table(rows);
      })
      .catch(console.log)
      .then( () => console.log("\n"));
      
  }

}




module.exports = new DB(connection);