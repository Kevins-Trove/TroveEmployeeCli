const connection = require("../config/connection");

connection.connect(); 

class DB {
    
  
    // Create a new employee
  async show(tableName) {
    console.log(1);
    try{
      const t = connection.promise().query(
        "SELECT * FROM DEPARTMENT"  ).then(([rows])  => {console.table(rows)}
        );


      const [rows, fields] = await connection.execute('SELECT * FROM DEPARTMENT;');
      connection.rows
      console.log(2);
      console.log(rows);
      console.log(4);
    } catch (error){
      console.error('Error executing query:', error);
  } finally {
    // Close the connection
    await connection.end();
  }
  console.log(4);
}
    

  
}  

module.exports = new DB(connection);