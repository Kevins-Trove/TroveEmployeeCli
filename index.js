const { prompt } = require("inquirer");
const db = require("./config");
const display = require("./lib/displayClass");
const question = require("./lib/questionClass");
const constants = require('./lib/constantsClass');

main();


// Entry point
async function main() {
  let action = '';
  
    display.renderHeader();
  
    

  while (action !== constants.QUIT) {
    
    if (!question.hasAction() && !question.hasTable() && !question.hasView()){
        action = await question.crudAction();
    }
    console.log(question.currentAction);
    if (question.hasAction() && !question.hasTable() && !question.hasView()){
        action =  await question.table();
    }

    // Prompt for View of data
    if (question.hasAction() && question.hasTable() && !question.hasView()){
        action = await question.view();
    }

    // Process SQL
    if (question.hasAction() && question.hasTable() && question.hasView()){
        //view = await question.view();
        process.exit();
    }

    
  };

  console.log(action, "test-----------------------------------------");
  process.exit();
}

