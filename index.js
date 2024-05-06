const { prompt } = require("inquirer");
//const db = require("./config");
const display = require("./lib/displayClass");
const question = require("./lib/questionClass");
const constants = require('./lib/constantsClass');
//const db = require("./lib/databaseClass");
const db = require("./config/db");

  
main();



// Entry point
async function main() {
  let action = '';
  
    // Header
    display.renderHeader();
  
    // Prompt loop
    while (action !== constants.QUIT) {

        // Determine action to take
        if (!question.hasAction() && !question.hasTable() && !question.hasView()){
            action = await question.crudAction();
        }
        
        // What table are we working with
        if (question.hasAction() && !question.hasTable() && !question.hasView()){
            action =  await question.table();
        }

        // Prompt for View of data
        if (question.hasAction() && question.hasTable() && !question.hasView()){
            await db.viewRoles();
            action = await question.view();
        }

        // Process SQL
        if (question.hasAction() && question.hasTable() && question.hasView()){
            console.log("Process", question.currentAction, question.currentTable, question.currentView);
        
            if (question.currentAction == constants.VIEW){
                db.show(question.currentTable)
            }
            
           
            
        }

        
    
  };

  display.renderFooter();
  process.exit();
}

