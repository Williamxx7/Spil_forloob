//--CONTROLLER--//

//Definer forskellige variabler
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
let groundArray = []

//preloader baggrunsmusik 
function preload() {
    //Kode fundet via https://p5js.org/examples/sound-load-and-play-sound.html
    //Sang fundet på https://www.youtube.com/watch?v=8E8YdqLG5c8
    backgroundsong = loadSound("BackgroundMusic.mp3");
  }
  

  function setup() {
    //Laver canvaset
    createCanvas(windowWidth, windowHeight);
    noSmooth();
    //deiner laver objekter ud fra klasser
    p1 = new Player(width, height/(719/819));
    e1 = new Enemy(width * 2,(height/(719/880)));

    //Opretter to ground obejeketer i groundArray
    for (let i = 0; i < 1; i++) {
        groundArray.push(new Field(0, height - (height / (719 / 965))));
        groundArray.push(new Field(-width, height-(height/(719/965))))
    }

  
    //Tildele variablerne deres værdi som bruges til de forskllige objekters position.
    playeridley = height/1.7
    playerYJump = height/1.7
    enemyIdleY = height/1.9

    //Afspiling af baggrundsmusik
    //backgroundsong.play();
  
  }


//State machine for spillerens stat
function keyPressed() {
//Statemachine vores playerens x position 
  if(gameState != "boss"){
    if (key == "d") {
      moveStateX = "right";
    }
    if (key == "a") {
      moveStateX = "left";
    }
  }

  if (gameState == "boss"){
    if (key == "d" && p1.x < (width + (playerFightX- 300))) {
    moveStateX = "right";
  }
  if (key == "a") {
    moveStateX = "left";
  }
}

  //Statemachine for vores player y position
    if (key == "w") {
      moveStateY = "jump";
    }
    if (key == "s") {
      moveStateY = "crouch";
    }

    //Statemachine for vores player attack state.
    if (key == "k" && attackState == "idle"){
      attackState = "punch";
    }
  }

  //Gør at statemachinesne bliver sat til "idle" igen når knappen er blevet frigivet.
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
