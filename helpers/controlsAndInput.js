//Constructor function to handle the onscreen menu, keyboard and mouse
//controls
function ControlsAndInput(){
	this.selected = 0;
	
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
				console.log("mouseX " + mouseX);
				console.log("width " + w);
				console.log("width " + x + w);
				console.log('x ' + x);
				selected = i;
			}
		}

		if(selected != -1) {
			menu.visuals[this.selected].used = false;
			menu.visuals[selected].used = true;
			this.selected = selected;
			menu.selectedVisual = menu.visuals[selected];
		}

	};

	//responds to keyboard presses
	//@param keycode the ascii code of the keypressed
	this.keyPressed = function(keycode){
		console.log(keycode);
		if(keycode == 32 && menu.tutorial == true){
			this.menuDisplayed = !this.menuDisplayed;
			menu.menuOPen = !menu.menuOPen
		}

		if(keycode == 13) {
			menu.tutorial = true;
		}

		if(keycode > 48 && keycode < 58){
			var visNumber = keycode - 49;
			menu.selectedVisual = menu.visuals[visNumber];
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
		//only draw the menu if menu displayed is set to true.

		fill(93,63,211);
		// text("Select a visualisation", vis.x + menu.posX - width / 8, vis.y);
		text("Select a visualisation", menu.x + menu.posX - width / 8, menu.y);
		this.menu();
		pop();

	};

	this.menu = function(){
		for(var i = 0; i < menu.visuals.length; i++) {
			if(menu.visuals[i].used) {
				fill(255);
			} else {
				fill(93,63,211);
			}
			text((i + 1) + " " + menu.visuals[i].name, menu.visuals[i].x + menu.posX - width / 8, menu.visuals[i].y);
		}
	};
}


