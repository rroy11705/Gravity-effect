// JavaScript source code
var canvas = document.querySelector('canvas');//we are going to be looking for the html element canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 20;

var c = canvas.getContext('2d');//we wound draw within this variable c
var coeff_of_restitution = 0.7;
var colorArray = [
				'rgba(0, 255, 255, 0.75)',
				'rgba(255, 255, 0, 0.75)',
				'rgba(255, 0, 255, 0.75)',
				'rgba(128, 0, 128, 0.75)',
				'rgba(40, 180, 99, 0.75)',
				'rgba(244, 208, 63, 0.75)',
				'rgba(189, 195, 199, 0.75)',
				'rgba(52, 152, 219, 0.75)',
				'rgba(245, 176, 65, 0.75)',
				'rgba(255, 255, 255,0.75)'
				];
var gravity = 9.8;				
function rand_range(max,min){
	var range = max - min;
	return Math.floor(Math.random()*(range)) + min;
}
function Circles(x,y,dx,rad){
	this.x = x;
	this.y = y;
	this.dy = dy;
	this.rad = rad;
	this.minRad = this.rad;
	this.color = colorArray[Math.floor(Math.random()*colorArray.length)];
	
	this.draw = function(){
		c.beginPath();
		c.strokeStyle = 'black';
		c.arc(this.x,this.y,this.rad,0,Math.PI*2,false);
		c.stroke();
		c.fillStyle = this.color;
		c.fill();	
	}
	this.update = function(){
		if (this.y + this.dy > canvas.height-this.rad || this.y < this.rad){
			this.dy = -this.dy * coeff_of_restitution;
		}else{
			this.dy += gravity;
		}
			this.y += this.dy;
			this.draw();
		}
}
var ballArrey = [];

for(var i = 0;i < 500; i++){
	var rad = rand_range(10,20);
	var x = rand_range(rad,canvas.width - rad);
	var y = rand_range(rad,canvas.height - rad);
	var dy = rand_range(5,15);
	ballArrey.push(new Circles(x,y,dy,rad));
}

function anim_ball(){
	requestAnimationFrame(anim_ball);//Refreshes the page
	c.clearRect(0,0,canvas.width,canvas.height);
	for(var i = 0;i < ballArrey.length; i++){
		ballArrey[i].update();
	}
}
anim_ball();
	