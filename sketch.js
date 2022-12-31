var trexAnim,groundImage,cloudImage,o1Image,o2Image,o3Image,o4Image,o5Image,o6Image
var trex,ground,invisibleground,cloud,obstacle,obstacleGroup,cloudGroup
var jumpSound,dieSound
var score=0
var gameState="play"
function preload(){
 trexAnim=loadAnimation("trex1.png","trex3.png","trex2.png")
 groundImage=loadImage("ground.png")
 cloudImage=loadImage("cloud.png")
 o1Image=loadImage("obstacle1.png")
 o2Image=loadImage("obstacle2.png")
 o3Image=loadImage("obstacle3.png")
 o4Image=loadImage("obstacle4.png")
 o5Image=loadImage("obstacle5.png")
 o6Image=loadImage("obstacle6.png")
 trexCol=loadAnimation("trex_collided.png")
 jumpSound=loadSound("jump.mp3")
 dieSound=loadSound("die.mp3")

}

function setup(){
   createCanvas(windowWidth,windowHeight)
   trex=createSprite(50,height-100,20,20)
   trex.addAnimation("trexLabel",trexAnim)
   trex.addAnimation("trexColLabel",trexCol)
   trex.scale=0.8
   trex.setCollider("rectangle",0,0,90,50)
  ground=createSprite(width/2,height-30,width,10 )
  ground.addImage("groundlabel",groundImage)
  ground.scale=1.5
  invisibleground=createSprite(width/2,height-20,width,10 )
 invisibleground.visible=false
 obstacleGroup=createGroup()
 cloudGroup=createGroup()
}

function draw(){
  background("darkgrey")
  textSize(25)
  text("Score : "+score,width-250,50)
  if(gameState=="play"){
    ground.velocityX=-(6+score/200)
    score=score+Math.round(frameCount/400)
    if(ground.x<0){
      ground.x=ground.width/2
      
    }
    if(keyDown("space") && trex.y>height-100){
      trex.velocityY=-12
      jumpSound.play()
    }
    trex.velocityY=trex.velocityY+1

    if(obstacleGroup.isTouching(trex)){
       gameState="end"
       dieSound.play()
      }
      
        spawnObstacles()
        spawnClouds()
  }
  else if(gameState=="end"){
    textSize(30)
    text("Game Over",width/2,height/2)
    cloudGroup.setVelocityXEach(0)
    ground.velocityX=0
    obstacleGroup.setVelocityXEach(0)
    trex.changeAnimation("trexColLabel",trexCol)
    obstacleGroup.destroyEach()
    cloudGroup.destroyEach()
    trex.velocityY=0
   
  }

 
  
 
  trex.collide(invisibleground)

  drawSprites()

}

function spawnClouds(){
  if(frameCount%100==0){
  cloud=createSprite(width,Math.round(random(100,300)),20,20)
  cloud.addImage("cloudlabel",cloudImage)
  cloud.velocityX=-(6+score/200)
  cloudGroup.add(cloud)
  }
}

function spawnObstacles(){
if(frameCount%60==0){
obstacle=createSprite(width,height-50,20,30)
var r=Math.round(random(1,6))
switch(r){
  case 1:obstacle.addImage("o1label",o1Image)
  break
  case 2:obstacle.addImage("o2label",o2Image)
  break
  case 3:obstacle.addImage("o3label",o3Image)
  break
  case 4:obstacle.addImage("o4label",o4Image)
  break
  case 5:obstacle.addImage("o5label",o5Image)
  break
  case 6:obstacle.addImage("o6label",o6Image)
  break


}
obstacle.scale=0.7
obstacle.velocityX=-(6+score/200)
obstacleGroup.add(obstacle)

}


}