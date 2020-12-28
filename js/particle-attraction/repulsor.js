function Repulsor(x,y){
	this.pos = createVector(x,y);
	this.w = 5;

	this.show = function(){
		stroke(255,0,0);
		strokeWeight(this.w);
		point(this.pos.x, this.pos.y);
	}
}