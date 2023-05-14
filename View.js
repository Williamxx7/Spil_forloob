//--View--//

function draw() {
    background(220);
  
//If statementet søger for at hvis playerens score er større end 25 skal den sætte nogen værdier og ændre game staten af spillet til "boss" mode. 
//Denne del af koden vil nok passe bedre ind under controller eller model.
  if (distance > 25){
    distance = 0
    bosestimeX = -p1.x+200
    bosestimeY = -p1.y+playeridley
    gameState = "boss"
    moveStateX = "idle"
    playerFightX = p1.x
    //Definer vores boss og skud.
    v1 = new Boss(p1.x + width/1.7,(height))
    s1 = new Shot(p1.x + width/1.55,(height))
  
  }
  
    if (gameState == "parkour") {

      push();
      translate(-p1.x + 200, -p1.y + playerYJump);
      imageMode(CENTER);
      //Tegner playeren 
      p1.display();
      //Kalder move og ser om gameStaten har ændret sig
      p1.move();
      pop();

    //kalder fieldmove som ændre groundens placering.       
    groundArray[0].fieldMove();
    groundArray[1].fieldMove();
  
    kollison();

    } else if(gameState == "boss") {
  
      push()
      //Sætter psoitonen af skærmen i push/pop til bosestimeX og Y.
      translate(bosestimeX, bosestimeY)
      //Tegner vores boss og skud. 
      v1.display();
      s1.display();
      fill("green")
      pop()

      //Gør at vores boss og skud gennemsigtighed bliver højre når de bliver vist. 
      v1.op += 2
      s1.op +=2
      //Giver hastighed til skudet.
      s1.speedX -= 5
  
      //Sætter en random afstand mellem 300-500 til vores skud skal gå tilbage til dens startlokation.
      if(s1.speedX + s1.x < playerFightX - random(300, 500)){
        s1.speedX = 0
      }

      push();
      //Sætter psoitonen af skærmen i push/pop til bosestimeX og bosestimeX + (playerYJump-playeridley). Hvilket sørger for det ser rigtig ud når spilleren hopper.
      translate(bosestimeX, bosestimeY + (playerYJump-playeridley));
      imageMode(CENTER);
      p1.display();
      p1.move();
      //rect(p1.x, p1.y + playeridley -(height/(23+29/30))+(playerYJump -p1.y), 100,100)
      //rect(lol + s1.speedX +105, height +45, 45 ,45)
      pop();
  
  
    } else if (gameState == "dead"){
      //Tjekker om gameSate er lig "dead"
      push();
      //Translater canvaset 
      translate(-p1.x + 200, -p1.y + playerYJump);
      imageMode(CENTER);
      //tegener spilleren
      p1.display();
  
      //Tegner "game over" tekst.
      fill("red")
      textSize(height/14)
      textAlign(CENTER)
      text("GAME OVER", p1.x +30, p1.y-(height/4.6))
  
      pop();
  
    }
  
  
  //Hvis gamestaten er dead eller parkour skriver tegner den teksten. 
    if(gameState == "dead" || gameState == "parkour"){
    push();
    translate(-p1.x + 200, -p1.y + enemyIdleY);
    e1.display();
    pop();

    textSize(height/30)
    text("Distance: " + Math.round(distance), width/30,height/14);
    textSize(height/50)
    text("Use W to jump \nUse D/A to move\nUse K to punch", width/30, height/8);

  }

  //tegner jorden/ground
  groundArray[0].display();
  groundArray[1].display();
  
  }