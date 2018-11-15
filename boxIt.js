#!/usr/bin/env node
/*
drawLine Function
Write a drawLine function that takes a number as an argument that returns that number of horizontal bars (i.e. ━) as a string.

Example usage:

drawLine(4) // returns '━━━━'
drawLine(8) // returns '━━━━━━━━'
*/

// let number = process.arg[2];

// function drawLine (number) {
//     let bar = '━';
//     return bar.repeat(number);
// };

/*
drawTopBorder, drawMiddleBorder and drawBottomBorder Functions
Write three functions: drawTopBorder, drawMiddleBorder and drawBottomBorder. Each function should take a number, 
return a line of length including corner pieces. You can make use of drawLine to implement these functions.

Example usage:

drawTopBorder(4) // returns '┏━━━━┓'
drawTopBorder(0) // returns '┏┓'

drawMiddleBorder(8) // returns '┣━━━━━━━━━┫'
drawMiddleBorder(0) // returns '┣┫'

drawBottomBorder(2) // returns '┗━━┛'
*/

// let number = process.argv[2];
 
// function drawTopBorder (number) {
//     let leftCorner = '┏';
//     let rightCorner = '┓';
//     let middleBar = '━';
//     return leftCorner + middleBar.repeat(number) + rightCorner;
// }

// drawTopBorder(number);

// let number = process.argv[2];

// function drawMiddleBorder (number) {
//     let leftStraightBar = '┣';
//     let rightStraightBar = '┫';
//     let middleBar = '━';
//     return leftStraightBar + middleBar.repeat(number) + rightStraightBar;
// };

// drawMiddleBorder(number);

// let number = process.argv[2];

// function drawBottomBorder (number) {
//     let leftCorner = '┗';
//     let rightCorner = '┛';
//     let middleBar = '━'; 
    
//     return leftCorner + middleBar.repeat(number) + rightCorner;
// };

// drawBottomBorder(number);

/*
drawBarsAround Function
Write a drawBarsAround function that takes a string, surrounds it with vertical lines then returns it.

Example usage:

drawBarsAround("My name is Dan") // returns "┃My name is Dan┃"
drawBarsAround("You are Jane  ") // returns "┃You are Jane  ┃"
drawBarsAround("  You are Bill") // returns "┃  You are Bill┃"
*/

// let string = process.argv[2];

// function drawBarsAround (string) {
//     let bar = '┃';

//     return bar + string + bar;
// }

// drawBarsAround(string);

/*boxIt Function
Write a boxIt function that takes an array of strings and returns a string where each is in a single column table. 
To add "new lines" to a string, use the \n special character. In a string, \n characters 
will display as new lines when logged with console.log(...).

Try using the functions you've built previously (e.g. drawBottomBorder, drawBottomBorder, etc) to help you implement this function.

Example usage:

boxIt(['Jon Snow', 'Cersei Lannister'])
// returns...
// '┏━━━━━━━━━━━━━━━━┓\n┃Jon Snow        ┃\n┣━━━━━━━━━━━━━━━━┫\n┃Cersei Lannister┃\n┗━━━━━━━━━━━━━━━━┛'

// When logged, the '\n' appear as new lines...
console.log(boxIt(['Jon Snow', 'Cersei Lannister']))

┏━━━━━━━━━━━━━━━━┓
┃Jon Snow        ┃
┣━━━━━━━━━━━━━━━━┫
┃Cersei Lannister┃
┗━━━━━━━━━━━━━━━━┛

boxIt(['Jon Snow']) // returns '┏━━━━━━━━┓\n┃Jon Snow┃\n┗━━━━━━━━┛'

// when logged, appears as...
console.log(boxIt(['Jon Snow']))

┏━━━━━━━━┓
┃Jon Snow┃
┗━━━━━━━━┛

$ node boxit.js // returns '┏┓\n┗┛'

*/

function boxIt (array) {

    function drawTopBorder (number) {
        let leftCorner = '┏';
        let rightCorner = '┓';
        let middleBar = '━';
        return leftCorner + middleBar.repeat(number) + rightCorner;
    }
 
    function drawMiddleBorder (number) {
        let leftStraightBar = '\n┣';
        let rightStraightBar = '┫';
        let middleBar = '━';
        return leftStraightBar + middleBar.repeat(number) + rightStraightBar;
    };
 
    function drawBottomBorder (number) {
        let leftCorner = '\n┗';
        let rightCorner = '┛';
        let middleBar = '━';
 
        return leftCorner + middleBar.repeat(number) + rightCorner;
    };
 
    function drawBarsAround (string) {
         let leftBar = '\n┃';
         let rightBar = '┃';
         let space = ' ';
         let spaceCount = middleLength - string.length;
         return leftBar + string + space.repeat(spaceCount) + rightBar;
     };
 
     if (array.length === 0 || array === undefined ) {
        return drawTopBorder(middleLength) +  drawBottomBorder(middleLength);
     };
 
     let numberOfString = array.length;
 
     for (let i = 0 ; i < array.length ; i++) {
        var middleLength = Math.max(array[i].length);
     };
 
     let sentence = '';
     for (let j = 0 ; j < numberOfString ; j++) {
       let middleCount = (j == numberOfString - 1) ? 0: 1;
       let bottomCount = (j == numberOfString -1) ? 1: 0;
       let topCount = (j == 0) ? 1 : 0;
             
         sentence += drawTopBorder(middleLength).repeat(topCount) + drawBarsAround(array[j]) + 
         drawMiddleBorder(middleLength).repeat(middleCount) + drawBottomBorder(middleLength).repeat(bottomCount);
        };
    return sentence;
    
 };
 let words = process.argv.slice(2);
 console.log(boxIt(words));


