function Attractor(x,y){
	this.pos = createVector(x,y);
	this.w = 5;

	this.show = function(){
		stroke(0);
		fill('#74b71c');
		circle(this.pos.x, this.pos.y, this.w + 2);
	}

}