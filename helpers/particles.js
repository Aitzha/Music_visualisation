function Particles() {
    this.pPosX = [];
    this.pPosY = [];
    this.pVelocityX = [];
    this.pVelocityY = [];
    this.pDarkness = [];
    this.n = 300;
    this.created = false;

    this.draw = function() {
        this.regenerate();

        for(var i = 0; i < this.n; i++) {
            fill(255 - this.pDarkness[i], 255 - this.pDarkness[i], 255 - this.pDarkness[i]);
            strokeWeight(1);
            stroke(0, 0, 255 - this.pDarkness[i]);
            if(dist(width / 2, height / 2, this.pPosX[i], this.pPosY[i]) >= height / 4) {
                push();
                translate(0, 0, 0.5);
                ellipse(this.pPosX[i], this.pPosY[i], 2);
                this.pDarkness[i]  += 10 / settings.fps;
                pop();
            }
            this.pPosX[i] += this.pVelocityX[i] / settings.fps;
            this.pPosY[i] += this.pVelocityY[i] / settings.fps;
        }
    }


    this.regenerate = function() {
        if(songs.list[menu.currentSong].isPlaying()) {
            for(var i = 0; i < this.n; i++) {
                if(this.pDarkness[i] >= 255 ||
                this.pPosX[i] < 0 || this.pPosX[i] > width ||
                this.pPosY[i] < 0 || this.pPosY[i] > height) {

                    this.pPosX[i] = width / 2;
                    this.pPosY[i] = height / 2;
                    while(abs(this.pVelocityX[i]) + abs(this.pVelocityY[i]) < 7) {
                        this.pVelocityX[i] = random(-30, 30);
                        this.pVelocityY[i] = random(-30, 30);
                    }
                    this.pDarkness[i] = -random(200, 300);
                }
            }
        }
        if(!this.created) {
            this.created = true;
            for(var i = 0; i < this.n; i++) {
                this.pPosX.push(width / 2);
                this.pPosY.push(height / 2);
                this.pVelocityX.push(0);
                this.pVelocityY.push(0);
                this.pDarkness.push(255);
            }
        }
    }
}