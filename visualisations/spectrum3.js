function Spectrum3() {
    this.name = "spectrum #3";
    this.x = 0;
    this.y = 0;
    this.w = textWidth(this.name);
    this.used = false;
    this.figures = new Figures();

    this.draw = function(){
        push();
        var spectrumOri = fourier.analyze();
        var divider = settings.div;
        var spectrum = [];

        for(var i = 0; i < spectrumOri.length / divider; i++) {
            var cur = 0;
            for(var j = 0; j < divider; j++) {
                cur += spectrumOri[divider * i + j];
            }
            cur /= divider;
            spectrum.push(cur);
        }



        noFill();
        strokeWeight(1);
        translate(width / 2, height / 2);

        this.figures.draw();
        stroke(0 ,0, 255);

        if(modesForSpectrum3 == 1) {
            for(var i = 0; i < 4; i++) {
                beginShape();
                for(var j = 0; j < spectrum.length; j++) {
                    var x = map(j, 0, spectrum.length - 1, 0, width / 2);
                    var y = pow(spectrum[j] / 10, 3);
                    y = map(y, 0, 16582, -height / 100, height / 4);
                    if(y < 0) {
                        y = 0;
                    }
                    if(i == 0) {
                        vertex(x, -y);
                    }
                    if(i == 1) {
                        vertex(x, y);
                    }
                    if(i == 2) {
                        vertex(-x, -y);
                    }
                    if(i == 3) {
                        vertex(-x, y);
                    }
                }
                endShape();
            }

            for(var j = 0; j < spectrum.length; j++) {
                var x = map(j, 0, spectrum.length - 1, 0, width / 2);
                var y = pow(spectrum[j] / 10, 3);
                y = map(y, 0, 16582, -height / 100, height / 4);
                if(y < 0) {
                    y = 0;
                }
                line(x, y, x, -y);
                line(-x, y, -x, -y);
            }
        } else {
            for(var j = 0; j < spectrum.length; j++) {
                var x = map(j, 0, spectrum.length - 1, 0, width / 2);
                var y = map(spectrum[j], 0, 255, 0, height / 4);
                triangle(0, 0, x, y, x, -y);
                triangle(0, 0, -x, y, -x, -y);
            }
        }

        pop();
    }
}