
class Turtle {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.coordinates = [];
        this.coordinates.push([this.x, this.y]);
        this.orientation = 'East';
    };

    forward(num){
        for (let i = 1 ; i <= num ; i ++){
          (this.orientation === 'East') ? this.x += 1:
          (this.orientation === 'South') ? this.y += 1:
          (this.orientation === 'West') ? this.x -= 1:
          (this.orientation === 'North') ? this.y -= 1:
          'This frog doesn\'t have any orientation';

          this.coordinates.push([this.x, this.y]);
        };
        return this;
    };

    right(){
        switch(this.orientation){
            case 'North':
            this.orientation = 'East';
            break;
            case 'East':
            this.orientation = 'South';
            break;
            case 'South':
            this.orientation = 'West';
            break;
            case 'West':
            this.orientation = 'North';
        };
        return this;
    };

    left(){
        switch(this.orientation){
            case 'North':
            this.orientation = 'West';
            break;
            case 'West':
            this.orientation = 'South';
            break;
            case 'South':
            this.orientation = 'East';
            break;
            case 'East':
            this.orientation = 'North';
        };
        return this;
    };

    allPoints(){ 
        return this.coordinates;
    };

    print(){
        let coordinates = this.coordinates;
       
        function getMaxY(){
            let maxY = 0;
            for (let index = 0; index < coordinates.length; index++) {
                let innerArrayIndex = coordinates[index]
                if(maxY < innerArrayIndex[1]) maxY = innerArrayIndex[1];
            };
            return maxY;
        };
        
        function getMaxX(){
            let maxX = 0; 
            for (let index = 0; index < coordinates.length; index++) {
                let innerArrayIndex = coordinates[index]
                if(maxX < innerArrayIndex[0]) maxX = innerArrayIndex[0];
            };
            return maxX;
        };
        
        function buildMap(){
            let map = [];
            let maxY = getMaxY();
            let maxX = getMaxX();
            for ( let y = 0 ; y <= maxY ; y++){
                for (let x = 0 ; x <= maxX ;  x++){
                    map.push([x, y]);
                };
            };
            return map;
        };

        function printMap(){
            let turtleSteps = coordinates;
            let mapAsString = '';
            let currentRow = 0;
            let map = buildMap();

            for (let mapPointIndex = 0; mapPointIndex < map.length; mapPointIndex++) {
            let mapPoint = map[mapPointIndex],
                mapPointX = mapPoint[0],
                mapPointY = mapPoint[1],
                turtleSteppedHere = false; 
                
                for ( let turtleStepIndex = 0; turtleStepIndex < turtleSteps.length;turtleStepIndex++){
                    let turtleStep = turtleSteps[turtleStepIndex], 
                    turtleStepX = turtleStep[0],
                    turtleStepY = turtleStep[1];
                    if(mapPointX == turtleStepX && mapPointY == turtleStepY) turtleSteppedHere = true; 
                };

                let newLineNeeded = map[mapPointIndex][1] !== currentRow;

                if (newLineNeeded) {
                mapAsString += turtleSteppedHere ? "\n•": "\n ";
                currentRow += 1;
                } else {
                mapAsString += turtleSteppedHere ? "•" : " ";
                };
            };
            console.log(mapAsString);
            };
            printMap();
        };
};


