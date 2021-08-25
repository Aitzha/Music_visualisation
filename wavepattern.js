//draw the waveform to the screen
function WavePattern() {
	//vis name
	this.name = "wavepattern";

	//draw the wave form to the screen
	this.draw = function() {
		push();
		noFill();
		stroke(255, 0, 0);
		strokeWeight(2);

		beginShape();
		//calculate the waveform from the fft.
		var waveOri = fourier.waveform();
		var divider = spectrumDivider;
		var wave = [];

		for(var i = 0; i < waveOri.length / divider; i++) {
			var cur = 0;
			for(var j = 0; j < divider; j++) {
				cur += waveOri[divider * i + j];
			}
			cur /= divider;
			wave.push(cur);
		}

		for (var i = 0; i < wave.length; i++) {
			//for each element of the waveform map it to screen
			//coordinates and make a new vertex at the point.
			var x = map(i, 0, wave.length, 0, width);
			var y = map(wave[i], -1, 1, height / 4, height * 3 / 4);

			vertex(x, y);
		}

		endShape();
		pop();
	};
}