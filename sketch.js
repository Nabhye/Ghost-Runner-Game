var tower,towerImage,ghost,ghostImage,door,doorImage;
var climber,climberImage,block,blockGroup,climberGroup;
var gameState = "play";

function preload(){
   towerImage = loadImage("tower.png");
   doorImage = loadImage("door.png");
   ghostImage = loadImage("ghost-standing.png");
   spookySound = loadSound("spooky.wav");
   climberImage = loadImage("climber.png");
}
 
 function setup(){
   createCanvas(600,600);
   spookySound.play();
   
   tower = createSprite(300,300);
   tower.addImage(towerImage);
   tower.velocityY = 1;
   
   ghost = createSprite(300,300,50,50);
   ghost.addImage(ghostImage);
   ghost.scale = 0.4;
   
   doorGroup = new Group()
   climberGroup = new Group()
   blockGroup = new Group()
 }
 
 function draw(){
   background(0);
   
   if(gameState==="play"){
     
   
   
   if(tower.y>600){
     tower.y = 300;
   }
   
   if(keyDown("space")){
     ghost.velocityY = -10; 
   }
   
   ghost.velocityY = ghost.velocityY+1; 
   
   if(keyDown("left_arrow")){
     ghost.x = ghost.x-3;
   }
   
   if(keyDown("right_arrow")){
     ghost.x = ghost.x+3;
   }
   
    spawnDoors();
     if(climberGroup.isTouching(ghost)){
       ghost.velocityY = 0; 
     }
   
     if(blockGroup.isTouching(ghost)||ghost.y>600){
       ghost.destroy();
       gameState = "end";
     }
     drawSprites()
   }
   if(gameState==="end"){
     fill("red");
     textSize(30);
     text("Game Over",230,250)
   }
 }

 function spawnDoors(){
   if(frameCount%240===0){
     door = createSprite(200,-50);
     climber = createSprite(200,10);
    block = createSprite(200,15);
     
     door.addImage(doorImage);
     climber.addImage(climberImage);
     block.width = climber.width;
     block.height = 2;
     
     door.x =Math.round(random(120,400))
     climber.x = door.x;
     
     block.x = door.x;
     block.velocityY = 1;
     climber.velocityY = 1;
     door.velocityY = 1;
     
     block.debug = true;
     ghost.depth = door.depth;
     ghost.depth = ghost.depth+1;
     
     //lifetime
     
     
     
     doorGroup.add(door);
     climberGroup.add(climber);
     blockGroup.add(block);
   }
 }

 