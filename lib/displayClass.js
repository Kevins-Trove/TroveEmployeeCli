
const YELLOW = '\x1b[33m%s\x1b[0m';
const BLUE = '\x1b[34m%s\x1b[0m';
const RED = '\x1b[31m%s\x1b[0m';
const GREEN = '\x1b[32m%s\x1b[0m';

class Display {
    constructor() {
        this.columns = [];
        this.columnsLength = [];
    }

    renderHeader(){
    console.log(YELLOW, '------------------------------------------------------');
    console.log(YELLOW, 'Trove Employee Manaager');
    console.log(YELLOW, '------------------------------------------------------');
    }
    
    renderFooter(){
        console.log(YELLOW, '------------------------------------------------------');
        console.log(YELLOW, 'Thanks for using Trove Employee Manaager');
        console.log(YELLOW, '------------------------------------------------------');
    }

    renderTableHeader(title, headers){
        this.columns = [];
        this.columnsLength = [];
        let out = "";
        
         // Parse column names from array
         headers.map((header) => {
            this.columns.push(header.name);
            if (header.columnLength > 30) {
                this.columnsLength.push(30);
            } else {
                this.columnsLength.push(header.columnLength);
            }
            
        });

        // Format output string
        this.columns.map((col, index) => {
            out += padWithSpaces(col, this.columnsLength[index]);
        })

        // Render header
        console.log(BLUE, padWithDashs(out.length));
        console.log(GREEN, title);
        console.log(BLUE, out);
        console.log(BLUE, padWithDashs(out.length));
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
              console.log(GREEN, line);

          });
    }

    renderTableFooter(){
        let out = "";
        
        // Parse column names from array
        this.columnsLength.forEach((field) => {
            out += padWithSpaces("  ", field) ;
        })

        // format 
        console.log(BLUE, padWithDashs(out.length));
      
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