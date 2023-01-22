var cactusG,cloudsG;
var trex,ground,ground2,clouds,cactus,restart,gameover,score = 0,gameState = "play";
var trexImg,groundImg,cloudImg,c1,c2,c3,c4,c5,c6,resImg,goImg,trexCollidedImg;
var jumpSound,dieSound,checkpointSound;
function preload(){
  trexImg = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundImg = loadImage("ground2.png");
  cloudImg  = loadImage("cloud.png");
  c1 = loadImage("obstacle1.png");
  c2 = loadImage("obstacle2.png");
  c3 = loadImage("obstacle3.png");
  c4 = loadImage("obstacle4.png");
  c5 = loadImage("obstacle5.png");
  c6 = loadImage("obstacle6.png");
  resImg = loadImage("restart.png")
  goImg = loadImage("gameOver.png");
  trexCollidedImg = loadImage("trex_collided.png")
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkpointSound = loadSound("checkPoint.mp3");

}

function setup(){

  trex = createSprite(50,150,10,10);
  trex.addAnimation("running", trexImg);
  trex.addImage("collide",trexCollidedImg);
  trex.scale = 0.5
  ground = createSprite(300,180,600,20);
  ground.addImage("ground",groundImg);
  ground2 = createSprite(300,193 ,600,20);
  cactusG = new Group();
  cloudsG = new Group();
  gameover = createSprite(300,100,10,10);
  restart = createSprite(300,80,10,10);
  gameover.addImage("go",goImg);
  restart.addImage("restart",resImg);
  restart.scale = 0.3;
  gameover.scale = 0.3;
  restart.visible = false;
  gameover.visible = false;

 

  trex.setCollider("circle",0,0,45);

}


function draw(){

  createCanvas(600,200);
  background(180);

  if(gameState==="play"){
    score = Math.round(frameCount/5);
    if(keyDown("space")&&trex.y>150){
      trex.velocityY = -20 ;
      jumpSound.play();
   }
   if(score%100===0 && score>0){
    checkpointSound.play();
   }
    ground.velocityX = -(5+score/100);
    trex.velocityY = trex.velocityY + 1 ;
    if(ground.x<0){
      ground.x  = ground.width/2;
  }
  createClouds();
  createCactus();
  if(trex.isTouching(cactusG)){
    gameState = "end";
    dieSound.play();
  }
}

  else if(gameState==="end"){
    ground.velocityX = 0;
    cactusG.setVelocityXEach(0);
    cloudsG.setVelocityXEach(0);
    restart.visible = true;
    gameover.visible = true;
    trex.changeImage("collide",trexCollidedImg);
    cactusG.setLifetimeEach(-1);
    cloudsG.setLifetimeEach(-1);
    trex.velocityY = 0;
    
    if(mousePressedOver(restart)){
      //reset();
      console.log("hi");
    }
    
    
  }
  text("score = "+score,500,25);

  trex.collide(ground2);

  ground2.visible = false;

  //trex.debug = true;
  drawSprites();
}
function createClouds(){
  if(frameCount%80===0){
    clouds = createSprite(600,20,10,10);
    clouds.velocityX  =-(5+score/100);
    clouds.addImage("clouds",cloudImg);
    clouds.y = random(10,120);
    trex.depth = clouds.depth;
    trex.depth = trex.depth +1;
    clouds.lifetime = 120;
    cloudsG.add(clouds);
}
}
function createCactus(){
  if(frameCount%100===0){
    cactus = createSprite(600,160,20,20);
    cactus.velocityX = -(5+score/100);
    cactus.lifetime = 200;
    var r = Math.round(random(1,6));
    switch(r){
      case 1: cactus.addImage("c1",c1);
      break
      case 2: cactus.addImage("c2",c2);
      break
      case 3: cactus.addImage("c3",c3);
      break
      case 4: cactus.addImage("c4",c4);
      break
      case 5: cactus.addImage("c2",c5);
      break      
      case 6: cactus.addImage("c6",c6);
      break
      default:break;
    }
    cactus.scale = 0.6;
    cactusG.add(cactus);
  }

  }
  function reset(){
    gameState = "play";

  }