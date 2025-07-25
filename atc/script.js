var planes = [];

var KEY_UP = 38;
var KEY_DOWN = 40;
var KEY_LEFT = 37;
var KEY_RIGHT = 39;
var KEY_SPACE = 32;

var GAME_AREA = [480, 280];

var TAM = 10;

class Square {

    constructor(width, height, color, x, y) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this.y = y;
    }

    paint = function () {
        myGameArea.context.fillStyle = this.color;
        myGameArea.context.fillRect(this.x, this.y, this.width, this.height);
    }
}

function startGame() {
    restartPosicoes();
    myGameArea.start();
}

function restartPosicoes() {
    planes.push(createPlane());
    planes.push(createPlane());
        planes.push(createPlane());
    planes.push(createPlane());
}

var myGameArea = {
    canvas: document.getElementById("canvas"),
    start: function () {
        canvas.width = GAME_AREA[0];
        canvas.height = GAME_AREA[1];
        this.context = canvas.getContext("2d");
        this.interval = setInterval(updateGameArea, 100);
    },
    clear: function () {
        this.context.clearRect(0, 0, canvas.width, canvas.height);
    }
}

function updateGameArea() {
    myGameArea.clear();

    this.planes.forEach(plane => {
        plane.paint()
    });

}

function createPlane() {
    var x = getRndInteger(0, GAME_AREA[0] - TAM);
    var y = getRndInteger(0, GAME_AREA[1] - TAM);
    return new Square(TAM, TAM, "red", x, y);
}


function getRndInteger(min, max) {
    return Math.floor(Math.random() * ((max - min) / TAM)) * TAM + min;
}


