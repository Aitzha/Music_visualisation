function Menu(){
    //boolean var is tutorial is passed
    this.tutorial = false;
    //menu open state and its x-axis position
    this.menuOpen = true;
    this.posX = 0;

    //visuals start position
    this.visX = width / 50;
    this.visY = height / 5;
    //array to store visualisations
    this.visuals = [];
    //currently selected vis. set to null until vis loaded in
    this.selectedVisIndex = null;

    //songs
    this.songX = width * 1.035;
    this.songY = height / 5;
    this.currentSong = 0;

    this.drawMenu = function(){
        fill(137,207,240,200);
        push();
        translate(0, 0, 1);
        textSize(width / 120);
        if(this.menuOpen) {
            this.posX = constrain(this.posX + width / 8 / fps, 0, width / 8);
        } else {
            this.posX = constrain(this.posX - width / 8 / fps, 0, width / 8);
        }

        //draws men itself
        rect3(this.posX - width / 16, height / 2, width / 8, height / 1.5, 15);
        rect3(17 * width / 16 - this.posX, height / 2, width / 8, height / 1.5, 15);

        fill(93,63,211);
        //list all visuals
        text("Select a visualisation", this.visX + this.posX - width / 8, this.visY);

        for(var i = 0; i < this.visuals.length; i++) {
            if(this.visuals[i].used) {
                fill(255);
            } else {
                fill(93,63,211);
            }
            text((i + 1) + " " + this.visuals[i].name, this.visuals[i].x + this.posX - width / 8, this.visuals[i].y);
        }

        //list all songs
        fill(93,63,211);
        text("Select a song", this.songX - this.posX, this.songY);
        for(var i = 0; i < songs.names.length; i++) {
            if(this.currentSong == i) {
                fill(255);
            } else {
                fill(93,63,211);
            }
            var x  = width / 50;
            text((i + 1) + " " + songs.names[i], this.songX - this.posX - x, this.songY + (height / 30 * (i + 1)));
        }
        pop();
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
    this.addVis = function(vis){
        this.visuals.push(vis);
        vis.x = this.visX;
        vis.y = this.visY + (height / 30 * this.visuals.length)
        //if selectedVisual is null set the new visual as the
        if(this.selectedVisIndex == null) {
            this.selectedVisIndex = this.visuals.length - 1;
        }
    };
}
