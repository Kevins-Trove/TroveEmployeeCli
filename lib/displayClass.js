const constants = require('./constantsClass');


class Display {
    constructor() {
        this.columns = [];
        this.columnsLength = [];
    }

    renderHeader(){
    console.log(constants.YELLOW, '------------------------------------------------------');
    console.log(constants.YELLOW, 'Trove Employee Manaager');
    console.log(constants.YELLOW, '------------------------------------------------------');
    }
    
    renderFooter(){
        console.log(constants.YELLOW, '------------------------------------------------------');
        console.log(constants.YELLOW, 'Thanks for using Trove Employee Manaager');
        console.log(constants.YELLOW, '------------------------------------------------------');
    }

    renderTableHeader(title, headers){
        this.columns = [];
        this.columnsLength = [];
        let out = "";
        
         // Parse column names from array
         headers.map((header) => {
            this.columns.push(header.name);
            if (header.columnLength > 25) {
                this.columnsLength.push(25);
            } else {
                this.columnsLength.push(header.columnLength);
            }
            
        });

        // Format output string
        this.columns.map((col, index) => {
            out += padWithSpaces(col, this.columnsLength[index]);
        })

        // Render header
        console.log(constants.BLUE, padWithDashs(out.length));
        console.log(constants.GREEN, title);
        console.log(constants.BLUE, out);
        console.log(constants.BLUE, padWithDashs(out.length));
    }

    renderTableFields(rows){
        let lines = [];
        

        rows.forEach((row) => {
            // Process each line here
            let line = "";
            let index = -1;
            for (let key in row) {
                if (row.hasOwnProperty(key)) {
                    line += padWithSpaces( row[key] + " ", this.columnsLength[++index  ]);
                }
              }
      
            // Render row 
              console.log(constants.GREEN, line);

          });
    }

    renderTableFooter(){
        let out = "";
        
        // Parse column names from array
        this.columnsLength.forEach((field) => {
            out += padWithSpaces("  ", field) ;
        })

        // format 
        console.log(constants.BLUE, padWithDashs(out.length));
      
    }
}




function padWithSpaces(inputString, length) {
    if (inputString.length >= length) {
      return inputString.substr(0, length); // Truncate if longer than desired length
    } else {
      const spacesToAdd = length - inputString.length;
      //console.log(length , inputString.length);
      const spaces = ' '.repeat(spacesToAdd); // Repeat spaces to fill the remaining length
      return inputString + spaces;
    }
  }

  function padWithDashs(length) {
    const dashes = '-'.repeat(length); // Repeat dashes to fill the remaining length
    return dashes;
  }

module.exports = new Display();