
class Turtle {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.coordinates = [];
        this.orientation = 'East';
    };

    forward(num){
        (this.orientation === 'East') ? this.x += num:
        (this.orientation === 'South') ? this.y += num:
        (this.orientation === 'West') ? this.x -= num:
        (this.orientation === 'North') ? this.y -= num:
        'This frog doesn\'t know where to go';

        this.coordinates.push([this.x, this.y]);
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
            default:
            this.orientation = 'East'
        }
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
            default:
            this.orientation = 'East'
        }
    };

    allPoints(){ 
        return this.coordinates;
    };
};


let Sonic = new Turtle(0, 0)
  Sonic.forward(5)
  Sonic.right()
  Sonic.forward(5)
  Sonic.right()
  Sonic.forward(5)
  Sonic.right()
  Sonic.forward(5)
  Sonic.allPoints()


