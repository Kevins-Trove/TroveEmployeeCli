
const display = require("./lib/displayClass");
const question = require("./lib/questionClass");
const constants = require('./lib/constantsClass');
const db = require("./config/db");

  
init();

// Entry point
async function init() {
  let action = '';
  
  // Render header
  display.renderHeader();

  // Prompt loop and view rendering
  while (action !== constants.QUIT) {
    processAction();

    await delay(50);

    action = await getPrompt();
  }

  // Exit footer
  display.renderFooter();
  process.exit();

}

// delay to make prompting work 
function delay(milliseconds){
  return new Promise(resolve => {
      setTimeout(resolve, milliseconds);
  });
}



// render any action we have 
async function processAction() {

    // // View
    // if (question.currentAction == constants.ADD && question.hasTable() ){   
    //   switch (question.currentTable) {
    //     case constants.ROLE:
    //       addRole();
    //       break;
    //     default:

    //     }
    //   }

  // View
  if (question.hasAction() && question.hasTable() && question.hasView()){   
    
    switch (question.currentView) {
      case constants.EMPLOYEE_BY_DEPARTMENT:
        await db.employeesByDepartment(question.currentView);
        break;
      case constants.EMPLOYEE_BY_MANAGER:
        await db.employeesByManager(question.currentView);
        break;
      case constants.BUDGET_BY_DEPARTMENT:
        await db.viewDepartmentBudgets(question.currentView);
        break;
      default:
        await db.viewTable(question.currentTable);
    }

    // clear view action
    question.currentView = "";
  }
 }
  
// Prompt user for CLI inputs
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

    // Add functions
    if (question.currentAction == constants.ADD ){
      switch (question.currentTable){
        case constants.ROLE:
          result = await question.addRole();
          question.currentAction = "";
          return;
          break;
      case constants.DEPARTMENT:
          result = await question.addDepartment();
          question.currentAction = "";
          return;
          break;
      case constants.EMPLOYEE:
          result = await question.addEmployee();
          question.currentAction = "";
          return;
          break;          
      default:

      }
      
    }
    
// Add functions
if (question.currentAction == constants.DELETE ){
  switch (question.currentTable){
    case constants.ROLE:
      result = await question.deleteRole();
      question.currentAction = "";
      return;
      break;
  case constants.DEPARTMENT:
      result = await question.deleteDepartment();
      question.currentAction = "";
      return;
      break;
  case constants.EMPLOYEE:
      result = await question.deleteEmployee();
      question.currentAction = "";
      return;
      break;          
  default:

  }
  
}
    // Prompt for View of data
    if ( !question.hasView()){
        return await question.view();
    }

    
    return ;//constants.QUIT
 }
  
 // Add functions
 async function addRole(){
   return await question.addRole();
}