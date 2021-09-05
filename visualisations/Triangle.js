function Triangle() {
    //name of the function
    this.name = "triangle";

    //x and y position of name of visual in menu and its width w
    this.x = 0;
    this.y = 0;
    this.w = textWidth(this.name);
    this.particles = new Particles();
    this.particles.mode = "triangle";

    this.draw = function() {
        push();
        //moves it along the z axis proportionally amp
        var amp = amplitude.getLevel();
        this.particles.draw();
        amp = map(amp, 0 ,1, 0, 150);
        translate(width/2, height/2.25, amp);

        var spectrumOri = fourier.analyze();
        var divider =  settings.div * 2;
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

        for(var i = 0; i < 3; i++) {
            noStroke();
            fill(200 + amp);
            var x1 = -(1.748 * height / 7);
            var x2 = (1.748 * height / 7);
            var y = -height/7;
            var w = (x2 - x1) / spectrum.length;
            for(var j = 0; j < spectrum.length; j++) {
                var h = map(spectrum[j], 0, 255, 10, height/10);
                rectMode(CENTER);
                circle(x1 + (w/2) + (w*j), y - h, w - width/400);
                rect(x1 + (w/2) + (w*j), y - (h/2), w - width/400, h);
            }

            stroke(200 + amp, 200 + amp, 0);
            strokeWeight(width/350);
            line(-(1.748 * height / 7), -height/7, (1.748 * height / 7), -height/7);

            rotateZ(2*PI/3);
        }
        pop();
    }
}