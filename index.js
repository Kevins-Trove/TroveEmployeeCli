const { prompt } = require("inquirer");
const display = require("./lib/displayClass");
const question = require("./lib/questionClass");
const constants = require('./lib/constantsClass');
const db = require("./config/db");

  
init();

// Entry point
async function init() {
  let action = '';
  
    // Header
    display.renderHeader();
  
    // Prompt loop
    while (action !== constants.QUIT) {
      processAction();

      await delay(50);

      action = await getPrompt();
    }


  display.renderFooter();
  process.exit();
}

function delay(milliseconds){
  return new Promise(resolve => {
      setTimeout(resolve, milliseconds);
  });
}
async function processAction() {
    
    
       // Determine action to take
       if (question.hasAction() && question.hasTable() && question.hasView()){   
       
    
        
      await db.viewTable(question.currentTable);
      // clear view action
      question.currentView = "";

    }
  
 }
  

async function getPrompt() {
    let action = '';


    // Determine action to take
    if (!question.hasAction() ){
        return await question.crudAction();
    }

    // What table are we working with
    if ( !question.hasTable()){
      return await question.table();
    }

    // Prompt for View of data
    if ( !question.hasView()){
        return await question.view();
    }

    
    return constants.QUIT
 }
  