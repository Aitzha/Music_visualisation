//Constructor function to handle the onscreen menu, keyboard and mouse
//controls
function ControlsAndInput(){
	//playback button displayed in the top left of the screen
	this.playbackButton = new PlaybackButton();

	//make the window fullscreen or revert to windowed
	this.mousePressed = function(){
		if(this.playbackButton.hitCheck());

		//changes visuals
		var selectedVis = -1;
		textSize(width / 120);
		for(var i = 0; i < menu.visuals.length; i++) {
			var x = menu.visuals[i].x + menu.posX - width / 8;
			var y = menu.visuals[i].y;
			var w = menu.visuals[i].w + textWidth(i + 1 + " ");
			var h = width / 120;

			if(mouseX >= x && mouseX <= w + x && mouseY >= y - h && mouseY <= y) {
				selectedVis = i;
			}
		}

		if(selectedVis != -1) {
			menu.visuals[menu.selectedVisIndex].used = false;
			menu.visuals[selectedVis].used = true;
			menu.selectedVisIndex = selectedVis;
		}

		//change songs
		var selectedSong = -1;
		textSize(width / 120);
		for(var i = 0; i < songs.names.length; i++) {
			var x = menu.songX - menu.posX - width / 50;
			var y = menu.songY + (height / 30 * (i + 1));
			var w = textWidth(i + 1 + " " + songs.names[i]);
			var h = width / 120;

			if(mouseX >= x && mouseX <= w + x && mouseY >= y - h && mouseY <= y) {
				selectedSong = i;
			}
		}

		if(selectedSong != -1) {
			if(this.playbackButton.playing) {
				songs.list[menu.currentSong].pause();
				songs.list[selectedSong].loop();
			}
			menu.currentSong = selectedSong;
		}

		//change images
		var selectedImage = -1;
		textSize(width / 120);
		for(var i = 0; i < icon.names.length; i++) {
			var x = settings.imgPosX - menu.posX;
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
	};






	//responds to keyboard presses
	//@param keycode the ascii code of the keypressed
	this.keyPressed = function(keycode){
		console.log(keycode);
		if(keycode == 32 && menu.tutorial == true){
			this.menuDisplayed = !this.menuDisplayed;
			menu.menuOpen = !menu.menuOpen
		}

		if(keycode == 13) {
			menu.tutorial = true;
		}

		if(keycode > 48 && keycode < 58){
			var visNumber = keycode - 49;
			menu.visuals[menu.selectedVisIndex].used = false;
			menu.visuals[visNumber].used = true;
			menu.selectedVisIndex = visNumber;
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


