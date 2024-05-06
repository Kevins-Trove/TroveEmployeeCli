const connection = require("./connection");
const display = require("../lib/displayClass");

class DB {
 

  // Functions

 

  viewTable = function(name){
    connection.promise().query("SELECT * FROM " + name)
      .then( ([rows,fields]) => {
        display.renderTableHeader("Roles", fields);
        display.renderTableFields(rows);
        display.renderTableFooter();
          
      })
      .catch(console.log)
      .then( () => console.log("\n"));
  }

 
}




module.exports = new DB(connection);