//Constructor function to handle the onscreen menu, keyboard and mouse
//controls
function ControlsAndInput(){
	//playback button displayed in the top left of the screen
	this.playbackButton = new PlaybackButton();

	//make the window fullscreen or revert to windowed
	this.mousePressed = function(){
		if(this.playbackButton.hitCheck());

		console.log(settings.selectedVisIndex);

		//changes visuals
		var selectedVis = -1;
		textSize(width / 120);
		for(var i = 0; i < settings.visuals.length; i++) {
			var x = settings.visuals[i].x + settings.menuPosX - width / 8;
			var y = settings.visuals[i].y;
			var w = settings.visuals[i].w + textWidth(i + 1 + " ");
			var h = width / 120;

			if(mouseX >= x && mouseX <= w + x && mouseY >= y - h && mouseY <= y) {
				selectedVis = i;
			}
		}

		if(selectedVis != -1) {
			settings.selectedVisIndex = selectedVis;
		}

		//change songs
		var selectedSong = -1;
		textSize(width / 120);
		for(var i = 0; i < songs.names.length; i++) {
			var x = settings.songPosX - settings.menuPosX - width / 50;
			var y = settings.songPosY + (height / 30 * (i + 1));
			var w = textWidth(i + 1 + " " + songs.names[i]);
			var h = width / 120;

			if(mouseX >= x && mouseX <= w + x && mouseY >= y - h && mouseY <= y) {
				selectedSong = i;
			}
		}

		if(selectedSong != -1) {
			if(this.playbackButton.playing) {
				songs.list[settings.currentSong].pause();
				songs.list[selectedSong].loop();
			}
			settings.currentSong = selectedSong;
		}

		//change images
		var selectedImage = -1;
		textSize(width / 120);
		for(var i = 0; i < icon.names.length; i++) {
			var x = settings.imgPosX - settings.menuPosX;
			var y = settings.imgPosY + (height / 30 * (i + 1));
			var w = textWidth(i + 1 + " " + icon.names[i]);
			var h = width / 120;

			if(mouseX >= x && mouseX <= w + x && mouseY >= y - h && mouseY <= y) {
				selectedImage = i;
			}
		}

		if(selectedImage != -1) {
			settings.imageChosen = icon.names[selectedImage];
		}


		//change spectrum3 mode
		var x1 = settings.modePosX - settings.menuPosX;
		var y = settings.modePosY + (height/55);
		var x2 = x1 + width/25;
		var w = width/40;
		var h = height/20;
		if(mouseX >= x1 && mouseX <= x1 + w && mouseY >= y && mouseY <= h + y) {
			settings.spectrum3Mode = 1;
		} else if(mouseX >= x2 && mouseX <= x2 + w && mouseY >= y && mouseY <= h + y) {
			settings.spectrum3Mode = 2;
		}


		//change spectrum3 figure
		var x = settings.figuresPosX - settings.menuPosX;
		var y1 = settings.figuresPosY + (height/30);
		var y2 = settings.figuresPosY + (height/15);
		var w1 = textWidth("1 triangles");
		var w2 = textWidth("2 squares");
		var h = height/120;
		if(mouseX >= x && mouseX <= x + w1 && mouseY >= y1 - h && mouseY <= y1) {
			settings.spectrum3Figures = "triangles";
		} else if(mouseX >= x && mouseX <= x + w2 && mouseY >= y2 - h && mouseY <= y2) {
			settings.spectrum3Figures = "squares";
		}
	};



	//responds to keyboard presses
	//@param keycode the ascii code of the keypressed
	this.keyPressed = function(keycode){
		console.log(keycode);
		if(keycode == 32 && settings.tutorial == true){
			settings.menuOpen = !settings.menuOpen
		}

		if(keycode == 13) {
			settings.tutorial = true;
		}

		if(keycode > 48 && keycode < 58){
			var visNumber = keycode - 49;
			settings.visuals[settings.selectedVisIndex].used = false;
			settings.visuals[visNumber].used = true;
			settings.selectedVisIndex = visNumber;
		}
	};


	//draws the playback button and potentially the menu
	this.draw = function(){
		push();
		fill("white");
		stroke("black");
		strokeWeight(2);
		textSize(width / 120);

		//playback button 
		this.playbackButton.draw();
		pop();
	};
}


