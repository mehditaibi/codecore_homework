#!/usr/bin/env node

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

         let spaceCount = maxLength - string.length;
         return leftBar + string + space.repeat(spaceCount) + rightBar;
     };
 
     if (array.length === 0 || array === undefined ) {
        return drawTopBorder(maxLength) +  drawBottomBorder(maxLength);
     };
 
     let numberOfString = array.length;
     var maxLength = 0;
     for (let i = 0 ; i < array.length ; i++) {
         if (array[i].length > maxLength) {
             maxLength = array[i].length
         }
     };
      
     let sentence = '';

     for (let j = 0 ; j < numberOfString ; j++) {
       let middleCount = (j == numberOfString - 1) ? 0: 1;
       let bottomCount = (j == numberOfString -1) ? 1: 0;
       let topCount = (j == 0) ? 1 : 0;
             
         sentence += drawTopBorder(maxLength).repeat(topCount) + drawBarsAround(array[j]) + 
         drawMiddleBorder(maxLength).repeat(middleCount) + drawBottomBorder(maxLength).repeat(bottomCount);
        };
    return sentence;
    
 };

 let words = process.argv.slice(2);
 console.log(boxIt(words));

