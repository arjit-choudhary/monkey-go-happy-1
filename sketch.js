var monkey , monkey_running,monkey_stop;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var survivalTime;
var score;

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  monkey_stop = loadImage("sprite_6.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  survivalTime = 0;
  score = 0;
}

function setup() {
  createCanvas(600,400);
  
  monkey = createSprite(80,350,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.addAnimation("stop",monkey_stop);
  monkey.scale = 0.2;
  
  ground = createSprite(300,390,800,20);
  ground.velocityX = -4;
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  
  monkey.setCollider("circle",0,0,300);
  monkey.debug = true;
  
}

function draw() {
  background("lightBlue");
  
  ground.x = ground.width/2;
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  if(keyDown("space") && monkey.y >= 310){
    monkey.velocityY = -18;
  }
  
  survivalTime = survivalTime + Math.round(getFrameRate()/60);
  
  text("Survival Time: "+ survivalTime,480,30);
  text("Score: "+ score,480,50);
  
  monkey.collide(ground);
  
  if (monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
    score = score + 2;
  }
  
  if(monkey.isTouching(obstacleGroup)){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    
    monkey.changeAnimation("stop",monkey_stop);
    
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    obstacleGroup.setVelocityX(0);
    bananaGroup.setVelocityX(0);
  }
  
  spawnObstacle();
  spawnBanana();
  
  drawSprites();
}

function spawnBanana(){
  if (frameCount % 80 === 0){
    var banana = createSprite(600,280,10,40);
    banana.velocityX = -4;
    banana.velocityX = -(6 + survivalTime/100);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.15;
    banana.lifetime = 200;
    
    bananaGroup.add(banana);
  }
}
function spawnObstacle(){
  if (frameCount % 300 === 0){
    var obstacle = createSprite(600,355,10,40);
    obstacle.velocityX = -4;
    obstacle.velocityX = -(6 + survivalTime/100);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.25;
    obstacle.lifetime = 200;
    
    obstacleGroup.add(obstacle);
  }
}