let attackState = "idle";
let moveStateY = "idle";
let moveStateX = "idle";
let gameState = "parkour";
let distance = 0;
let runseq = 1;
let playerYJump = 650;
let playeridley = 650
let jump = false;
let distshort;
let backgroundsong;
let enemyIdleY = 625

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
  e1 = new Enemy(width * 2, height + 200, 200);

  //backgroundsong.play();


}

function draw() {
  background(220);

  if (gameState == "parkour") {
    push();
    translate(-p1.x + 200, -p1.y + playerYJump);
    imageMode(CENTER);
    p1.display();
    p1.move();
    pop();
  } else {
    print("Boss Time");
  }

  push();
  fill("red");
  translate(-p1.x + 200, -p1.y + enemyIdleY);
  e1.display();
  pop();

  text("Distance: " + Math.round(distance), 50, 50);

  ground.fieldMove();
  ground.display();

  ground2.fieldMove();
  ground2.display();

  kollison();

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
    this.op = -8;
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
    image(this.image, this.x, this.y, 250, 250);
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

    /*else if (moveState == "left") {
      this.x -= 10;
    }*/
  }
}

class Enemy {
  constructor(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
  }

  display() {
    fill("red");
    circle(this.x, this.y, this.w);
  }
}

function kollison() {
  distshort = dist(p1.x, (p1.y + (playerYJump - playeridley))+20 , e1.x, e1.y);
  print(distshort);
  if (distshort < 170) {
    print("Av");
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