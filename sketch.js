//global for the controls and input 
var controls = null;
//store visualisations in a container
var vis = null;
//variable for the p5 sound object
var sound = null;
var curSound = "none";
var songs = null;
var song = [];
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

var tutorial = false;
var menuOpen = true;
var menuPosX = 0;

function preload(){
	curSound = "Electroman Adventure";
	sound = loadSound("assets/ElectromanAdverture.mp3");

	songs = new Songs();
	songs.name.push("Electroman Adventure");
	songs.song.push(loadSound("assets/ElectromanAdverture.mp3"));
	songs.name.push("Game on");
	songs.song.push(loadSound('assets/GameOn.mp3'));
	songs.name.push("Titanium");
	songs.song.push(loadSound("assets/Titanium.mp3"));
	songs.name.push("cool song");
	songs.song.push(loadSound("assets/stomper_reggae_bit.mp3"));

	song.push(songs.name[0]);
	song.push(songs.name[1]);
	song.push(songs.name[2]);
	song.push(songs.name[3]);

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
	 controls = new ControlsAndInput();

	 //instantiate the fft object
	 fourier = new p5.FFT();

	 //create a new visualisation container and add visualisations
	 vis = new Visualisations();
	 vis.add(new Spectrum());
	 vis.add(new Spectrum2());
	 vis.add(new Spectrum3());
	 vis.add(new WavePattern());
	 vis.add(new Needles());
	 vis.add(new Circle());

	 //create graphical user interface
	 gui = createGui("Music visualiser controller");
	 sliderRange(5, 60, 1);
	 gui.addGlobals('fps');
	 sliderRange(1, 32, 1);
	 gui.addGlobals('spectrumDivider');
	 gui.addGlobals('song', 'imageForCircleMode', 'figuresForSpectrum3', 'modesForSpectrum3');


	 //add font
	 myFont = loadFont("fonts/cubano-regular-webfont.woff");
	 textFont(myFont);


	 //add position and size of pics
	 images.x.push(width / 2 - height / 3 - 7); images.y.push(height / 6 - 7); images.width.push(height / 1.5 + 17);
	 images.x.push(width / 2 - height / 5); images.y.push(height / 4); images.width.push(0);
	 images.x.push(width / 2 - height / 4 + 7); images.y.push(height / 4 - 10); images.width.push(height / 2);

	 menuPosX = width / 8;
}

function draw(){
	//draw background
	background(0);

	//update frame rate
	frameRate(fps);
	translate(-width / 2, -height / 2);
	//tutorial
	if(!tutorial) {
		rectMode(CENTER);
		fill(137,207,240);
		rect3(0, 0, width / 2, height / 2, 20);
		fill(93,63,211);
		textSize(30);
		text("Press (Space) button to open menu", -width/6, -100);
		text("Press (Enter) to close to tutorial", -width/6, 100);
		fill(255);
		rectMode(CORNER);
	} else {
		//draw the selected visualisation

		vis.selectedVisual.draw();

		fill(137,207,240,200);
		if(menuOpen) {
			menuPosX = constrain(menuPosX + width / 8 / fps, 0, width / 8);
			rect3(menuPosX - width / 16, height / 2, width / 8, height / 1.5, 15);
			rect3(17 * width / 16 - menuPosX, height / 2, width / 8, height / 1.5, 15);
		} else {
			menuPosX = constrain(menuPosX - width / 8 / fps, 0, width / 8);
			rect3(menuPosX - width / 16, height / 2, width / 8, height / 1.5, 15);
			rect3(17 * width / 16 - menuPosX, height / 2, width / 8, height / 1.5, 15);
		}


		//update the song
		if(song != curSound) {
			for(var i = 0; i < songs.name.length; i++) {
				if(song == songs.name[i]) {
					sound.stop();
					sound = songs.song[i];
					curSound = songs.name[i];
					sound.loop();
				}
			}
		}

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
