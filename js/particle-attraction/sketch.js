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
var moreInfosActivated = false;
var frames = [];

function setup(){	
	if(displayWidth > 800){ //computer
		canvas = createCanvas(windowWidth-20	, windowHeight);
		nbParticles = 2000;
		rangeX = int(windowWidth/5);
		responsiveFontSize = int(windowWidth/120);
		responsiveFontSizeAlt = int(windowWidth/205);
		responsiveOffSetTxt = int(windowWidth/96);
		responsiveOffSetTxtAlt = int(windowWidth/128);
		paddingLeft = int(windowWidth/24);
		for(var i = 1; i < 7; i++){
			offsets.push(paddingLeft+responsiveOffSetTxt*i);
		}
		for(var i = 1; i < 7; i++){
			offsetsAlt.push(offsets[5]+responsiveOffSetTxtAlt*i);
		}
		for(var i = 0; i < nbParticles; i++){
			particles.push(new Particle(random(rangeX, windowWidth - rangeX), random(rangeY, windowHeight - rangeY)));
		}

		if(windowWidth > 800){
			button = createButton('Switch mode');
			button.position(paddingLeft, offsetsAlt[3]);
			button.mousePressed(switchMode);
			button.style('background-color:black');
			button.style('border:1px solid #def0de');
			button.style('color:#def0de');
			button.style('font-size:'+responsiveFontSize-7+'px');
			button.style('font-family:Andale Mono');

			button2 = createButton('Add particles');
			button2.position(paddingLeft, offsetsAlt[4]+windowWidth/65);
			button2.mousePressed(addParticle);
			button2.style('background-color:black');
			button2.style('border:1px solid #def0de');
			button2.style('color:#def0de');
			button2.style('font-size:'+responsiveFontSize-7+'px');
			button2.style('font-family:Andale Mono');

			button3 = createButton('Display infos');
			button3.position(paddingLeft, offsetsAlt[5]+2*(windowWidth/65));
			button3.mousePressed(triggerInfos);
			button3.style('background-color:black');
			button3.style('border:1px solid #def0de');
			button3.style('color:#def0de');
			button3.style('font-size:'+responsiveFontSize-7+'px');
			button3.style('font-family:Andale Mono');
		}	
	}else{ //phone
		canvas = createCanvas(displayWidth, displayHeight);
		nbParticles = 300;
		rangeX = int(displayWidth/5);
		responsiveFontSize = int(displayWidth/120);
		responsiveFontSizeAlt = int(displayWidth/300);
		responsiveOffSetTxt = int(displayWidth/96);
		responsiveOffSetTxtAlt = int(displayWidth/128);
		paddingLeft = int(displayWidth/24);
		for(var i = 1; i < 7; i++){
			offsets.push(paddingLeft+responsiveOffSetTxt*i);
		}
		for(var i = 1; i < 6; i++){
			offsetsAlt.push(offsets[offsets.length]+3+responsiveOffSetTxtAlt*i);
		}
		for(var i = 0; i < nbParticles; i++){
			particles.push(new Particle(random(rangeX, displayWidth - rangeX), random(rangeY, displayHeight - rangeY)));
		}
	}

	//rangeX = displayHeight/2;
	canvas.position(0,0);
	canvas.style('z-index', '-1');
	background(0); //lines

	for(var i = 0; i < 150; i++){
		frames.push(i*5);
	}
}

function draw(){
	if(pointActivated){
		background(0);
		if(displayWidth > 800){
			drawTxt();
			if(moreInfosActivated){
				showMoreInfos();
			}
		}
	}

	if(displayWidth > 800){
		if(frameCount <= 300){
			for(var i = 0; i < frames.length - 1; i++){
				if(frameCount > (150+frames[i])){
					for(var j = i*(nbParticles/40); j < (i+1)*(nbParticles/40); j++){
						if(j >= nbParticles){
							break;
						}
						particles[j].show();
					}
				}
			}
		}
	}else{
		for(var i = 0; i < particles.length; i++){
			particles[i].show();
		}
	}
	
	for(var i = 0; i < particles.length; i++){
		for(var j = 0; j < attractors.length; j++){
			particles[i].attractedBy(attractors[j]);
		}
		if(frameCount >= 300){
			for(var k = 0; k < repulsors.length; k++){
				particles[i].repulsedBy(repulsors[k]);
			}
			particles[i].update()	;
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

function triggerInfos(){
	if(!moreInfosActivated){
		moreInfosActivated = true;
	}else{
		moreInfosActivated = false;
	}
}

function showMoreInfos(){
	push();
	translate(0, -windowWidth/96);
	stroke(0);
	strokeWeight(0);
	fill("#def0de");
	textSize(responsiveFontSize);
	textFont("Andale Mono");

	textSize(responsiveFontSize);
	text("* Particles : " + particles.length, paddingLeft, offsets[0]);
	textSize(responsiveFontSize);
	text("* G Force : 0.3", paddingLeft, offsets[1]);

	textSize(responsiveFontSize);
	text("* Frames : " + frameCount, paddingLeft, offsets[2]);
	textSize(responsiveFontSizeAlt);
	text("-------------------------------------------------------", paddingLeft, offsets[3])
	textSize(responsiveFontSize);
	text("Code available on my github", paddingLeft, offsets[4]);
	textSize(responsiveFontSizeAlt);
	text("-------------------------------------------------------", paddingLeft, offsets[5]);
	pop();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function deviceTurned(){
	resizeCanvas(windowHeight, windowWidth);
}

function drawTxt(){
	push();
	stroke(0);
	strokeWeight(0);
	fill("#def0de");
	textFont("Andale Mono");
	textSize(responsiveFontSize);
	text("-> Click to add a particle", paddingLeft, offsets[5]);
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
