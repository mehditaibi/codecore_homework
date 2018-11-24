const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let answers = [];
const listOfTasks = [];
let welcomeMessage = '\nWelcome to Todo CLI!\n--------------------\n(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit\n>'

rl.question( `${welcomeMessage}`, handleUserAnswer);

function handleUserAnswer(answer) {

    function printTask(listOfTasks){
        if(listOfTasks[0] == undefined){
            return `Todo list is empty..`
        }
        let string = '';
        const checkBox = '[ ]',
        checkedBox = '[✓]';
    
        for (let index = 0; index < listOfTasks.length; index++) {
            let eachCase = listOfTasks[index];
            eachTask = eachCase[1],
            isItDone = eachCase[0];
    
            if (isItDone){
                string += `${index} ${checkedBox} ${eachTask}\n`;
            } else {
                string += `${index} ${checkBox} ${eachTask}\n`;
        }
        console.log(string);
        }
    };
    
    function newTask(answer){
        listOfTasks.push([, answer]);
        rl.question( `${welcomeMessage}`, handleUserAnswer);
    };

    function completedTask(answer){
        if(listOfTasks[0] == undefined){
            return `Todo list is empty..`
        }
        let index = answer[1];
        let eachTask = listOfTasks[index]; 

        if(listOfTasks[0] !== undefined){
        eachTask[0] = 'true';
        };

        console.log(`\nCompleted  "${eachTask[1]}"\n`);
    };

    function deleteTask(answer){
        if(listOfTasks[0] == undefined){
            return `Todo list is empty..`
        }
        let index = answer[1];
        let task = listOfTasks[index][1];
        listOfTasks.splice(index, 1);
        console.log(`\nDeleted  "${task}"\n`);
    };

    if(answer == 'v'){
        printTask(listOfTasks);
        rl.question( `${welcomeMessage}`, handleUserAnswer);
    }else if ( answer == 'n'){
        rl.question("What?\n>", answer => {
        newTask(answer)});
    } else if( answer[0] == 'c'){
        completedTask(answer);
        rl.question( `${welcomeMessage}`, handleUserAnswer);
    } else if (answer[0] == 'd'){
        deleteTask(answer);
        rl.question( `${welcomeMessage}`, handleUserAnswer);            
    } else if (answer == 'q'){
        console.log('See you soon! 😄');
        rl.close();
    } else {
        rl.question("Please pick an option\n>", answer => {
            handleUserAnswer(answer)
    });
}
};