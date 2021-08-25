//Constructor function to handle the onscreen menu, keyboard and mouse
//controls
function ControlsAndInput(){
	
	//playback button displayed in the top left of the screen
	this.playbackButton = new PlaybackButton();

	//make the window fullscreen or revert to windowed
	this.mousePressed = function(){
		if(this.playbackButton.hitCheck());
	};

	//responds to keyboard presses
	//@param keycode the ascii code of the keypressed
	this.keyPressed = function(keycode){
		console.log(keycode);
		if(keycode == 32 && menu.tutorial == true){
			this.menuDisplayed = !this.menuDisplayed;
			menu.open = !menu.open
		}

		if(keycode == 13) {
			menu.tutorial = true;
		}

		if(keycode > 48 && keycode < 58){
			var visNumber = keycode - 49;
			vis.selectVisual(vis.visuals[visNumber].name); 
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
		text("Select a visualisation", width / 50 + menu.posX - width / 8, height / 5);
		this.menu();
		pop();

	};

	this.menu = function(){
		for(var i = 0; i < vis.visuals.length; i++) {
			text(vis.visuals[i].name, width / 50 + menu.posX - width / 8, height / 5 + (height / 30 * (i + 1)));
		}
	};
}


