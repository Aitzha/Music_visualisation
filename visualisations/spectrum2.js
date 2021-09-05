function Spectrum2(){
    //name of the function
    this.name = "spectrum #2";

    //x and y position of name of visual in menu and its width w
    this.x = 0;
    this.y = 0;
    this.w = textWidth(this.name);

    this.draw = function(){
        push();
        var spectrumOri = fourier.analyze();
        var divider = settings.div;
        var spectrum = [];

        //decrease number of frequencies in spectrum original
        for(var i = 0; i < spectrumOri.length / divider; i++) {
            var cur = 0;
            for(var j = 0; j < divider; j++) {
                cur += spectrumOri[divider * i + j];
            }
            cur /= divider;
            spectrum.push(cur);
        }

        stroke(0);
        var weight = map(divider, 1, 32, 0, 5);
        strokeWeight(weight);

        for (var i = 0; i < spectrum.length; i++){
            //vertical second version
            var x1 = map(i, 0, spectrum.length, width / 2, width);
            var x2 = map(i, 0, spectrum.length, width / 2, 0);
            var y = map(spectrum[i], 0, 255, height / 2, 0);
            var h = map(spectrum[i], 0, 255, 0, height);
            fill(spectrum[i], 0, 255 - spectrum[i]);
            rect(x1, y, (width / 2) / spectrum.length, h);
            rect(x2, y, (width / 2) / spectrum.length, h);
        }

        pop();
    };
}