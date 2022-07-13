var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);

  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300,300,10,10);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.4;
  
  doorsGroup =  new Group();
  climbersGroup =  new Group();
  invisibleBlockGroup =  new Group();
  
  
  
}

function draw() {
  background("black");


  if(gameState === "play"){
    
    if(tower.y > 400){
      tower.y = 300
    }

    
    if(keyDown("SPACE")){
      ghost.velocityY = -10;
    }

    if(keyDown("LEFT")){
      ghost.x = ghost.x-3;
    }

    if(keyDown("RIGHT")){
      ghost.x = ghost.x+3;
    }

    ghost.velocityY += 0.5;

    spawnDoors();

    if(invisibleBlockGroup.isTouching(ghost)|| ghost.y>590 ){

      gameState = "end";
      
    } 

    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }

    drawSprites();
  }
  else {
    
      console.log("End");
      
      tower.velocityY = 0;

      ghost.visible = false;
    
      doorsGroup.destroyEach();
      climbersGroup.destroyEach();
      invisibleBlockGroup.destroyEach();

      textSize(40);
      stroke("white");
      strokeWeight(7);
      fill("red");
      text("Game Over" , 200, 300);
      
  }
  
 



    
    
   
}

function spawnDoors(){
  if(frameCount % 200 === 0){

    rand = Math.round(random(100,500));
    var door = createSprite(rand,0,10,10);
    door.addImage("door", doorImg);
    door.velocityY = 3;
    doorsGroup.add(door);
  
    var climber = createSprite(door.x, door.y+50,10,10);
    climber.addImage("climber", climberImg);
    climber.velocityY = door.velocityY;
    climbersGroup.add(climber);
    
    invisibleBlock = createSprite(door.x, door.y+60,100,5);
    invisibleBlock.velocityY = door.velocityY;
    invisibleBlock.visible = false;
    invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);
    

    door.depth = ghost.depth;
    climber.depth = ghost.depth;
    ghost.depth++;
  
  
  }
} 