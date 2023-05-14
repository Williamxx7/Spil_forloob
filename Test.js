// Player billedere er blevet fundet på https://zegley.itch.io/2d-platformermetroidvania-asset-pack
// Jorden er blevet tegnet af os i https://www.pixilart.com/dra
// Ilden er fundet på ........

//--CONTROLLER--//

let attackState = "idle";
let moveStateY = "idle";
let moveStateX = "idle";
let gameState = "parkour";
let distance = 0;
let runseq = 1;
let playerYJump
let playeridley 
let jump = false;
let distshort;
let backgroundsong;
let enemyIdleY 
let enemyimagecount = 1
let playerFightX
let i = 1
let bosestimeX
let bosestimeY


function preload() {
  backgroundsong = loadSound("BackgroundMusic.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noSmooth();
  p1 = new Player(width, height/(719/819));
  ground = new Field(0, height-(height/(719/965)));
  ground2 = new Field(-width, height-(height/(719/965)));
  e1 = new Enemy(width * 2,(height/(719/880)));


  playeridley = height/1.7
  playerYJump = height/1.7
  enemyIdleY = height/1.9

  print(p1.x)
  print(width)

  //backgroundsong.play();

}

function draw() {
  background(220);

if (distance > 25){
  distance = 0
  bosestimeX = -p1.x+200
  bosestimeY = -p1.y+playeridley
  gameState = "boss"
  moveStateX = "idle"
  playerFightX = p1.x
  v1 = new Boss(p1.x + width/1.7,(height))
  s1 = new Shot(p1.x + width/1.55,(height))
  //lol = s1.x 
}

  if (gameState == "parkour") {
    push();
    translate(-p1.x + 200, -p1.y + playerYJump);
    imageMode(CENTER);
    p1.display();
    p1.move(); 
    pop();
    ground.fieldMove();
    ground2.fieldMove();
  
    kollison();
  } else if(gameState == "boss") {

    push()
    translate(bosestimeX, bosestimeY)
    v1.display();
    s1.display();
    fill("green")
    //rect(playerFightX, width/3 , 200, 50)
    //rect(lol + s1.speedX +105, height +45, 45 ,45)

    pop()
    v1.op += 2
    s1.op +=2
    s1.speedX -= 5

    if(s1.speedX + s1.x < playerFightX - random(300, 500)){
      //s1.x = playerFightX
      s1.speedX = 0
    }


    push();
    translate(bosestimeX, bosestimeY + (playerYJump-playeridley));
    imageMode(CENTER);
    p1.display();
    p1.move();
    //rect(p1.x, p1.y + playeridley -(height/(23+29/30))+(playerYJump -p1.y), 100,100)
    //rect(lol + s1.speedX +105, height +45, 45 ,45)
    pop();


  } else if (gameState == "dead"){
    push();
    translate(-p1.x + 200, -p1.y + playerYJump);
    imageMode(CENTER);
    p1.display();

    fill("red")
    textSize(height/14)
    textAlign(CENTER)
    text("GAME OVER", p1.x +30, p1.y-(height/14))

    pop();

  }



  if(gameState == "dead" || gameState == "parkour"){
  push();
  translate(-p1.x + 200, -p1.y + enemyIdleY);
  text("Use W to jump \nUsw D to move forward", p1.x/1.13, height/1.3)
  e1.display();
  pop();

  text("Distance: " + Math.round(distance), 50, 50);

}


ground.display();
ground2.display();

}

class Field {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    //this.x2 = x2;
    //this.y2 = y2;
    this.image = loadImage("Ground.png");
  }

  display() {
    image(this.image, this.x, this.y, width + (width *0.05), height * 1.6);
  }
  fieldMove() {
    if (moveStateX == "right") {
      this.x -= width/85;

      if (this.x <= -width) {
        this.x = width;
      }
    } /*
    if (moveState == "left") {
      this.x += 10;

      if (this.x >= width) {
        this.x = -width;
      }
    }
  */
  }
}

