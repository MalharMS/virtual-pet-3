//Create variables here
var dog,hdog,doging ; 
var db;
var foods ,foodStock;
var fedTime, lastFeed;
var feed,addFood ;
var foodObj;
var gameState , readState


function preload() {
  dogimg = loadImage("Images/Dog.png");
  hdog = loadImage("Images/happydog.png");
  garden = loadImage("Images/Garden.png");
  washroom = loadImage("Images/WashRoom.png");
  bedroom = loadImage("Images/BedRoom.png")
}


function setup() {
  createCanvas(1000, 500);
  foodObj = new Food();

  db = firebase.database();
  dog = createSprite(800, 200, 10, 10);
  dog.addImage(dogimg);
  dog.scale = 0.2

  feed = createButton("FEED");
  feed.position(600, 30);
  feed.mousePressed(feedDog);

  addFood = createButton("ADD FOOD");
  addFood.position(700, 30);
  addFood.mousePressed(addFoodItems);

  // reading game state from database
  readState = db.ref('gameState');
  readState.on("value",function(data){
    gameState = data.val();
  });

    fedTime = db.ref('fedTime');
    fedTime.on('value',function(data){
    lastFeed = data.val();
    })


  foodStock = db.ref('Food');
  foodStock.on("value", readFood);
  }

function draw() {  
background("green")

foodObj.display(); 

currentTime = hour();
if(currentTime==(lastFeed+1)){
  update("Playing");
  foodObj.garden();
}else if(currentTime==(lastFeed+2)){
update("Sleeping");
  foodObj.bedroom();
}else if(currentTime>(lastFeed+2) && currentTime<=(lastFeed+4)){
update("Bathing");
  foodObj.washroom();
}else{
update("Hungry");
foodObj.display();
}

if (gameState != "Hungry") {
  feed.hide();
  addFood.hide();
  dog.remove();
} else {
  feed.show();
  addFood.show();
  dog.addImage(dogimg)
}

fill("white")
textSize(15)
if (lastFeed>=12) {
  text("last Feed : "+ lastFeed % 12 + "PM",350,30);
} else if(lastFeed == 0){
  text("Last Feed : 12 AM",350,30);
} else{
  text("Last Feed : " + lastFeed + "AM",350,30)
}

drawSprites();
}

function readFood(data) {
  foods = data.val();
  foodObj.updateFoodStock(foods)
}

//function to update food stock and last fed time
function feedDog() {

  dog.addImage(hdog)

  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  db.ref('/').update({
    Food: foodObj.getFoodStock(),
    fedTime: hour(),
    gameState: "Hungry"
  });
}

function addFoodItems(){
  foods++
  db.ref('/').update({
    Food:foods
  })
}

function update(state) {
  db.ref('/').update({
    gameState:state
  })
}
