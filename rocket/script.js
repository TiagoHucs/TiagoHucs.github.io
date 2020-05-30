
var itens = [];
var liftOff = false;
drawing = new Image();
drawing.src = "rocket.png";

function startGame() {
	itens.push(new rocket(10,70,'red',300,180));
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 50);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function rocket(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;   

    this.move = function() {
		this.x += this.speedX ;
		if(liftOff){
			this.y += this.speedY--; 
		}
    }  
	 
    this.paint = function() {
        myGameArea.context.fillStyle = color;
		//myGameArea.context.fillRect(this.x, this.y, this.width, this.height);
		myGameArea.context.drawImage(drawing,this.x,this.y, 100, 116);

    }
}

function updateGameArea() {
	myGameArea.clear();
	itens.forEach(pinta);
	function pinta(item, index) {
		item.move();
		item.paint();
	} 
}	

window.addEventListener('keydown',this.controla,false);


function controla(e) {

	if(e.keyCode == 32) {
		 liftOff = true;
	}



}

