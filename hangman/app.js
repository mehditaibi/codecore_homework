const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p",
"q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

const gallowsStep = [
"images/gallows.jpg",
"images/gallows+head.jpg",
"images/gallows+head+torso.jpg",
"images/gallows+head+torso+leg.jpg",
"images/gallows+head+torso+2leg.jpg",
"images/gallows+head+torso+2leg+arm.jpg",
"images/gallows+head+torso+2leg+2arm.jpg"
];

const misteryWords = {
    forensics:"The use of scientific techniques in criminal investigations", 
    flashback:"A transition in a story to an earlier event or scene", 
    alibi:"Proof that someone accused of a crime could not have done it", 
    deduction:"He act of removing a part from the whole", 
    investigation:"An inquiry into unfamiliar or questionable activities"
};

const letterContainer = document.querySelector('.letters-container');
const misteryWordContainer = document.querySelector('.mistery-word-container');
const gallowsContainer = document.querySelector('.gallows-box');
const gallows = document.querySelector(".gallows");

let gallowsStepIndex = 0;

// pick a mistery word
function pickMisteryWord(misteryWords){
    const keys = Object.keys(misteryWords)
    let misteryWord = Object.keys(misteryWords)[Math.floor(Math.random()*Object.keys(misteryWords).length)]
    console.log(misteryWord)
    let clue = misteryWords[misteryWord]
    console.log(clue)
    let clueBox = document.querySelector(".clue");
    clueBox.innerHTML = clue;
    return misteryWord
}

const misteryWord = pickMisteryWord(misteryWords);

// Generate the alphabet blocks
function createAlphabetBlocks(){
    for (let alphabetIndex = 0; alphabetIndex < alphabet.length; alphabetIndex++) {
        let letter = document.createElement("div");
        letter.classList.add('letter');
        letter.innerText = alphabet[alphabetIndex].toUpperCase();
        letterContainer.append(letter);
    }
};

createAlphabetBlocks();

// Generate each 'box' for each letter of the 'mistery word'
function createMisteryWordContainers(){
    for (let misteryWordIndex = 0; misteryWordIndex < misteryWord.length; misteryWordIndex++) {
        let letterBox = document.createElement("div");
        letterBox.classList.add('mistery-word-box');
        misteryWordContainer.append(letterBox)
    }
};

createMisteryWordContainers();

const alphabetLetters = document.querySelectorAll(".letter");
const mysteryBoxes = document.querySelectorAll(".mistery-word-box");

// Gets index of the matching letter 
function getIndexOfLetter(letter){
    let indexOfLetter = [];
    for (let indexOfMysteryLetter = 0; indexOfMysteryLetter < misteryWord.length; indexOfMysteryLetter++) {
        if(letter === misteryWord[indexOfMysteryLetter].toUpperCase()) indexOfLetter.push(indexOfMysteryLetter)
    }
    return indexOfLetter;
};

// Check if the chosen letter is part of the mistery word 
function isItPartOfTheMysteryWord(letter){
    for (let indexOfMysteryLetter = 0; indexOfMysteryLetter < misteryWord.length; indexOfMysteryLetter++) {
        if (letter === misteryWord[indexOfMysteryLetter].toUpperCase()){
            return true
        }
    }
    return false
};

// Add the selected class
function selected(currentLetter){
    currentLetter.classList.add('selected');
};

// Change to next gallows step 
function wrongAnswer(){
    if(gallowsStepIndex < 6){
        gallowsStepIndex += 1;
        gallows.setAttribute("src", gallowsStep[gallowsStepIndex])
    }
}

// display an alert message and reset the game if player lose
function lose(){
    if(gallowsStepIndex === 6){
        alert("Sorry, you lose.. Better luck next time!")
        reset();
    }
}

// check if player won the game 
function checkWin(){
   let misteryBoxes = document.querySelectorAll(".mistery-word-box")
   for (let index = 0; index < misteryBoxes.length; index++) {
       if(misteryBoxes[index].innerHTML.length == 0){
        return false
        }
    }
    return true
}

// display an alert message and reset the game if player wins
function win(){
    alert("You won! Well done!")
    reset();
}

// reset the game by refreshing the page 
function reset(){
    window.location.reload(false); 
}

// find the letter into the virtual keyboard and selects it 
function findAndSelectLetter(letter){
    let keyboard = document.querySelectorAll(".letter");
    keyboard.forEach( l => {
        if(l === letter){
          selected(l);
        }
    })
}

// logic for the virtual keyboard 
alphabetLetters.forEach(node => {
    node.addEventListener("click", event => {
        let currentBox = event.target;
        selected(currentBox);
        let letter = currentBox.innerText
        if (isItPartOfTheMysteryWord(letter)){
            const letterPosition = getIndexOfLetter(letter)
            for (let index = 0; index < letterPosition.length; index++) {
                mysteryBoxes[letterPosition[index]].innerText = letter;
            }
            if (checkWin()) setTimeout(function(){ win() }, 1000);
        } else {
            wrongAnswer();
            setTimeout(function(){ lose() }, 1000);
        };
    });
});

// logic for the physical keyboard 
document.querySelector("body").addEventListener("keydown", event => {
    let letter = String.fromCharCode(event.keyCode);
    findAndSelectLetter(letter);
    if (isItPartOfTheMysteryWord(letter)){
        const letterPosition = getIndexOfLetter(letter)
        for (let index = 0; index < letterPosition.length; index++) {
            mysteryBoxes[letterPosition[index]].innerText = letter;
        }
        if (checkWin()) setTimeout(function(){ win() }, 1000);
    } else {
        wrongAnswer();
        setTimeout(function(){ lose() }, 1000);
    };
})









