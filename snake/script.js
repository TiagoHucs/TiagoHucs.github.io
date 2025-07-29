var snake;
var snack;

var KEY_UP = 38;
var KEY_DOWN = 40;
var KEY_LEFT = 37;
var KEY_RIGHT = 39;
var KEY_SPACE = 32;

var GAME_AREA = [480,280];

var TAM = 10;
var TICK = 50;


class Square {

    constructor(width, height, color, x, y){
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

class Snake {
    
    constructor(width, height, color, x, y){
        this.squares = [new Square(width, height, color, x, y)];
        this.width = width;
        this.height = height;
        this.color = color;
        this.speedX = 0;
        this.speedY = 0;
        this.growing = false;
    }

    setSpeed = function(x, y){
        this.speedX = x;
        this.speedY = y;
    }

    feed = function(){
        this.growing = true;
    }

    move = function () {
        let lastX;
        let lastY;
        let actualX;
        let actualY;
        this.squares.forEach(square => {
            if(!lastX){
                lastX = square.x;
                lastY = square.y;
                square.x += this.speedX;
                square.y += this.speedY;
            } else {
                actualX = square.x;
                actualY = square.y;
                square.x = lastX;
                square.y = lastY;
                lastX = actualX;
                lastY = actualY;
            }
            
        });
        if(this.growing){
            this.squares.push(new Square(TAM,TAM,'white',lastX,lastY));
            this.growing = false;
        }
	}

	paint = function () {
        this.squares.forEach(square => {
            square.paint();
        });
	}
}

function startGame() {
	restartPosicoes();
	myGameArea.start();
}

function restartPosicoes(){
	snake = new Snake(TAM, TAM, "white", 60, 20);
	createSnack();
}

var myGameArea = {
	canvas: document.getElementById("canvas"),
	start: function () {
		canvas.width = GAME_AREA[0];
		canvas.height = GAME_AREA[1];
		this.context = canvas.getContext("2d");
		this.interval = setInterval(updateGameArea, TICK);
	},
	clear: function () {
		this.context.clearRect(0, 0, canvas.width, canvas.height);
	}
}

function updateGameArea() {
	myGameArea.clear();
    snake.move();
	snake.paint();
    snack.paint();
    if(checkColision(snake.squares[0],snack)){
        createSnack();
        snake.feed();
    }
    
	document.getElementById('score').innerHTML = snake.squares.length -1;
    checkGameOver();
	
}

function checkColision(pedraA, pedraB) {
	if (pedraA.x == pedraB.x && pedraA.y == pedraB.y) {
		return true;
	}
	return false;
}

function createSnack() {
	var x = getRndInteger(0,GAME_AREA[0]-TAM);
	var y = getRndInteger(0,GAME_AREA[1]-TAM);
	snack = new Square(TAM,TAM,"red",x,y);
}

function checkGameOver(){
    let sx = snake.squares[0].x;
    let sy = snake.squares[0].y;    
    if(sx < 0 || sy < 0 || sx >= GAME_AREA[0] || sy >= GAME_AREA[1]){
        alert("GAME OVER");
        restartPosicoes();
    }
}

function getRndInteger(min, max) {
	return Math.floor(Math.random() * ((max - min) / TAM)) * TAM + min;
}

window.addEventListener('keydown', this.controla, false);

function controla(e) {
	if (e.keyCode == KEY_UP) {
		snake.setSpeed(0,-TAM);
	} else if (e.keyCode == KEY_DOWN) {
        snake.setSpeed(0,TAM);
	} else if (e.keyCode == KEY_LEFT) {
		snake.setSpeed(-TAM, 0);
	} else if (e.keyCode == KEY_RIGHT) {
        snake.setSpeed(TAM, 0);
	} else if (e.keyCode == KEY_SPACE){
		snake.feed();
	}
}
