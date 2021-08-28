const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.heigth = window.innerHeight;

let particlesArray;

let rnd = function(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
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

    // draw individual particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, (Math.PI) * 2, false);
        ctx.fillStyle = "#8C5523"
        ctx.fill();
    }

    update() {
        if (this.x > canvas.width  || this.x < 0) {
            this.directionX = this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = this.directionY;
        }

        if(this.x > canvas.width) {
        	this.directionX *= -1;
        }

        if(this.x < 0) { 
        	this.directionX *= -1;
       	}

       	if(this.y > canvas.height) {
       		this.directionY *= -1;
       	}

       	if(this.y < 0) {
       		this.directionY *= -1;
       	}

        // move particle
        this.x += this.directionX;
        this.y += this.directionY;
        // draw particle
        this.draw();
    }
}

// create particle
function init() {
    particlesArray = [];
    let numberOfParticles = 100;
    for (let i=0; i<numberOfParticles; i++) {
        let size = 20;
        // let x = 700//(Math.random() * ((innerWidth - size * 2)-(size * 2)) + size * 2);
        // let y = 200//(Math.random() * ((innerHeight - size * 2)-(size * 2)) + size * 2);
        let x = rnd(0, innerWidth);
        let y = rnd(0, innerHeight);
        let directionX = (Math.random() * 5) - 2.5;
        let directionY = (Math.random() * 5) - 2.5;
        let color = "#8C5523";

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// animation loop
function animate() {
	requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth, innerHeight);
    for (let i=0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
}

init();
animate();