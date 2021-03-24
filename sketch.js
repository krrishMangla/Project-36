var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj
var feed,lastFed ;
var food_stock_val;
var feedtime;


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('food');
  foodStock.on("value",readStock);


  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feed=createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);


}

function draw() {
    background(46,139,87);
    foodObj.display();
 
  //write code to read fedtime value from the database 
 feedtime= database.ref('feedtime');
 feedtime.on("value",function(data){
   lastFed = data.val();
 })
 
  // code to display text lastFed time here
    textSize(20);
    stroke("yellow");
    fill("black")
    if(lastFed>=12)
      {
        text("Last Feed : 12 PM",300,30);
      }
    else if(lastFed==0)
      {
        text("Last Feed : 12 AM",300,30);
      } 
    else
      {
       text("Last Feed :"+ lastFed + "AM",300,30)
      }  

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  foodS--;
  database.ref('/').update({
    food:foodS,
    feedtime:hour()
  }) 
       
  foodS = foodObj.getFoodStock();
  if (foodS <= 0) {
    foodObj.updateFoodStock(foodS * 0);
  }else{
    foodObj.updateFoodStock(foodS -1);
  }
 
    }

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}
