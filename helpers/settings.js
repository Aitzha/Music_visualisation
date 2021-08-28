function settings() {
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

    // var figuresForSpectrum3 = ["triangle", "squares"];
    // var modesForSpectrum3 = [1, 2];

    //modes for Spectrum
    this.spectrum3Mode = 1;
    this.modePosX = width * 1.03;
    this.modePosY = height / 1.75;

    this.spectrum3Figures = "triangles";
    this.figuresPosX = width * 1.0154;
    this.figuresPosY = height / 1.4;


    this.draw = function(){
        if(mouseX >= this.fpsPosX + 6 && mouseX <= this.fpsPosX + this.fpsW &&
            mouseY >= this.fpsPosY && mouseY <= this.fpsPosY + this.fpsH && mouseIsPressed) {
            this.fpsCurPosX = mouseX;
        }

        if(mouseX >= this.divPosX + 6 && mouseX <= this.divPosX + this.divW &&
            mouseY >= this.divPosY && mouseY <= this.divPosY + this.divH && mouseIsPressed) {
            this.divCurPosX = mouseX;
        }

        this.fps = round(map(this.fpsCurPosX, this.fpsPosX + 6, this.fpsPosX + this.fpsW, 5, 60));
        this.div = round(map(this.divCurPosX, this.divPosX + 6, this.divPosX + this.divW, 1, 32));

        textSize(height / 60);
        fill(255);
        rect2(this.fpsPosX - width/8 + menu.posX, this.fpsPosY, this.fpsW, this.fpsH, 3);
        rect2(this.divPosX - width/8 + menu.posX, this.divPosY, this.divW, this.divH, 3);

        fill(0);
        rect2(this.fpsPosX - width/8 + menu.posX, this.fpsPosY, this.fpsCurPosX - this.fpsPosX, this.fpsH, 3);
        rect2(this.divPosX - width/8 + menu.posX, this.divPosY, this.divCurPosX - this.divPosX, this.divH, 3);

        fill(255, 0, 0);
        text("fps: "  + this.fps, width/21 + menu.posX - width/8, this.fpsPosY + height/55);
        text("Spectrum divider: " + this.div, width/46 + menu.posX - width/8, this.divPosY + height/55);





        fill(93,63,211);
        text("Select circle vis icon", width * 1.01 - menu.posX, this.imgPosY);
        for(var i = 0; i < icon.names.length; i++) {
            if(this.imageChosen == icon.names[i]) {
                fill(255);
            } else {
                fill(93,63,211);
            }
            text((1 + i) + " " + icon.names[i], this.imgPosX - menu.posX, this.imgPosY + (height/30 * (i + 1)));
        }




        fill(93,63,211);
        text("Select spectrum3 mode", width * 1.01 - menu.posX, this.modePosY);
        if(this.spectrum3Mode == 1) {
            fill(255);
            rect2(this.modePosX - menu.posX, this.modePosY + (height/55), width/40, height/20, 5);
            fill(93,63,211);
            rect2(this.modePosX - menu.posX + width/25, this.modePosY + (height/55), width/40, height/20, 5);
        } else {
            fill(93,63,211);
            rect2(this.modePosX - menu.posX, this.modePosY + (height/55), width/40, height/20, 5);
            fill(255);
            rect2(this.modePosX - menu.posX + width/25, this.modePosY + (height/55), width/40, height/20, 5);
        }

        textSize(width / 80);
        fill(0);
        text('1', this.modePosX - menu.posX + width/100, this.modePosY + (height/20));
        text('2', this.modePosX - menu.posX + width/20.3, this.modePosY + (height/20));
        textSize(width / 120);




        fill(93,63,211);
        text("Select spectrum3 figures", width * 1.01 - menu.posX, this.figuresPosY);
        if(this.spectrum3Figures == "triangles") {
            fill(255);
            text("1 triangles", this.figuresPosX - menu.posX, this.figuresPosY + (height / 30));
            fill(93,63,211);
            text("2 squares", this.figuresPosX - menu.posX, this.figuresPosY + (height / 15));
        } else {
            fill(93,63,211);
            text("1 triangles", this.figuresPosX - menu.posX, this.figuresPosY + (height / 30));
            fill(255);
            text("2 squares", this.figuresPosX - menu.posX, this.figuresPosY + (height / 15));
        }

    }
}