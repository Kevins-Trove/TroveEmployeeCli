const connection = require("../config/connection");

class DB {
    // Keeping a reference to the connection on the class in case we need it later
    constructor(connection) {
      this.connection = connection;
    }
  
    // Create a new employee
  show(tableName) {
    console.log(1111);
    this.connection.promise().query("SELECT * FROM ? ORDER BY id", tableName)
    .then(([rows]) => {
      console.log(2222);
      let table = rows
      console.log( "\n");
      console.table( table);
    }
  );


    
  }

  delete(tableName, id) {
    console.log( this.connection.promise().query("DELETE FROM ? WHERE id = ?", [tableName, id]));
  }
  

}  

module.exports = new DB(connection);