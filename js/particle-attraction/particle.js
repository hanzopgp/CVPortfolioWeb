function Particle(x,y){
	this.pos = createVector(x,y);
	this.prev = createVector(x,y);
	this.vel = createVector();
	this.acc = createVector();
	this.w = 5;
	this.color1 = random(255);
	this.color2 = random(255);
	this.color3 = random(255);

	this.show = function(){
		stroke('#adeed7');
		strokeWeight(1);
		point(this.pos.x,this.pos.y);
	}

	this.update = function(){
		this.pos.add(this.vel);
		this.vel.add(this.acc);
		this.acc.mult(0);
	}

	this.attractedBy = function(attractor){
		var attractorPos = createVector(attractor.pos.x, attractor.pos.y);
		var force = p5.Vector.sub(attractorPos, this.pos);
		var dsquared = force.magSq();
		dsquared = constrain(dsquared, 100, 500);
		var strength = (this.w + attractor.w)*G / dsquared;
		force.setMag(strength);
		this.acc.add(force);
	}

	this.repulsedBy = function(repulsor){
		var repulsorPos = createVector(repulsor.pos.x, repulsor.pos.y);
		var force = p5.Vector.sub(repulsorPos, this.pos);
		var dsquared = force.magSq();
		var strength = (this.w + repulsor.w)*G / dsquared;
		force.setMag(-strength);
		this.acc.add(force);
	}

}
