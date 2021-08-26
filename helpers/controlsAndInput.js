//Constructor function to handle the onscreen menu, keyboard and mouse
//controls
function ControlsAndInput(){
	//playback button displayed in the top left of the screen
	this.playbackButton = new PlaybackButton();

	//make the window fullscreen or revert to windowed
	this.mousePressed = function(){
		if(this.playbackButton.hitCheck());

		var selected = -1;
		textSize(width / 120);
		for(var i = 0; i < menu.visuals.length; i++) {
			var x = menu.visuals[i].x + menu.posX - width / 8;
			var y = menu.visuals[i].y;
			var w = menu.visuals[i].w + textWidth(i + 1 + " ");
			var h = width / 120;

			if(mouseX >= x && mouseX <= w + x && mouseY >= y - h && mouseY <= y) {
				selected = i;
			}
		}

		if(selected != -1) {
			menu.visuals[menu.selectedVisIndex].used = false;
			menu.visuals[selected].used = true;
			menu.selectedVisIndex = selected;
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


