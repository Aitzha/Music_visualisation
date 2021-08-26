function Menu(){
    this.tutorial = false;
    this.open = true;
    this.posX = 0;
    //visuals positions
    this.x = width / 50;
    this.y = height / 5;
    //array to store visualisations
    this.visuals = [];
    //currently selected vis. set to null until vis loaded in
    this.selectedVisual = null;

    this.drawMenu = function(){
        fill(137,207,240,200);
        if(this.open) {
            this.posX = constrain(this.posX + width / 8 / fps, 0, width / 8);
            rect3(this.posX - width / 16, height / 2, width / 8, height / 1.5, 15);
            rect3(17 * width / 16 - this.posX, height / 2, width / 8, height / 1.5, 15);
        } else {
            this.posX = constrain(this.posX - width / 8 / fps, 0, width / 8);
            rect3(this.posX - width / 16, height / 2, width / 8, height / 1.5, 15);
            rect3(17 * width / 16 - this.posX, height / 2, width / 8, height / 1.5, 15);
        }
    }

    this.drawTutorial = function() {
        rectMode(CENTER);
        fill(137,207,240);
        rect3(0, 0, width / 2, height / 2, 20);
        fill(93,63,211);
        textSize(30);
        text("Press (Space) button to open menu", -width/6, -100);
        text("Press (Enter) to close to tutorial", -width/6, 100);
        fill(255);
        rectMode(CORNER);
    }




    //add a new visualisation to the array
    //@param vis: a visualisation object
    this.add = function(vis){
        this.visuals.push(vis);
        vis.x = this.x;
        vis.y = this.y + (height / 30 * this.visuals.length)
        //if selectedVisual is null set the new visual as the
        //current visualiation
        // if(this.selectedVisual == null){
        //     this.selectVisual(vis.name);
        // }
        if(this.selectedVisual == null) {
            this.selectedVisual = vis;
        }
    };

    //select a visualisation using it name property
    //@param visName: name property of the visualisation
    this.selectVisual = function(visName){
        for(var i = 0; i < this.visuals.length; i++){
            if(visName == this.visuals[i].name){
                this.selectedVisual = this.visuals[i];
            }
        }
    };
}
