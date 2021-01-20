//Game States
var PLAY=1;
var END=0;
var gameState=1;

var knife, mfruit,malien,cuttings,end,backGround,bgimage;
var knifeImage, fruito, fruita,alien1,alien2,fruitg,alieng;


function preload(){
  alien1 = loadImage("alien1.png");
  alien2 = loadImage("alien2.png");
  fruito = loadImage("orange.png");
  fruita = loadImage("apple2.png");
  knifeImage = loadImage("knife.png");
  cuttings = loadSound("cutting.mp3");
  end = loadImage("ending.png");
  bgimage = loadImage("tray.jpg")
}



function setup() {
  createCanvas(600, 600);
  
  //creating sword
  backGround = createSprite(300,300,150,150)
  backGround.addImage(bgimage);
  background.scale = 110;
  
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7;
   knife.addImage("the end",end);
  
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);

  score=0;
  fruitg = createGroup();
  alieng = createGroup();
  //create fruit and monster Group variable here
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    //calling fruit and monster function
    
    // Move knife with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  aliens();
  fruits();
    if(fruitg.x >0){
      fruitg.velocityXeach = -(7 + score*2/100);
       alieng.velocityXeach = -(7 + score*2/100);
    }
    
    if(fruitg.x < 0){
      fruitg.velocityXeach = 7 + score*2/100;
       alieng.velocityXeach = 7 + score*2/100;
    }
      // Increase score if knife touching fruit
   
    // Go to end state if knife touching enemy
      
  }
  
  if(knife.isTouching(fruitg)){
    cuttings.play();
    fruitg.destroyEach();
    score = score+ 1
  }
  
  if(knife.isTouching(alieng)){
    cuttings.play();
    alieng.destroyEach();
    gameState = END;
  }
  
  if(gameState===END){
    knife.changeImage("the end",end);
    knife.x = 300;
    knife.y = 300;
  }
  
  drawSprites();
  
  //Display score
  textSize(25);
  text("Score : "+ score,250,50);
}

function fruits(){
  if(frameCount % 80 === 0){
  mfruit = createSprite(0,Math.round(random(200,500)),50,50);
    mfruit.scale = 0.3
    var fruitxaxis = Math.round(random(1,2))
  switch(fruitxaxis){
       case 1: mfruit.x = 0; mfruit.velocityX = 7
              break;
      case 2: mfruit.x = 600; mfruit.velocityX = -7
      
  }
    
  var fruitimage = Math.round(random(1,2))
  switch(fruitimage){
       case 1: mfruit.addImage("orange",fruito)
               ;
              break;
      case 2:  mfruit.addImage("apple",fruita);
      mfruit.scale = 0.1; 
       
      
  }
  
  //mfruit.addImage("orange",fruito);
  //mfruit.addImage("apple",fruita);
  
    mfruit.lifetime = 100
    fruitg.add(mfruit)
  }
  }
function aliens(){
  if(frameCount % 120 === 0){
  malien = createSprite(0,Math.round(random(200,500)),50,50);malien.scale = 0.3

    var alienxaxis = Math.round(random(1,2))
  switch(alienxaxis){
       case 1: malien.x = 0; malien.velocityX = 7
              break;
      case 2: malien.x = 600; malien.velocityX = -7
      
  }
    
  var alienimage = Math.round(random(1,2))
  switch(alienimage){
       case 1: malien.addImage("alienss",alien1);
      malien.scale = 0.1;
              break;
      case 2:  malien.addImage("aliens will come",alien2);
      malien.scale = 0.2; 
              
      
  }
  
  //mfruit.addImage("orange",fruito);
  //mfruit.addImage("apple",fruita);
  
    malien.lifetime = 100
    alieng.add(malien) 
  }
  }