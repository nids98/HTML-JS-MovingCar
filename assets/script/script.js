var myCarPiece,
    myPedala,
    myPedalb;

function startCar() {
    myCarPiece = new component(40, 40, "assets/images/carimg.png", 225, 460, "image");
    myPedala = new component(30, 30, "assets/images/pedal.png",0,470,  "image");
    myPedalb = new component(30, 30, "assets/images/pedal.png",40,470,  "image");
    myCarArea.start();
}

var myCarArea = {
    canvas : document.createElement("canvas"),
    start : function() {
                this.canvas.width = 480;
                this.canvas.height = 500;
                this.context = this.canvas.getContext("2d");
                document.body.insertBefore(this.canvas, document.body.childNodes[0]);
                 this.frameNo = 0;
                this.interval = setInterval(updateCarArea, 20);
                window.addEventListener('keydown', function (e) {
                    e.preventDefault();
                    myCarArea.keys = (myCarArea.keys || []);
                    myCarArea.keys[e.keyCode] = (e.type == "keydown");
                })
                window.addEventListener('keyup', function (e) {
                    myCarArea.keys[e.keyCode] = (e.type == "keydown");
                })
            },
            stop : function() {
                clearInterval(this.interval);
            },    
            clear : function() {
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            }
        }

function component(width, height, color, x, y, type) {
    this.type = type;
    if(type == "image"){
    	this.image = new Image();
    	this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speed = 0;
    this.angle = 0;
    this.speedY=0;
    this.moveAngle = 0;
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myCarArea.context;
        if (type == "image") {
            ctx.drawImage(this.image, 
            this.x, 
            this.y,
            this.width, this.height);
        }else{
  	        ctx.fillStyle = color;
            ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
        }
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.restore();    
    }

    this.newPos = function() {
        this.angle += this.moveAngle * Math.PI / 180;
        this.x += this.speed * Math.sin(this.angle);
        this.y -= this.speedY * Math.cos(this.angle);
    }
}

function updateCarArea() {
    myCarArea.clear();
    myCarPiece.moveAngle = 0;
    myCarPiece.speed = 0;
    myPedala.newPos();
    myPedala.update();
    myPedalb.newPos();
    myPedalb.update();
    if (myCarArea.keys && myCarArea.keys[65]) {
    	//change the pedal foot
    	myPedala.image.src = "assets/images/press.png";
    	myPedalb.image.src = "assets/images/pedal.png";
    	//acceleration of car
    	myCarPiece.speedY= 3;

    	 }
    if (myCarArea.keys && myCarArea.keys[66]) {
    	//change the pedal foot
    	myPedalb.image.src = "assets/images/press.png";
    	myPedala.image.src = "assets/images/pedal.png";
    	for(var i=5;i>0;i--){
    		//deceleration of car
    		myCarPiece.speedY = i;
    	}
		setTimeout(function() {
			//Stop the car
  			myCarPiece.speedY = 0;
	    }, 1200);
    }
    myCarPiece.newPos();
    myCarPiece.update();
}