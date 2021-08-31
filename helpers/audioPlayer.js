function audioPlayer() {
    this.height = height / 10;
    this.width = width / 1.3;
    this.posX = width / 2;
    this.posY = height - this.height / 1.5;

    this.buttonPosX = this.posX - width / 2.75;
    this.buttonPosY = height - this.height / 1.26;
    this.buttonW = width / 80;
    this.buttonH = height / 40;

    this.audioLinePosX1 = this.posX - width / 3;
    this.audioLinePosX2 = this.posX + width / 3;
    this.audioLineH = height / 120;

    this.draw = function(){
        fill(137,207,240,200);
        rect3(this.posX, this.posY, this.width, this.height, 7);

        fill(255);
        if(songs.list[settings.currentSong].isPlaying()){
            rect(this.buttonPosX, this.buttonPosY, this.buttonW/2 - 2, this.buttonH);
            rect(this.buttonPosX + (this.buttonW/2 + 2), this.buttonPosY, this.buttonW/2 - 2, this.buttonH);
        }
        else{
            triangle(this.buttonPosX, this.buttonPosY, this.buttonPosX + this.buttonW, this.buttonPosY + this.buttonH/2, this.buttonPosX, this.buttonPosY+this.buttonH);

        }

        rectMode(CORNERS);
        circle(this.audioLinePosX1, this.posY, this.audioLineH * 2);
        rect(this.audioLinePosX1, this.posY - this.audioLineH, this.audioLinePosX2, this.posY + this.audioLineH);
        circle(this.audioLinePosX2, this.posY, this.audioLineH * 2);

        fill(255, 0, 0);
        var songTime = songs.list[settings.currentSong].currentTime() / songs.list[settings.currentSong].duration();
        var curTime = map(songTime, 0, 1, this.audioLinePosX1, this.audioLinePosX2);

        circle(this.audioLinePosX1, this.posY, this.audioLineH * 2);
        rect(this.audioLinePosX1, this.posY - this.audioLineH, curTime, this.posY + this.audioLineH);
        circle(curTime, this.posY, this.audioLineH * 2 + 5);
        rectMode(CORNER);
    };

    //checks for clicks on the button, starts or pauses playback.
    //@returns true if clicked false otherwise.
    this.hitCheck = function(){
        if(mouseX > this.buttonPosX && mouseX < this.buttonPosX + this.buttonW && mouseY > this.buttonPosY && mouseY < this.buttonPosY + this.buttonH){
            if (songs.list[settings.currentSong].isPlaying()) {
                songs.list[settings.currentSong].stop();
            } else {
                songs.list[settings.currentSong].loop();
            }
            return true;
        }
        return false;
    };
}