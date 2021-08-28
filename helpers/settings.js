function settings() {
    this.fpsPosX = width / 60;
    this.fpsPosY = height / 1.4;
    this.fpsW = width / 11;
    this.fpsH = height / 45;
    this.fpsCurPosX = ((2 * this.fpsPosX) + this.fpsW) / 2;
    this.fps = 30;

    this.divPosX = width / 60;
    this.divPosY = height / 1.3;
    this.divW = width / 11;
    this.divH = height / 45;
    this.divCurPosX = ((2 * this.fpsPosX) + this.fpsW) / 2;
    this.div = 16;


    this.draw = function(){
        push();
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
        pop();
    }
}