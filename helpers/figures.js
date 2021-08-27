function Figures() {
    this.xPos = [];
    this.yPos = [];

    this.xVelocity = [];
    this.yVelocity = [];

    this.curX = [];
    this.curY = [];
    this.curZ = [];

    this.xRotate = [];
    this.yRotate = [];
    this.zRotate = [];

    this.brightness = [];
    this.n = 50;
    this.created = false;

    this.draw = function() {
        this.generate();

        for(var i = 0; i < this.n; i++) {
            push();
            translate(this.xPos[i], this.yPos[i], -20);
            rotateX(this.curX[i]);
            rotateY(this.curY[i]);
            rotateZ(this.curZ[i]);

            rectMode(CENTER);
            this.brightness[i] = map(abs(this.yPos[i]), 0, height / 4, 0, 255);

            if(figuresForSpectrum3 == "triangle") {
                //glowing effect
                for(var j = 1; j < 5; j++) {
                    strokeWeight(0.5);
                    stroke(0, 0, this.brightness[i] - (50 * j) - 100);
                    var h = j / 4;
                    triangle(0, -(15 + h * 2), 13 + h, 7.5 + h, -(13 + h), 7.5 + h);
                }
                //triangle
                stroke(this.brightness[i] - 100);
                triangle(0, -15, 13, 7.5, -13, 7.5);
            } else {
                //glowing effect
                for(var j = 1; j < 5; j++) {
                    strokeWeight(0.5);
                    stroke(0, 0, this.brightness[i] - (50 * j) - 100);
                    rect(0, 0, 30 + j / 2, 30 + j / 2);
                }
                //rectangle
                stroke(this.brightness[i] - 100);
                rect(0, 0, 30, 30);
            }


            this.xPos[i] += this.xVelocity[i] / fps;
            this.yPos[i] += this.yVelocity[i] / fps;

            this.curX[i] += this.xRotate[i] / fps;
            this.curY[i] += this.yRotate[i] / fps;
            this.curZ[i] += this.zRotate[i] / fps;
            pop();
        }
    }


    this.generate = function() {
        if(songs.list[menu.currentSong].isPlaying()) {
            for(var i = 0; i < this.n; i++) {
                if(abs(this.xPos[i]) > width / 2 || abs(this.yPos[i]) > height / 2) {
                    this.xPos[i] = random(-width / 3, width / 3);
                    this.yPos[i] = random(-1, 1);
                    while(this.xPos[i] == 0 && this.yPos[i] == 0) {
                        this.xPos[i] = random(-width / 2, width / 2);
                        this.yPos[i] = random(-1, 1);
                    }

                    if(this.xPos[i] > 0) {
                        this.xVelocity[i] = random(20, 50);
                    } else {
                        this.xVelocity[i] = random(-20, -50);
                    }

                    if(this.yPos[i] > 0) {
                        this.yVelocity[i] = random(20, 50);
                    } else {
                        this.yVelocity[i] = random(-20, -50);
                    }

                    this.curX[i] = random(0, PI);
                    this.curY[i] = random(0, PI);
                    this.curZ[i] = random(0, PI);

                    this.xRotate[i] = random(PI / 4, PI / 2);
                    this.yRotate[i] = random(PI / 4, PI / 2);
                    this.zRotate[i] = random(PI / 4, PI / 2);

                    this.brightness[i] = 1;

                }
            }
        }
        if(!this.created) {
            this.created = true;
            for(var i = 0; i < this.n; i++) {
                this.xPos.push(width);
                this.yPos.push(random(-1, 1));
                while(this.xPos[i] == 0 && this.yPos[i] == 0) {
                    this.xPos.push(random(-width / 2, width / 2));
                    this.yPos.push(random(-1, 1));
                }

                if(this.xPos[i] > 0) {
                    this.xVelocity.push(random(20, 50));
                } else {
                    this.xVelocity.push(random(-20, -50));
                }

                if(this.yPos[i] > 0) {
                    this.yVelocity.push(random(20, 50));
                } else {
                    this.yVelocity.push(random(-20, -50));
                }

                this.curX.push(random(0, PI));
                this.curY.push(random(0, PI));
                this.curZ.push(random(0, PI));

                this.xRotate.push(random(PI / 4, PI / 2));
                this.yRotate.push(random(PI / 4, PI / 2));
                this.zRotate.push(random(PI / 4, PI / 2));

                this.brightness.push(1);
            }
        }
    }
}