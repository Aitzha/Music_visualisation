function Spectrum(){
	this.name = "spectrum";

	this.draw = function(){
		push();
		var spectrumOri = fourier.analyze();
		var divider = spectrumDivider;
		var spectrum = [];

		for(var i = 0; i < spectrumOri.length / divider; i++) {
			var cur = 0;
			for(var j = 0; j < divider; j++) {
				cur += spectrumOri[divider * i + j];
			}
			cur /= divider;
			spectrum.push(cur);
		}

		noStroke();


		for(var i = 0; i < spectrum.length; i++){

			//fade the colour of the bin from green to red
			var g = map(spectrum[i], 0, 255, 255, 0);
			fill(spectrum[i], g, 0);

			//draw each bin as a rectangle from the left of the screen
			//across
			var y = map(i, 0, spectrum.length, 0, height);
			var w = map(spectrum[i], 0, 255, 0, width);
			rect(0, y, w, height/spectrum.length);
		}  		
		pop();
	};
}
