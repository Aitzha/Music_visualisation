//global for the controls and input 
var controls = null;
//variable for the p5 sounds objects
var songs = null;
//variable for p5 fast fourier transform
var fourier;
//variable for amplitude of the current sound
var amplitude;
//variable that saves images which will be used in circle visual
var icon;
//variable for font of text
var myFont;
//global for showing menu and settings for user and stores data about current sound
var settings;


function preload(){
	//preload all sounds
	songs = new SongsList();
	songs.names.push("Electroman Adventure");
	songs.list.push(loadSound("assets/ElectromanAdverture.mp3"));
	songs.names.push("Game on");
	songs.list.push(loadSound('assets/GameOn.mp3'));
	songs.names.push("Titanium");
	songs.list.push(loadSound("assets/Titanium.mp3"));
	songs.names.push("Jack in the club");
	songs.list.push(loadSound("assets/Jack_in_the_club.mp3"));
	songs.names.push("Ritual");
	songs.list.push(loadSound("assets/Ritual.mp3"));

	//preload all images
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

	//initialization of global variables and adding new visuals
	controls = new ControlsAndInput();

	settings = new Settings();
	settings.menuPosX = width / 8;
	settings.imageChosen = "House Music";
	settings.addVis(new Spectrum());
	settings.addVis(new Spectrum2());
	settings.addVis(new Spectrum3());
	settings.addVis(new Circle());
	settings.addVis(new Triangle());


	//instantiate the fft object and amplitude
	fourier = new p5.FFT();
	amplitude = new p5.Amplitude();


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

	//showing tutorial
	if(!settings.tutorial) {
		settings.drawTutorial();
		for(var i = 0; i < settings.visuals.length; i++) {
			textSize(width / 120);
			settings.visuals[i].w = textWidth(settings.visuals[i].name);
		}
	} else {
		//when tutorial is shown music visualisation is displayed

		//draw the selected visualisation
		translate(-width / 2, -height / 2);
		settings.visuals[settings.selectedVisIndex].draw();

		//drawing user interface
		settings.draw();

		//draw the controls on top.
		controls.draw();
	}
}

//rect2 and rect3 is added to this project because of using WEBGL some function works different and can't use 5th parameter of rect() function

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
