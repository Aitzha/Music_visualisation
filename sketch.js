//global for the controls and input 
var controls = null;
//variable for the p5 sound object
var songs = null;
//variable for p5 fast fourier transform
var fourier;
//images which will be used in circle
var images = null;
var imageForCircleMode = [];
//variable like graphical user interface, fps (frames per second) and font
var gui;
var fps = 60;
var myFont;
var spectrumDivider = 16;
//modes and figures for spectrum 3
var figuresForSpectrum3 = ["triangle", "squares"];
var modesForSpectrum3 = [1, 2];

var menu;

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

	images = new Images();
	//image name, x and y positions, width and image itself
	images.name.push("Apples ITunes Logo");
	images.image.push(loadImage("assets/Applemusicandroid-512.png"));

	//image name, x and y positions, width and image itself
	images.name.push("Loremaster");
	images.image.push(loadImage("assets/Loremaster.png"));

	//image name, x and y positions, width and image itself
	images.name.push("House Music");
	images.image.push(loadImage("assets/headphones.png"));


	imageForCircleMode.push(images.name[0]);
	imageForCircleMode.push(images.name[1]);
	imageForCircleMode.push(images.name[2]);
}

function setup(){
	 createCanvas(windowWidth, windowHeight, WEBGL);
	 smooth();
	 menu = new Menu();
	 menu.posX = width / 8;


	menu.addVis(new Spectrum());
	menu.addVis(new Spectrum2());
	menu.addVis(new Spectrum3());
	menu.addVis(new Circle());

	 controls = new ControlsAndInput();

	 //instantiate the fft object
	 fourier = new p5.FFT();

	 //create a new visualisation container and add visualisations


	 //create graphical user interface
	 gui = createGui("Music visualiser controller");
	 sliderRange(5, 60, 1);
	 gui.addGlobals('fps');
	 sliderRange(1, 32, 1);
	 gui.addGlobals('spectrumDivider');
	 gui.addGlobals('imageForCircleMode', 'figuresForSpectrum3', 'modesForSpectrum3');


	 //add font
	 myFont = loadFont("fonts/cubano-regular-webfont.woff");
	 textFont(myFont);


	 //add position and size of pics
	 images.x.push(width / 2 - height / 3 - 7); images.y.push(height / 6 - 7); images.width.push(height / 1.5 + 17);
	 images.x.push(width / 2 - height / 5); images.y.push(height / 4); images.width.push(0);
	 images.x.push(width / 2 - height / 4 + 7); images.y.push(height / 4 - 10); images.width.push(height / 2);


}

function draw(){
	//draw background
	background(0);

	//update frame rate
	frameRate(fps);

	//tutorial
	if(!menu.tutorial) {
		menu.drawTutorial();
		for(var i = 0; i < menu.visuals.length; i++) {
			textSize(width / 120);
			menu.visuals[i].w = textWidth(menu.visuals[i].name);
		}
	} else {
		//draw the selected visualisation
		translate(-width / 2, -height / 2);

		menu.visuals[menu.selectedVisIndex].draw();
		menu.drawMenu();

		console.log(songs.list[menu.currentSong].currentTime() + "/" + songs.list[menu.currentSong].duration())

		//draw the controls on top.
		controls.draw();
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
