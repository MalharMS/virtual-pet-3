class Food{
    constructor(){
        var foodStock = 0 ;
        var  lastFed ;
        this.image = loadImage('images/Milk.png');
    }

    updateFoodStock(foodStock){
        this.foodStock = foodStock;
    }

    getFedTime(lastFed){
        this.lastFed = lastFed;
    }

    deductFood(){
        if (this.foodStock>0) {
            this.foodStock = this.foodStock - 1;
        }
    }

    getFoodStock(){
        return this.foodStock;
    }

    display(){
        var x = 80;
        var y = 100;

        imageMode(CENTER);
        image(this.image,720,220,70,70);

        if (this.foodStock !== 0) {
            for (var i = 0; i < this.foodStock; i++) {
                if (i % 10 === 0) {
                    x = 80;
                    y = y + 50;
                }
                image(this.image,x,y,80,80);
                x = x + 30;
            }
        }
    }

    bedroom(){
        background(bedroom,600,400)
    }

    garden(){
        background(garden,600,400)
    }

    washroom(){
        background(washroom,600,400)
    }


}