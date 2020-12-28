var canvas;
var particles = [];
var attractors = [];
var repulsors = [];
var nbParticles;
var bool = true;
var tmp = 0;
var frameCount;
var canvas;
var rangeX = 250;
var rangeY = 0;
var responsiveFontSize;
var responsiveFontSizeAlt;
var responsiveOffSetTxt;
var responsiveOffSetTxtAlt;
var offsets = [];
var offsetsAlt = [];
var paddingLeft;
var pointActivated = true;

function setup(){	
	if(displayWidth > 800){ //computer
		canvas = createCanvas(windowWidth-20	, windowHeight);
		nbParticles = 500;
		rangeX = int(windowWidth/5);
		responsiveFontSize = int(windowWidth/120);
		responsiveFontSizeAlt = int(windowWidth/300);
		responsiveOffSetTxt = int(windowWidth/96);
		responsiveOffSetTxtAlt = int(windowWidth/128);
		paddingLeft = int(windowWidth/24);
		for(var i = 1; i < 6; i++){
			offsets.push(paddingLeft+responsiveOffSetTxt*i);
		}
		for(var i = 1; i < 6; i++){
			offsetsAlt.push(offsets[4]+responsiveOffSetTxtAlt*i);
		}
		for(var i = 0; i < nbParticles; i++){
			particles.push(new Particle(random(rangeX, windowWidth - rangeX), random(rangeY, windowHeight - rangeY)));
		}
		button2 = createButton('Add particles');
		button2.position(paddingLeft, offsetsAlt[4]+windowWidth/96);
		button2.mousePressed(addParticle);
		button2.style('background-color:black');
		button2.style('border:1px solid #def0de');
		button2.style('color:white');
		button2.style('font-size:'+responsiveFontSize+'px');
	}else{ //phone
		canvas = createCanvas(displayWidth-20	, displayHeight);
		nbParticles = 200;
		rangeX = int(displayWidth/5);
		responsiveFontSize = int(displayWidth/120);
		responsiveFontSizeAlt = int(displayWidth/300);
		responsiveOffSetTxt = int(displayWidth/96);
		responsiveOffSetTxtAlt = int(displayWidth/128);
		paddingLeft = int(displayWidth/24);
		for(var i = 1; i < 6; i++){
			offsets.push(paddingLeft+responsiveOffSetTxt*i);
		}
		for(var i = 1; i < 6; i++){
			offsetsAlt.push(offsets[4]+responsiveOffSetTxtAlt*i);
		}
		for(var i = 0; i < nbParticles; i++){
			particles.push(new Particle(random(rangeX, displayWidth - rangeX), random(rangeY, displayHeight - rangeY)));
		}
	}

	button = createButton('Switch mode');
    button.position(paddingLeft, offsetsAlt[3]);
	button.mousePressed(switchMode);
	button.style('background-color:black');
	button.style('border:1px solid #def0de');
	button.style('color:white');
	button.style('font-size:'+responsiveFontSize+'px');

	//rangeX = displayHeight/2;
	canvas.position(0,0);
	canvas.style('z-index', '-1');
	background(0); //lines
}

function draw(){
	if(pointActivated){
		background(0);
		drawTxt();
	}
	
	for(var i = 0; i < particles.length; i++){
		for(var j = 0; j < attractors.length; j++){
			particles[i].attractedBy(attractors[j]);
		}
		particles[i].show();
		if(frameCount >= 150){
			for(var k = 0; k < repulsors.length; k++){
				particles[i].repulsedBy(repulsors[k]);
			}
			particles[i].update();
			particles[i].show();
		}
		
	}
	for(var i = 0; i < attractors.length; i++){
		attractors[i].show();
	}
	for(var j = 0; j < repulsors.length; j++){
		repulsors[j].show();
	}
}

function switchMode() {
	if(pointActivated == true){
		pointActivated = false;
	}else{
		pointActivated = true;
	}
}

function addParticle(){
	if(particles.length <= 2500){
		for(var i = 0; i < 500; i++){
			particles.push(new Particle(random(rangeX, windowWidth - rangeX), random(rangeY, windowHeight - rangeY)));
		}
	}
}

function windowResized() {
	resizeCanvas(displayWidth, displayHeight);
}

function drawTxt(){
	push();
	stroke(0);
	strokeWeight(0);
	fill("#def0de");
	textSize(responsiveFontSize);
	textFont("Andale Mono");
	text("Frames : " + frameCount, paddingLeft, offsets[0]);
	textSize(responsiveFontSizeAlt);
	text("-------------------------------------------------------", paddingLeft, offsets[1])
	textSize(responsiveFontSize);
	text("Code available on my github", paddingLeft, offsets[2]);
	textSize(responsiveFontSizeAlt);
	text("-------------------------------------------------------", paddingLeft, offsets[3])
	textSize(responsiveFontSize);
	text("-> Click to add a particle", paddingLeft, offsets[4]);
	text("-> Use 'p' to pause", paddingLeft, offsetsAlt[0]);
	text("-> Use 'v' to select repulsor", paddingLeft, offsetsAlt[1]);
	text("-> Use 'b' to select attractor", paddingLeft, offsetsAlt[2]);
	pop();
}

function mousePressed(){
	if(mouseX > rangeX && mouseX < displayWidth - rangeX){
		if(mouseY > rangeY && mouseY < displayHeight - rangeY){
			if(bool){
				attractors.push(new Attractor(mouseX,mouseY))
			}
			else{
				repulsors.push(new Repulsor(mouseX,mouseY));
			}
		}
	}
}

function keyPressed(){
	if(key == "b"){
		bool = true;
	}
	if(key == "v"){
		bool = false;
	}
	if(key == "p"){
		if(tmp == 0){
			noLoop();
			tmp = 1;
		}
		else{
			loop();
			tmp = 0;
		}

	}

}
