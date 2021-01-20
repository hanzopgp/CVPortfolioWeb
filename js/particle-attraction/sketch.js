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
var G;
var maxAttractRepuls;
var gSlider;
var sliderVisible;
var alphaChange;

function setup(){	
	if(displayWidth > 800){ //computer
		G = 0.3;
		maxAttractRepuls = 12;
		canvas = createCanvas(windowWidth-20, windowHeight);	
		nbParticles = 1000;
		rangeX = int(windowWidth/5);
		responsiveFontSize = int(windowWidth/120);
		responsiveFontSizeAlt = int(windowWidth/205);
		responsiveOffSetTxt = int(windowWidth/96);
		responsiveOffSetTxtAlt = int(windowWidth/128);
		paddingLeft = int(windowWidth/38);
		for(var i = 1; i < 7; i++){
			offsets.push(paddingLeft+70+responsiveOffSetTxt*i);
		}
		for(var i = 1; i < 8; i++){
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
			button2.position(paddingLeft, offsetsAlt[4]+windowWidth/40);
			button2.mousePressed(addParticle);
			button2.style('background-color:black');
			button2.style('border:1px solid #def0de');
			button2.style('color:#def0de');
			button2.style('font-size:'+responsiveFontSize-7+'px');
			button2.style('font-family:Andale Mono');

			button3 = createButton('Display infos');
			button3.position(paddingLeft, offsetsAlt[5]+2*(windowWidth/40));
			button3.mousePressed(triggerInfos);
			button3.style('background-color:black');
			button3.style('border:1px solid #def0de');
			button3.style('color:#def0de');
			button3.style('font-size:'+responsiveFontSize-7+'px');
			button3.style('font-family:Andale Mono');

			button4 = createButton('Reset');
			button4.position(paddingLeft, offsetsAlt[6]+3*(windowWidth/40));
			button4.mousePressed(resetCanvas);
			button4.style('background-color:black');
			button4.style('border:1px solid #def0de');
			button4.style('color:#def0de');
			button4.style('font-size:'+responsiveFontSize-7+'px');
            button4.style('font-family:Andale Mono');
            
            gSlider = createSlider(0, 5, 0.3, 0.05);
            gSlider.position(paddingLeft, 80);
			gSlider.style('visibility: hidden');
			gSlider.style('border : 1px solid #def0de');
		}	
	}else{ //phone
		G = 0.15;
		maxAttractRepuls = 7;
		canvas = createCanvas(displayWidth-20, displayHeight);
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
		if(windowWidth > 800){
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
		alphaChange = false;
	}else{
		pointActivated = true;
		alphaChange = true;
	}
}

function addParticle(){
	if(particles.length <= 3500){
		for(var i = 0; i < 500; i++){
			particles.push(new Particle(random(rangeX, windowWidth - rangeX), random(rangeY, windowHeight - rangeY)));
		}
	}
}

function resetCanvas(){
	attractors = [];
	repulsors = [];
	particles = [];
	background(0);
	for(var i = 0; i < nbParticles; i++){
		particles.push(new Particle(random(rangeX, windowWidth - rangeX), random(rangeY, windowHeight - rangeY)));
	}
}

function triggerInfos(){
	if(!moreInfosActivated){
		moreInfosActivated = true;
		gSlider.style('visibility: visible');
	}else{
		moreInfosActivated = false;
		gSlider.style('visibility: hidden');
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
	
    G = gSlider.value();
	text('Gravitational constant', paddingLeft, 90);
	gSlider.style('background-color : black');

	textSize(responsiveFontSize);
	text("* Particles : " + particles.length, paddingLeft, offsets[0]);
	textSize(responsiveFontSize);
	text("* G Force : " + G, paddingLeft, offsets[1]);

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
	if(frameCount < 375){
		if(frameCount > 75 && frameCount < 150){ //lines appearing one by one
			text("-> Click to add a particle", paddingLeft, offsets[5]);
			
		}
		if(frameCount > 150 && frameCount < 225){
			text("-> Use 'p' to pause", paddingLeft, offsetsAlt[0]);
			
		}
		if(frameCount > 225 && frameCount < 300){
			text("-> Use 'v' to select repulsor", paddingLeft, offsetsAlt[1]);
			
		}
		if(frameCount > 300 && frameCount < 375){
			text("-> Use 'b' to select attractor", paddingLeft, offsetsAlt[2]);
			
		}
	}else{
		if(frameCount < 500 && frameCount%10 == 0){ //blinking first line
			text("-> Click to add a particle", paddingLeft, offsets[5]);
		}else{
			background(0);
		}
		if(frameCount >= 500){
			text("-> Click to add a particle", paddingLeft, offsets[5]);
		}
		text("-> Use 'p' to pause", paddingLeft, offsetsAlt[0]);
		text("-> Use 'v' to select repulsor", paddingLeft, offsetsAlt[1]);
		text("-> Use 'b' to select attractor", paddingLeft, offsetsAlt[2]);
	}
	pop();
}

function mousePressed(){
	if(windowWidth > 600){
		if(attractors.length + repulsors.length < maxAttractRepuls){
			if(mouseX > rangeX && mouseX < windowWidth - rangeX){
				if(mouseY > rangeY && mouseY < windowHeight - rangeY){
					if(bool){
						attractors.push(new Attractor(mouseX,mouseY))
					}
					else{
						repulsors.push(new Repulsor(mouseX,mouseY));
					}
				}
			}
		}
	}else{
		if(attractors.length + repulsors.length < maxAttractRepuls){
			if(mouseX > rangeX && mouseX < windowWidth - rangeX){
				if(mouseY > rangeY && mouseY < windowHeight - rangeY - windowHeight/3){
					if(bool){
						attractors.push(new Attractor(mouseX,mouseY))
					}
					else{
						repulsors.push(new Repulsor(mouseX,mouseY));
					}
				}
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
