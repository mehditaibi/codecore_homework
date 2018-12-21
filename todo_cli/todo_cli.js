const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const listOfTasks = [];

let welcomeMessage = '\nWelcome to Todo CLI!\n--------------------\n(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit\n>';

rl.question(`${welcomeMessage}`, handleUserAnswer);

function handleUserAnswer(answer) {

    if (answer == 'v') {
        printTask(listOfTasks);
    } else if (answer == 'n') {
        rl.question("What?\n>", answer => {
            newTask(answer)
        });
    } else if (answer[0] == 'c') {
        completedTask(answer);
    } else if (answer[0] == 'd') {
        deleteTask(answer);
    } else if (answer == 'q') {
        console.log('See you soon! 😄');
        rl.close();
    } else {
        rl.question("Please pick an option\n>", answer => {
            handleUserAnswer(answer)
        })
    };

    function printTask(listOfTasks) {
        let string = '';

        if (listOfTasks[0] == undefined) {
            console.log(`Todo list is empty..`)
        } else {
            const uncheckedBox = '[ ]',
                checkedBox = '[✓]';

            for (let index = 0; index < listOfTasks.length; index++) {
                let eachCase = listOfTasks[index];
                eachTask = eachCase[1],
                    isItDone = eachCase[0];

                if (isItDone == true) {
                    string += `${index} ${checkedBox} ${eachTask}\n`;
                } else {
                    string += `${index} ${uncheckedBox} ${eachTask}\n`;
                }
            }
            console.log(string);
        }
        rl.question(`${welcomeMessage}`, handleUserAnswer);
    };

    function newTask(answer) {
        listOfTasks.push([false, answer]);
        rl.question(`${welcomeMessage}`, handleUserAnswer);
    };

    function completedTask(answer) {
        if (typeof answer[1] != 'number') {
            console.log("Please pick the index of the todo list item you wish to mark as completed..")
            return rl.question(`${welcomeMessage}`, handleUserAnswer);
        } 
        if (listOfTasks[0] == undefined) {
            console.log("Todo list is empty..");
        } else {
            let index = answer.slice(1);
            let eachTask = listOfTasks[index];

            if (listOfTasks[0] !== undefined) {
                eachTask[0] = true;
            }
            console.log(`\nCompleted  "${eachTask[1]}"\n`);
        }
        rl.question(`${welcomeMessage}`, handleUserAnswer);
    };

    function deleteTask(answer) {
        if (typeof answer[1] != 'number') {
            console.log("Please pick the index of the todo list item you wish to delete..")
            return rl.question(`${welcomeMessage}`, handleUserAnswer);
        } 
        if (listOfTasks[0] == undefined) {
            console.log("Todo list is empty..");
            rl.question(`${welcomeMessage}`, handleUserAnswer);

        } else {
            let index = answer.slice(1);
            let task = listOfTasks[index][1];
            listOfTasks.splice(index, 1);
            console.log(`\nDeleted  "${task}"\n`);
        }
        rl.question(`${welcomeMessage}`, handleUserAnswer);
    };

};