
var background, backgroundImg;

var monkey , monkey_running;
var cloudsImg;

var cloudGroup,obstacleGroup,bananaGroup;

var PLAY=1;
var END=0;
var gameState=PLAY;

var timer=0;

bananaCount=0;

var ground,groundImg,soil;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload()
{
  backgroundImg=loadImage("Forest.jpg");
  
  cloudsImg= loadImage("cloud-1.png");
 
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() 
{
  background= createSprite(200,200);
  background.addImage("forest",backgroundImg);
  background.scale=0.5;   
  
monkey=createSprite(100,350,20,20);
monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(200,382,400,10);
  ground.shapeColor="green";
  ground.x=ground.width/2
 
  
  soil=createSprite(200,391,400,18);
  soil.shapeColor="brown";

  
  cloudGroup=createGroup();
  obstacleGroup=createGroup();
  bananaGroup=createGroup();
}


function draw() {

  //background("skyblue");
  

  
  SpawnClouds();
  SpawnObstacles();
  
  if(gameState==PLAY)
  {
      if(keyDown("S"))

  
    if(monkey.isTouching(bananaGroup))
    {
        bananaGroup.destroyEach();
      
      bananaCount=bananaCount+1;
       }
    
  if(keyDown("space") && monkey.y>345)
  {
    monkey.velocityY=-13;  
  }
  monkey.velocityY=monkey.velocityY+0.5;
    
    if(monkey.isTouching(obstacleGroup)){
      
     gameState=END; 
    }
  }
  
  monkey.collide(obstacleGroup);
 monkey.collide(ground);
 

    if(gameState==END){
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
     
      
     bananaGroup.setLifetimeEach(-1); 
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
      monkey.velocityX=0;
      monkey.velocityY=0;
       }
  

  Spawnbananas();
  drawSprites();
  textSize(20);

  fill("black");
  if(gameState==PLAY){
  timer=Math.ceil(frameCount/frameRate());
  
}
  
  stroke(100);
  fill("white");
  text("Survival time: "+timer,20,40);
  text("Bananas Collected: "+bananaCount,20,70);
  
  if (gameState==END)
  {
    fill("Yellow");
    strokeWeight(50);
    text("Game Over",  150,250);

  }
}

function SpawnClouds()
{
  var cloud=createSprite(600,460,30,30);
  
 if (frameCount % 60 === 0) 
 {

    cloud.y=Math.round(random(30,250));
    cloud.addImage(cloudsImg);
      cloud.scale = 0.1;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
  
 } 
  cloudGroup.add(cloud);
}


function SpawnObstacles()
{
  var obstacle=createSprite(600,360,70,70);
  obstacle.setCollider("rectangle",0,0,obstacle.width,obstacle.height);
  obstacleGroup.add(obstacle);
 if (frameCount % 300 === 0) {

    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -3;
    
     //assign lifetime to the variable
    obstacle.lifetime = 200;
   
  } 
  
}

function Spawnbananas()
{
  var banana=createSprite(600,300,30,30);
  bananaGroup.add(banana);
  banana.y=Math.round(150,200);
 if (frameCount % 140 === 0) {

    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 250;
   
  } 
  
}