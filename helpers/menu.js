function Menu(){
    this.tutorial = false;
    this.open = true;
    this.posX = 0;

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


}
