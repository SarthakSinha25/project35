var balloon,balloonImage1,balloonImage2;
// create database and position variable here

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  var balloonRef = database.ref("/position");
  balloonRef.on("value", readPosition, showError);

  textSize(20); 
}
function readPosition(data){
  position = data.val(); 
 // console.log("Position OK", position);
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("Error!!!");
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    writePosition(-3,0)

  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    writePosition(3,0)

  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    writePosition(0,-3)

  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    writePosition(0,3)

  }
 
  if (keyDown(UP_ARROW)){
    balloon.scale = balloon.scale - 0.002
  }

  if (keyDown(DOWN_ARROW)){
    balloon.scale = balloon.scale + 0.002
  }
  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function writePosition(x,y){
  balloon.x = balloon.x + x;
  balloon.y = balloon.y + y;

  var balloonRef = database.ref("/position")
  balloonRef.set({
      x:balloon.x,
      y:balloon.y
  })
}