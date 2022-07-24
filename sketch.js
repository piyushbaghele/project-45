var astronaut_running,astronaut
var scene_image,scene
var obstacle_1 ,obstacle_2 ,obstacle_3 ,obstacle_4,obstacle_5;
var gem_1;
var score = 0;


function preload(){
  astronaut_running = loadAnimation("imagess/running-4.png","imagess/running-5.png","imagess/running-6.png")  
  scene_Image = loadImage("imagess/img8.jpg");
  
  obstacle_1 = loadImage("imagess/obstacle-1.png")
  obstacle_2 = loadImage("imagess/obstacle-2.png")
  obstacle_3 = loadImage("imagess/obstacle-3.png")
  obstacle_4 = loadImage("imagess/obstacle-4.png")
  obstacle_5 = loadImage("imagess/obstacle-5.png")

  gem_1 = loadImage("imagess/gem-1.png")
}

function setup() {
  createCanvas(1600, 720);

 scene = createSprite(1400,height/2,1000,800); 
 scene.addImage("background",scene_Image);
 scene.velocityX = -5 
 scene.scale=2
 
 astronaut = createSprite(90,height-155);
 astronaut.addAnimation("running",astronaut_running);
 astronaut.scale = 0.6;


 obstaclesGroup = createGroup();
 gemsGroup = createGroup()

 invisibleGround = createSprite(200,190,400,10);
 invisibleGround.visible = false;

 score = 0;
}

function draw() {
  background(0);
  
  if (scene.x < 100){
     scene.x = 1400; 
    }

    console.log(astronaut.y)
    if(keyDown("space")&& astronaut.y >= 564) {
      astronaut.velocityY = -16;
  }
    
  //astronaut.velocityY = astronaut.velocityY + 0.8

 if(gemsGroup.isTouching(astronaut)){
    gemsGroup.destroyEach();
    score = score + 5;
 }

 spawnObstacles();
 spawnGem();

  astronaut.collide(invisibleGround);

  textSize(20);
  fill("black");
  text("Score: "+ score, camera.position.x,50);

  drawSprites();
}

function spawnObstacles(){
if(frameCount % 110 === 0){
  var obstacle = createSprite(800,600)
  obstacle.velocityX = -5

var rand = Math.round(random(1,5));
switch(rand) {
  case 1: obstacle.addImage(obstacle_1);
          break;
  case 2: obstacle.addImage(obstacle_2);
          break;
  case 3: obstacle.addImage(obstacle_3);
          break;
  case 4: obstacle.addImage(obstacle_4);
          break;
  case 5: obstacle.addImage(obstacle_5);
  default: break;

}

    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);

  }
    }

function spawnGem(){
  if(frameCount % 180 === 0){
    var gem = createSprite(800,600)
    gem.addImage(gem_1);
    gem.scale = 0.10;
    gem.velocityX = -5
    gem.lifetime = 150;
    gemsGroup.add(gem);

  }
}


