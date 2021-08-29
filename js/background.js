const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.heigth = window.innerHeight;

let canvWidth = window.innerWidth;
let canvHeight = window.innerHeight;

let particlesArray;

let rnd = function(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

let rndFloat = function(min, max) {
	return (Math.random() * (max - min)) + min;
}

let clampNum = function(num, min, max) {
	return Math.max(min, Math.min(num, max));
}

// create particle
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    update() {
        if (this.x > canvas.width  || this.x < 0) {
            this.directionX = this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = this.directionY;
        }

       	if(this.y > canvas.height) {
       		this.y = 0;
       		this.directionY = rndFloat(1, 5);
       		this.directionX = rndFloat(-5, 5);
       		this.x = rndFloat(0, canvWidth);
       	}

       	this.directionY = clampNum(this.directionY + rndFloat(-0.5, 0.5), 3, 5);

        // move particle
        this.x += this.directionX;
        this.y += this.directionY;
    }
}

//draw the particles
function draw() {
	ctx.beginPath();
	for(particle of particlesArray) {
		ctx.fillStyle = particle.color;
		ctx.moveTo(particle.x + particle.size, particle.y);
		ctx.arc(particle.x, particle.y, particle.size, 0, (Math.PI * 180), false);
	}
	ctx.fill();
}

// create particle
function init() {
    particlesArray = [];
    let numberOfParticles = 300;
    for (let i=0; i<numberOfParticles; i++) {
        let size = rndFloat(0, 5);
        let x = rnd(0, canvWidth);
        let y = rndFloat(0, canvHeight);
        let directionX = rndFloat(-5, 5);
        let directionY = rndFloat(3, 5);
        let color = "rgba(255, 255, 255, 0.5)";

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// animation loop
function animate() {
    ctx.clearRect(0,0,canvWidth, canvHeight);
    for (let i=0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    draw();
    setTimeout(animate, 33);
}

init();
animate();