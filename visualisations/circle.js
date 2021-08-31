function Circle(){
    this.name = "circle";
    this.x = 0;
    this.y = 0;
    this.w = textWidth(this.name);
    this.particles = new Particles();
    this.initialAngle = 0;

    this.draw = function(){
        push();
        this.initialAngle += PI / 60 / settings.fps;

        var spectrumOri = fourier.analyze();
        var divider =  settings.div;
        var spectrum = [];


        //decrease number of frequencies in spectrum original
        for(var i = 0; i < spectrumOri.length / divider; i++) {
            var cur = 0;
            for(var j = 0; j < min(divider, spectrumOri.length - divider * i); j++) {
                cur += spectrumOri[divider * i + j];
            }
            cur /= divider;
            spectrum.push(cur);
        }

        //draw white background behind the picture. We need to use .png pictures so white background would be visible
        fill(255);
        rect(width / 2 - height / 4 - 10, height / 4 - 10, height / 2 + 20, height / 2 + 20);

        //draw selected image
        for(var i = 0; i < icon.names.length; i++) {
            if(settings.imageChosen == icon.names[i]) {
                if(icon.width[i] == 0) {
                    image(icon.images[i], icon.x[i], icon.y[i]);
                } else {
                    image(icon.images[i], icon.x[i], icon.y[i], icon.width[i], icon.width[i]);
                }
            }
        }


        // circle properties that we will use
        var circleX = width / 2;
        var circleY = height / 2;
        var r = height / 4;


        // cut the image so it won't cross circle boarder
        var numberOfRectangle = 50;
        var rotateAngleRectangles = 2 * PI / numberOfRectangle;
        fill(0);
        noStroke();
        for(var i = 0; i < numberOfRectangle; i++) {
            push();
            translate(width / 2, height / 2);
            rectMode(CORNER);
            //rotate canvas
            rotateZ(rotateAngleRectangles * i);

            //draw the rectangle
            rect(-(width / 2), r, width, width / 2);
            pop();
        }


        //draw circles around pic to make glowing effect
        noFill();
        strokeWeight(5);
        var strokeColor = 255;
        var darkness = 0;
        var curR = r;

        while(darkness < 255) {
            stroke(120 - darkness, 120 - darkness, strokeColor - darkness);
            ellipse(width / 2, height / 2, 2 * curR, 2 * curR, 50);
            darkness += 2;
            curR += 2;
        }


        //draw particles
        this.particles.draw();


        //draw spectrum around circle
        var rotateAngle = 2 * PI / spectrum.length;
        noStroke();
        for (var i = 0; i < spectrum.length; i++){
            push();
            translate(width / 2, height / 2, 1);
            rectMode(CENTER);
            //rotate and fill with own color
            rotateZ(rotateAngle * i + this.initialAngle);
            fill(2 * spectrum[i], 0, 255 - (2 * spectrum[i]));

            //calculate width, height and position
            var w = 2 * PI * r / spectrum.length - 5;
            var h = map(spectrum[i], 0, 255, 20, r);
            var y = -r - (h / 2);

            rect(0, y, w, h - 20);
            circle(0, (-r - 10), w);
            circle(0, y - (h / 2) + 10, w);
            pop();
        }
        pop();

    };
}
