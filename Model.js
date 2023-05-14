//--MODEL--//

//Laver klassen for vores jord/ground
class Field {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      //loader billedet af jorden
      // Billedet har vi selv lavet på https://www.pixilart.com/draw
      this.image = loadImage("Ground.png");
    }
  
    //displayer vores billed med de givende koordinater. 
    display() {
      image(this.image, this.x, this.y, width + (width *0.05), height * 1.6);
    }

    //Da skærmen er translated omkring over spiller, laver denne funktion at det ligner jorden bevæger sig.
    fieldMove() {
    // Gør den bevæger sig hvis movestate er right. 
      if (moveStateX == "right") {
        this.x -= width/85;
  
    //Hvis jordens position er lig med minus skærmen længde skal demns position sættes til længden af skærmen. 
        if (this.x <= -width) {
          this.x = width;
        }
      } 
    }
  }
  

//Klasse for spilleren 
  class Player {
    constructor(x, y) {
    //positionen 
      this.x = x;
      this.y = y;
      // tyngdekraft brug til når han skal oppe. 
      this.velocity = 0;
      this.gravity = height/2396.6;
      this.op = -height/65;
      //Array med alle billederne til spilleren. 
      //Fundet på https://zegley.itch.io/2d-platformermetroidvania-asset-pack
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
      //Sætter iamge til idle billedet i arrayet. 
      this.image = this.images.idle;
    }
    //Funktion til at tegne spiller
    display() {
      image(this.image, this.x, this.y, height/(4+119/150), height/(4+119/150));
    }
  
    move() {
      this.velocity += this.gravity;
      playerYJump += this.velocity;
  
      //Sørger for spilleren kun bliver trukket ned i hop.
      if (playerYJump > playeridley) {
        this.velocity = 0;
        playerYJump = playeridley;
      }
      //Vores metode for spillerens hop er lavet udfra https://www.youtube.com/watch?v=UkiQCPp8ino
      // Tjekker om moveState er lig "jump"
      if (moveStateY == "jump" && jump == false) {
        jump = true;
        this.velocity += this.op;
      }
  
      //hvis moveStateY er lig idle skal jump være false så man kan opee igen. 
      else if (moveStateY == "idle") {
        if (playerYJump > playeridley-1) {
          jump = false;
        }
      }
  

      // Hvis moveStateX er lig "idle" bliver spillerens billed sat til idle og runseq som bruges til løbe animationen bliver sat til 1. 
      if (moveStateX == "idle") {
        runseq = 1;
        this.image = this.images.idle;
      }
  
      // Hvis moveStateX er lig "right" og gameState ikke er lig "boss" skal den køre følgende kode.
      else if (moveStateX == "right" && gameState != "boss") {
        //Playerens x værdi bliver højere
        this.x += width/85;
        if (runseq <= 8) {
          // runseq og distance øges
          runseq += 0.2;
          distance += 0.1;
          //Sætter billedet i arrayet til run og billedets nummer ud fra runseq.
          this.image = this.images["run" + round(runseq)];
        } else {
        //Da der kun er 8 billeder i animationen skal den sættes tilbage til 1/første billede.
          runseq = 1;
          this.image = this.images["run" + round(runseq)];
        }
      }

      //Tjekker hvilen gamestate og om spilleren er indefor canvasset 
        else if(gameState == "boss" && moveStateX == "left" && p1.x > (playerFightX- 150)) {
            //hvis de følgende ting gælder skal vores spiller bevæge sig baglæns.
            this.x -= width/85;
      }
    
      //Tjekker hvilken gamestate og om spilleren er indefor canvasset
      else if (gameState == "boss" && moveStateX == "right" && p1.x < (width + (playerFightX - 250))) {
        //hvis de følgende ting gælder skal vores spiller bevæge sig fremad.
        this.x += width/85;
        //Løbeanimationen samme som tidligere.
        if (runseq <= 8) {
          runseq += 0.2;
          this.image = this.images["run" + round(runseq)];
        } else {
          runseq = 1;
          this.image = this.images["run" + round(runseq)];
        }
    }
  
    //Hvis attackState er lig Punch og i er mindre eller lig 6 da det er antallet af animationer i punch.
    if (attackState == "punch" && i <= 6){
      //sætter image til punch
      this.image = this.images["punch" + round(i)];
      //Ændre i værdien så der kommer en animation
      i += 0.2
  
    } else {
      //Når animationen er færdig bliver attackState sat til "idle" og i lig 1
      attackState = "idle"
      i = 1
  }
  
    }
  }
  
  //Klassen for vores ild/forhendring. 
  class Enemy {
    constructor(x, y, w) {
      //Position og bredde
      this.x = x;
      this.y = y;
      this.w = w;
      //array med billederne
      //Fundet på https://www.freepik.com/free-vector/flame-with-smoke-animation-frames-pixel-art-style_13437705.htm#query=pixel%20sprite&position=2&from_view=keyword&track=ais
      this.images = {
        fire1: loadImage("Fire1.png"),
        fire2: loadImage("Fire2.png"),
        fire3: loadImage("Fire3.png"),
      };
    }
  
    //Funktionen tegner fire billedet og køre animationen
    display() {
      //Animation
      enemyimagecount += 0.1
      if(enemyimagecount > 3) {
        enemyimagecount = 1
      }
      //Ændre billedet ved enemyimagecount
      this.image = this.images["fire" + round(enemyimagecount)];
      //tegner billedet
      image(this.image, this.x, this.y/1.2, height/(4+119/150), height/(2+219/250));
    }
  }
  
  // funktionen tjekker om der er kollison mellem playeren og enemy/ilden
  function kollison() {
   if(p1.x + (height/(23+29/30)) >= e1.x && 
      p1.x <= e1.x + (height/3.595) &&
      (p1.y + playeridley -(height/(23+29/30))+(playerYJump -p1.y) >= height - (height/(23+29/30))))
      {
        //sætter gameState til "dead" hvis overstående er sandt.
        gameState = "dead"
      }
  
  }
  
  
  //klassen for bossen
  class Boss {
    constructor(x,y, op, speedX){
      this.x = x
      this.y = y
      this.op = op
      this.op = 0
      this.speedX = speedX
      this.speedX = 0
      //Lavet som array til bossen billeder
      //Lavet så bossen også kan få nogen animationer
      //Fundet på www.pngwing.com
      this.images = {
        idle: loadImage("Boss_test.png"),
    
      }
      // Sætter imag til idle
      this.image = this.images.idle
    }
    
    //Tegner bossen gennemsigtig
    display(){
      // tint fundet på  https://p5js.org/examples/image-transparency.html
      tint(255, this.op)
      //viser billedet.
      image(this.image, this.x, this.y/1.2, height/2.3 , height/2.3);
  } 
}
  
  // Klasse for shot
  class Shot{
    constructor(x,y, op, speedX){
      this.x = x
      this.y = y
      this.op = op
      this.op = 0
      this.speedX = speedX
      this.speedX = 0
      //Array til billederne
      //Fundet på www.pngwing.com
      this.images = {
        bum: loadImage("Bum.png")
      }
      this.image = this.images.bum
    }
    
    //tegner/viser billedet i starten gennemsigtig
    display(){
      tint(255, this.op)
      image(this.image, this.x + this.speedX, this.y/1.1, height/2.3 , height/2.3);
  }
  
  
  }