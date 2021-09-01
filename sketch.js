//global for the controls and input 
var controls = null;
//variable for the p5 sound object
var songs = null;
//variable for p5 fast fourier transform
var fourier;
var amplitude;
//images which will be used in circle
//variable like graphical user interface, fps (frames per second) and font
var myFont;

var settings;
var audioPlayer;
var icon;

function preload(){
	songs = new SongsList();
	songs.names.push("Electroman Adventure");
	songs.list.push(loadSound("assets/ElectromanAdverture.mp3"));
	songs.names.push("Game on");
	songs.list.push(loadSound('assets/GameOn.mp3'));
	songs.names.push("Titanium");
	songs.list.push(loadSound("assets/Titanium.mp3"));
	songs.names.push("cool song");
	songs.list.push(loadSound("assets/stomper_reggae_bit.mp3"));

	icon = new Images();
	icon.names.push("Apples ITunes Logo");
	icon.images.push(loadImage("assets/Applemusicandroid-512.png"));

	icon.names.push("Loremaster");
	icon.images.push(loadImage("assets/Loremaster.png"));

	icon.names.push("House Music");
	icon.images.push(loadImage("assets/headphones.png"));
}

function setup(){
	createCanvas(windowWidth, windowHeight, WEBGL);
	smooth();

	controls = new ControlsAndInput();

	settings = new Settings();
	settings.menuPosX = width / 8;
	settings.imageChosen = "House Music";
	settings.addVis(new Spectrum());
	settings.addVis(new Spectrum2());
	settings.addVis(new Spectrum3());
	settings.addVis(new Circle());
	settings.addVis(new Triangle());

	// audioPlayer = new audioPlayer();





	//instantiate the fft object
	fourier = new p5.FFT();
	amplitude = new p5.Amplitude();

	//create graphical user interface


	//add font
	myFont = loadFont("fonts/cubano-regular-webfont.woff");
	textFont(myFont);


	//add position and size of pics
	icon.x.push(width / 2 - height / 3 - 7); icon.y.push(height / 6 - 7); icon.width.push(height / 1.5 + 17);
	icon.x.push(width / 2 - height / 5); icon.y.push(height / 4); icon.width.push(0);
	icon.x.push(width / 2 - height / 4 + 7); icon.y.push(height / 4 - 10); icon.width.push(height / 2);
}

function draw(){
	//draw background
	background(0);

	//update frame rate
	frameRate(settings.fps);

	//tutorial
	if(!settings.tutorial) {
		settings.drawTutorial();
		for(var i = 0; i < settings.visuals.length; i++) {
			textSize(width / 120);
			settings.visuals[i].w = textWidth(settings.visuals[i].name);
		}
	} else {
		//draw the selected visualisation
		translate(-width / 2, -height / 2);
		settings.visuals[settings.selectedVisIndex].draw();
		settings.draw();

		//draw the controls on top.
		controls.draw();
		// audioPlayer.draw();
	}
}

//draws rectangle with rounded angles and have parameters as in rectMode(CORNER)
function rect2(x, y, w, h, r){
	noStroke();
	var d = r * 2;
	circle(x + r, y + r, d);
	circle(x + w - r, y + r, d);
	circle(x + r, y + h - r, d);
	circle(x + w - r, y + h - r, d);
	rectMode(CORNER);
	rect(x + r, y, w - (2 * r), h);
	rect(x, y + r, w, h - (2 * r));
}

//draws rectangle with rounded angles and have parameters as in rectMode(CENTER)
function rect3(x, y, w, h, r){
	noStroke();
	var w2 = w / 2;
	var h2 = h / 2;
	var d = r * 2;

	arc(x + r - w2, y + r - h2, d, d, PI, PI * 3 / 2);
	arc(x - r + w2, y + r - h2, d, d, PI * 3 / 2, 0);
	arc(x + r - w2, y - r + h2, d, d, PI / 2, PI);
	arc(x - r + w2, y - r + h2, d, d, 0, PI / 2);

	rectMode(CENTER);
	rect(x, y, w - d, h);
	rect(x, y, w, h - d);
	rectMode(CORNER);
}

function mouseClicked(){
	controls.mousePressed();
}


function keyPressed(){
	controls.keyPressed(keyCode);
}


function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
