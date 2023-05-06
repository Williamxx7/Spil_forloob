let attackState = "idle";
let moveStateY = "idle";
let moveStateX = "idle";
let gameState = "parkour";
let distance = 0;
let runseq = 1;
let playerYJump = 550;
let playeridley = 550
let jump = false;
let distshort;
let backgroundsong;
let enemyIdleY = 525
let enemyimagecount = 1


let bosestimeX
let bosestimeY


function preload() {
  // for (let i = 0; i < 8; i++) {
  // imageRunArray();
  //}
  test = loadImage("PlayerIdle.png");
  backgroundsong = loadSound("BackgroundMusic.mp3");
}
//lol

function setup() {
  createCanvas(windowWidth, windowHeight);
  noSmooth();
  p1 = new Player(width, height + 100);
  ground = new Field(0, -200);
  ground2 = new Field(-width, -200);
  e1 = new Enemy(width * 2, height + 200);

  //backgroundsong.play();


}

function draw() {
  background(220);

if (distance > 25){
  distance = 0
  bosestimeX = -p1.x+200
  bosestimeY = -p1.y+playerYJump
  gameState = "boss"
}


  if (gameState == "parkour") {
    push();
    translate(-p1.x + 200, -p1.y + playerYJump);
    imageMode(CENTER);
    p1.display();
    p1.move();
    
    
    pop();
  } else if(gameState == "boss") {
    print("Boss Time");

    push();
    print(playerYJump-p1.y)
    translate(bosestimeX, bosestimeY + (playerYJump-playeridley));
    imageMode(CENTER);
    //p1.y = (playerYJump- p1.y)
    p1.display();
    p1.move();
    pop();


  } else if (gameState == "dead"){
    push();
    translate(-p1.x + 200, -p1.y + playerYJump);
    imageMode(CENTER);
    p1.display();

    fill("red")
    textSize(50)
    textAlign(CENTER)
    text("GAME OVER", p1.x +30, p1.y-150)

    pop();

  }


  push();
  translate(-p1.x + 200, -p1.y + enemyIdleY);
  text("Use W to jump \nUsw D to move forward", p1.x/1.09, p1.y/1.8)
  e1.display();
  pop();

  text("Distance: " + Math.round(distance), 50, 50);

  if (gameState == "parkour"){
  
  ground.fieldMove();
  ground2.fieldMove();

  kollison();

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
    image(this.image, this.x, this.y, width + 50, height * 1.5);
  }
  fieldMove() {
    if (moveStateX == "right") {
      this.x -= 10;

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
    this.gravity = 0.3;
    this.op = -10;
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
    };
    this.image = this.images.idle;
  }
  display() {

    if (this.image === undefined) return;
    //scale(-1,1)
    image(this.image, this.x, this.y, 150, 150);
  }
  displayPunch() {}

  move() {
    this.velocity += this.gravity;
    playerYJump += this.velocity;

    if (playerYJump > playeridley) {

      this.velocity = 0;
      playerYJump = playeridley;
    }
    //https://www.youtube.com/watch?v=UkiQCPp8ino
    if (moveStateY == "jump" && jump == false) {
      jump = true;
      this.velocity += this.op;
    }

    if (moveStateY == "idle") {
      if (playerYJump > playeridley-1) {
        jump = false;
      }
    }

    if (moveStateX == "idle") {
      runseq = 1;
      this.image = this.images.idle;
    }

    if (moveStateX == "right") {
      this.x += 10;
      if (runseq <= 8) {
        runseq += 0.2;
        distance += 0.1;
        this.image = this.images["run" + round(runseq)];
      } else {
        runseq = 1;
        this.image = this.images["run" + round(runseq)];
      }
    }
    if(gameState == "boss"){
      if(moveStateX == "left") {
        this.x -= 10;
    }
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
    image(this.image, this.x, this.y/1.2, 150, 250);
  }
}

function kollison() {
 if(p1.x + 30 >= e1.x && 
    p1.x <= e1.x + 200 &&
    (p1.y + playeridley -30)+(playerYJump -p1.y)>= e1.y - 75
    ){
      gameState = "dead"
    }

}


function keyPressed() {
  if (key == "d") {
    moveStateX = "right";
  }
  if (key == "a") {
    moveStateX = "left";
  }
  if (key == "w") {
    moveStateY = "jump";
  }
  if (key == "s") {
    moveStateY = "crouch";
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