// Brug array i constructor load alle billeder fÃ¸r i arrayet.

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velocity = 0;
    this.gravity = height/2396.6;
    this.op = -height/65;
    this.images = {
      idle: loadImage("CharacterIdle.png"),
      run1: loadImage("RUN1.png"),
      run2: loadImage("RUN2.png"),
      run3: loadImage("RUN3.png"),
      run4: loadImage("RUN4.png"),
      run5: loadImage("RUN5.png"),
      run6: loadImage("RUN6.png"),
      run7: loadImage("RUN7.png"),
      run8: loadImage("RUN8.png"),
      punch1: loadImage("Punch1.png"),
      punch2: loadImage("Punch2.png"),
      punch3: loadImage("Punch3.png"),
      punch4: loadImage("Punch4.png"),
      punch5: loadImage("Punch5.png"),
      punch6: loadImage("Punch6.png")

    };
    this.image = this.images.idle;
  }
  display() {

    if (this.image === undefined) return;
    //scale(-1,1)
    image(this.image, this.x, this.y, height/(4+119/150), height/(4+119/150));
  }
  displayPunch() {}

  move() {
    this.velocity += this.gravity;
    playerYJump += this.velocity;

    if (playerYJump > playeridley) {
      this.velocity = 0;
      playerYJump = playeridley;
    }
    //Vores metode for spillerens hop er lavet udfra https://www.youtube.com/watch?v=UkiQCPp8ino
    if (moveStateY == "jump" && jump == false) {
      jump = true;
      this.velocity += this.op;
    }

    else if (moveStateY == "idle") {
      if (playerYJump > playeridley-1) {
        jump = false;
      }
    }

    if (moveStateX == "idle") {
      runseq = 1;
      this.image = this.images.idle;
    }

    else if (moveStateX == "right" && gameState != "boss") {
      this.x += width/85;
      if (runseq <= 8) {
        runseq += 0.2;
        distance += 0.1;
        this.image = this.images["run" + round(runseq)];
      } else {
        runseq = 1;
        this.image = this.images["run" + round(runseq)];
      }
    }
  

      else if(gameState == "boss" && moveStateX == "left" && p1.x > (playerFightX- 150)) {
        this.x -= width/85;
    }
  
    else if (gameState == "boss" && moveStateX == "right" && p1.x < (width + (playerFightX - 250))) {
      this.x += width/85;
      if (runseq <= 8) {
        runseq += 0.2;
        this.image = this.images["run" + round(runseq)];
      } else {
        runseq = 1;
        this.image = this.images["run" + round(runseq)];
      }
  }


  if (attackState == "Punch" && i <= 6){
    this.image = this.images["punch" + round(i)];
    i += 0.2

  } else {
    //this.image = this.image["idle"];
    attackState = "idle"
    i = 1
}

  }
}

class Enemy {
  constructor(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.images = {
      fire1: loadImage("Fire1.png"),
      fire2: loadImage("Fire2.png"),
      fire3: loadImage("Fire3.png"),
    };
  }

  display() {
    enemyimagecount += 0.1

    if(enemyimagecount > 3) {
      enemyimagecount = 1
    }

    this.image = this.images["fire" + round(enemyimagecount)];
    image(this.image, this.x, this.y/1.2, height/(4+119/150), height/(2+219/250));
  }
}

function kollison() {
 if(p1.x + (height/(23+29/30)) >= e1.x && 
    p1.x <= e1.x + (height/3.595) &&
    (p1.y + playeridley -(height/(23+29/30))+(playerYJump -p1.y) >= height - (height/(23+29/30))))
    {
      gameState = "dead"
    }

}


class Boss {
  constructor(x,y, op, speedX){
    this.x = x
    this.y = y
    this.op = op
    this.op = 0
    this.speedX = speedX
    this.speedX = 0
    this.images = {
      idle: loadImage("Boss_test.png"),
  
    }
    this.image = this.images.idle
  }
  
  display(){
    tint(255, this.op)
    image(this.image, this.x, this.y/1.2, 250 , 250);
}
}


class Shot{
  constructor(x,y, op, speedX){
    this.x = x
    this.y = y
    this.op = op
    this.op = 0
    this.speedX = speedX
    this.speedX = 0
    this.images = {
      bum: loadImage("Bum.png")
    }
    this.image = this.images.bum
  }
  
  display(){
    tint(255, this.op)
    image(this.image, this.x + this.speedX, this.y/1.1, 250 , 250);
}


}



function keyPressed() {

  if(gameState != "boss"){
    if (key == "d") {
      moveStateX = "right";
    }
    if (key == "a") {
      moveStateX = "left";
    }
  }
    if (key == "w") {
      moveStateY = "jump";
    }
    if (key == "s") {
      moveStateY = "crouch";
    }
    if (key == "k" && attackState == "idle"){
      attackState = "Punch";
    }
  
  if (gameState == "boss"){
      if (key == "d" && p1.x < (width + (playerFightX- 300))) {
      moveStateX = "right";
    }
    if (key == "a") {
      moveStateX = "left";
    }
  }
  
  }
  
  function keyReleased() {
    if (key == "d") {
      moveStateX = "idle";
    }
    if (key == "a") {
      moveStateX = "idle";
    }
    if (key == "w") {
      moveStateY = "idle";
    }
    if (key == "s") {
      moveStateX = "idle";
    }
  
  }
