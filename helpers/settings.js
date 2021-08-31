function Settings() {

    //boolean var is tutorial is passed
    this.tutorial = false;
    //menu open state and its x-axis position
    this.menuOpen = true;
    this.menuPosX = 0;

    //visuals start position
    this.visPosX = width / 50;
    this.visPosY = height / 5;
    //array to store visualisations
    this.visuals = [];
    //currently selected vis. set to null until vis loaded in
    this.selectedVisIndex = null;

    //songs
    this.songPosX = width * 1.035;
    this.songPosY = height / 5;
    this.currentSong = 0;

    //fps
    this.fpsPosX = width / 60;
    this.fpsPosY = height / 1.4;
    this.fpsW = width / 11;
    this.fpsH = height / 45;
    this.fpsCurPosX = ((2 * this.fpsPosX) + this.fpsW) / 2;
    this.fps = 30;

    //spectrum dividers
    this.divPosX = width / 60;
    this.divPosY = height / 1.3;
    this.divW = width / 11;
    this.divH = height / 45;
    this.divCurPosX = ((2 * this.fpsPosX) + this.fpsW) / 2;
    this.div = 16;

    //images
    this.imgPosX = width * 1.0154;
    this.imgPosY = height / 2.5;
    this.imageChosen = null;

    //modes for Spectrum 3
    this.spectrum3Mode = 1;
    this.modePosX = width * 1.03;
    this.modePosY = height / 1.75;
    //figures for Spectrum 3
    this.spectrum3Figures = "triangles";
    this.figuresPosX = width * 1.0154;
    this.figuresPosY = height / 1.4;


    this.draw = function(){
        fill(137,207,240,200);
        push();
        translate(0, 0, 1);
        textSize(width / 120);
        if(this.menuOpen) {
            this.menuPosX = constrain(this.menuPosX + width / 8 / this.fps, 0, width / 8);
        } else {
            this.menuPosX = constrain(this.menuPosX - width / 8 / this.fps, 0, width / 8);
        }


        //draws menu itself
        rect3(this.menuPosX - width / 16, height / 2, width / 8, height / 1.5, 15);
        rect3(17 * width / 16 - this.menuPosX, height / 2, width / 8, height / 1.5, 15);
        fill(93,63,211);


        //list all visuals
        text("Select a visualisation", this.visPosX + this.menuPosX - width / 8, this.visPosY);
        for(var i = 0; i < this.visuals.length; i++) {
            if(this.selectedVisIndex == i) {
                fill(255);
            } else {
                fill(93,63,211);
            }
            text((i + 1) + " " + this.visuals[i].name, this.visuals[i].x + this.menuPosX - width / 8, this.visuals[i].y);
        }


        //list all songs
        fill(93,63,211);
        text("Select a song", this.songPosX - this.menuPosX, this.songPosY);
        for(var i = 0; i < songs.names.length; i++) {
            if(this.currentSong == i) {
                fill(255);
            } else {
                fill(93,63,211);
            }
            var x  = width / 50;
            text((i + 1) + " " + songs.names[i], this.songPosX - this.menuPosX - x, this.songPosY + (height / 30 * (i + 1)));
        }


        //moving sliders
        if(mouseX >= this.fpsPosX + 6 && mouseX <= this.fpsPosX + this.fpsW &&
            mouseY >= this.fpsPosY && mouseY <= this.fpsPosY + this.fpsH && mouseIsPressed) {
            this.fpsCurPosX = mouseX;
        }

        if(mouseX >= this.divPosX + 6 && mouseX <= this.divPosX + this.divW &&
            mouseY >= this.divPosY && mouseY <= this.divPosY + this.divH && mouseIsPressed) {
            this.divCurPosX = mouseX;
        }


        //fps and spectrum divider sliders
        this.fps = round(map(this.fpsCurPosX, this.fpsPosX + 6, this.fpsPosX + this.fpsW, 5, 60));
        this.div = round(map(this.divCurPosX, this.divPosX + 6, this.divPosX + this.divW, 1, 32));

        textSize(height / 60);
        fill(255);
        rect2(this.fpsPosX - width/8 + this.menuPosX, this.fpsPosY, this.fpsW, this.fpsH, 3);
        rect2(this.divPosX - width/8 + this.menuPosX, this.divPosY, this.divW, this.divH, 3);

        fill(0);
        rect2(this.fpsPosX - width/8 + this.menuPosX, this.fpsPosY, this.fpsCurPosX - this.fpsPosX, this.fpsH, 3);
        rect2(this.divPosX - width/8 + this.menuPosX, this.divPosY, this.divCurPosX - this.divPosX, this.divH, 3);

        fill(255, 0, 0);
        text("fps: "  + this.fps, width/21 + this.menuPosX - width/8, this.fpsPosY + height/55);
        text("Spectrum divider: " + this.div, width/46 + this.menuPosX - width/8, this.divPosY + height/55);


        //Circle visualisation icons
        fill(93,63,211);
        text("Select circle vis icon", width * 1.01 - this.menuPosX, this.imgPosY);
        for(var i = 0; i < icon.names.length; i++) {
            if(this.imageChosen == icon.names[i]) {
                fill(255);
            } else {
                fill(93,63,211);
            }
            text((1 + i) + " " + icon.names[i], this.imgPosX - this.menuPosX, this.imgPosY + (height/30 * (i + 1)));
        }


        //spectrum3 modes
        fill(93,63,211);
        text("Select spectrum3 mode", width * 1.01 - this.menuPosX, this.modePosY);
        if(this.spectrum3Mode == 1) {
            fill(255);
            rect2(this.modePosX - this.menuPosX, this.modePosY + (height/55), width/40, height/20, 5);
            fill(93,63,211);
            rect2(this.modePosX - this.menuPosX + width/25, this.modePosY + (height/55), width/40, height/20, 5);
        } else {
            fill(93,63,211);
            rect2(this.modePosX - this.menuPosX, this.modePosY + (height/55), width/40, height/20, 5);
            fill(255);
            rect2(this.modePosX - this.menuPosX + width/25, this.modePosY + (height/55), width/40, height/20, 5);
        }


        //spectrum3 figures list
        textSize(width / 80);
        fill(0);
        text('1', this.modePosX - this.menuPosX + width/100, this.modePosY + (height/20));
        text('2', this.modePosX - this.menuPosX + width/20.3, this.modePosY + (height/20));
        textSize(width / 120);

        fill(93,63,211);
        text("Select spectrum3 figures", width * 1.01 - this.menuPosX, this.figuresPosY);
        if(this.spectrum3Figures == "triangles") {
            fill(255);
            text("1 triangles", this.figuresPosX - this.menuPosX, this.figuresPosY + (height / 30));
            fill(93,63,211);
            text("2 squares", this.figuresPosX - this.menuPosX, this.figuresPosY + (height / 15));
        } else {
            fill(93,63,211);
            text("1 triangles", this.figuresPosX - this.menuPosX, this.figuresPosY + (height / 30));
            fill(255);
            text("2 squares", this.figuresPosX - this.menuPosX, this.figuresPosY + (height / 15));
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
        text("Use buttons and sliders to change songs, visuals, FPS", -width/4.2, 0);
        text("spectrum size and others", -width/4.2, height / 18.7);
        text("Press (Enter) to close to tutorial", -width/4.2, height / 4.6);
        fill(255);
    }


    //add a new visualisation to the array
    this.addVis = function(vis){
        this.visuals.push(vis);
        vis.x = this.visPosX;
        vis.y = this.visPosY + (height / 30 * this.visuals.length)
        //if selectedVisual is null set the new visual as the
        if(this.selectedVisIndex == null) {
            this.selectedVisIndex = this.visuals.length - 1;
        }
    };
}