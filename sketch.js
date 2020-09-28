var tower,towerImage;
var door,doorImage,doorsGroup;
var climber,climberImage,climbersGroup;
var ghost,ghostImage;
var block,blockGroup;
var gameState="PLAY";



function preload(){
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png");
  
  spookySound=loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  
  spookySound.loop();
  
  tower=createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY=1;
  tower.y=tower.width/2;
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage(ghostImage);
  ghost.scale=0.3;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  blockGroup = new Group();
}

function draw(){
  background(0);
  
  if(gameState==="PLAY"){
  
    if(tower.y>600){
    tower.y=tower.width/2;
  }
  
  if(keyDown("left_arrow")){
     ghost.x=ghost.x-3;
  }
  
  if(keyDown("right_arrow")){
     ghost.x=ghost.x+3;
  }
  
  if(keyDown("space")){
     ghost.velocityY=-10;
  }
  
  ghost.velocityY=ghost.velocityY+0.8;
  
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  
  if(blockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState="END";
  }
  spawnDoors();
  spawnClimbers();
  
  drawSprites();
  }else if(gameState==="END"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over",230,250);
  }
  
  
}


function spawnDoors(){
  if(frameCount % 240===0){
    door=createSprite(200,50);
    door.addImage(doorImage);
    
    door.x=Math.round(random(100,400));
    door.velocityY=1;
    
    //assigning lifetime to doors
    door.lifetime=610;
    
    //add each door to the group
    doorsGroup.add(door);
    
    //adjusting depth
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
  }
}

function spawnClimbers(){
  if(frameCount % 240===0){
    climber=createSprite(200,110);
    climber.addImage(climberImage);
    
    block=createSprite(200,115);
    block.x=door.x;
    block.velocityY=1;
    block.width=climber.width;
    block.height=2;
    block.debug=true;
    blockGroup.add(block);
    
    climber.x=door.x;
    climber.velocityY=1;
    
    //assigning lifetime to doors
    climber.lifetime=610;
    
    //add each door to the group
    climbersGroup.add(climber);
  }
}