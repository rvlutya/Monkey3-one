var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana,foodGroup;
var obstacle,obstacleGroup;
var banana_img;
var obstacle_img;

var END =0;
var PLAY =1;
var gameState = PLAY;

var score=0;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  banana_img=loadImage("banana.png");
  obstacle_img=loadImage("stone.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  obstacleGroup=new Group();
  foodGroup=new Group();
  
}

function draw() { 

  background(0);
  drawSprites();

  stroke(255);
  textSize(30);
  fill(255);
  text("Score:"+ score,600,50);
  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }

  if(foodGroup.isTouching(player)){
    foodGroup.destroyEach();
    player.scale+=0.05;
    score=score+2;
  }
    spawnFood();
    spawnObstacles();
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    if(obstacleGroup.isTouching(player)){
      gameState=END;
    }

  }else if(gameState===END){
    backgr.velocityX=0;
    player.visible=false;
    foodGroup.destroyEach();
    obstacleGroup.destroyEach();
    textSize(30);
    fill(255);
    text("GAME OVER",300,200);
  }

}
 function spawnFood(){
   if(frameCount%60===0){
     banana=createSprite(600,250,40,10);
     banana.y=random(120,200);
     banana.velocityX=-4;
     banana.addImage("banana",banana_img)
     banana.scale=0.05;
     banana.lifetime=300;
     player.depth=banana.depth+1;
     foodGroup.add(banana);
   }
 }

 function spawnObstacles(){

   if(frameCount%300===0){
  obstacle=createSprite(800,350,10,40)
  obstacle.velocityX=-(4+2*score/100);
  obstacle.addImage("obstacle",obstacle_img);
  obstacle.scale=0.2;
  obstacle.lifetime=300;
  obstacleGroup.add(obstacle);
  } 
 }