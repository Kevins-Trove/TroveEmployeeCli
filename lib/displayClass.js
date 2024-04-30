
const YELLOW = '\x1b[33m%s\x1b[0m';
const BLUE = '\x1b[34m%s\x1b[0m';
const RED = '\x1b[31m%s\x1b[0m';

class Display {
   
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
}


module.exports = new Display();