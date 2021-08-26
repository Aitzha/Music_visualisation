function Menu(){
    //boolean var is tutorial is passed
    this.tutorial = false;
    //menu open state and its x-axis position
    this.menuOpen = true;
    this.posX = 0;
    //visuals start position
    this.x = width / 50;
    this.y = height / 5;
    //array to store visualisations
    this.visuals = [];
    //currently selected vis. set to null until vis loaded in
    this.selectedVisual = null;

    this.drawMenu = function(){
        fill(137,207,240,200);
        if(this.menuOpen) {
            this.posX = constrain(this.posX + width / 8 / fps, 0, width / 8);
            rect3(this.posX - width / 16, height / 2, width / 8, height / 1.5, 15);
            rect3(17 * width / 16 - this.posX, height / 2, width / 8, height / 1.5, 15);
        } else {
            this.posX = constrain(this.posX - width / 8 / fps, 0, width / 8);
            rect3(this.posX - width / 16, height / 2, width / 8, height / 1.5, 15);
            rect3(17 * width / 16 - this.posX, height / 2, width / 8, height / 1.5, 15);
        }
    }

    //shows tutorial at the beginning
    this.drawTutorial = function() {
        fill(137,207,240);
        rect3(0, 0, width / 2, height / 2, 20);
        fill(93,63,211);
        textSize(width/60);
        text("Tutorial", -width/22, -height / 4.6)
        text("Press (Space) button to open menu", -width/4.2, -height / 9.3);
        text("You can choose visualisation by pressing the name", -width/4.2, 0);
        text("of the visual or by pressing key of number of visual", -width/4.2, height / 18.7)
        text("Press (Enter) to close to tutorial", -width/4.2, height / 4.6);
        fill(255);
    }


    //add a new visualisation to the array
    this.add = function(vis){
        this.visuals.push(vis);
        vis.x = this.x;
        vis.y = this.y + (height / 30 * this.visuals.length)
        //if selectedVisual is null set the new visual as the
        if(this.selectedVisual == null) {
            this.selectedVisual = vis;
        }
    };
}
