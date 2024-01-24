const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
// console.log(ctx);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];
let hue = 0;

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const mouse = {
    x: null,
    y: null,
}
// on click dots appear function
canvas.addEventListener('click', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    drawCircle();
    for (let i = 0; i < 1.5; i++){
        particlesArray.push(new Particle());
        // drawCircle();    
    }
    // by removing drawcircle dots and mover  it should be worked thoriugh animation also
    // console.log(event);
});
// on mouse mover drawns the required manner by operating
canvas.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 1; i++){
        particlesArray.push(new Particle());
        // drawCircle();    
    }
});


// function drawCircle(){
//     ctx.fillStyle = 'blue';
// ctx.strokeStyle = 'red';
// ctx.lineWidth = 15;
// ctx.beginPath();
// ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
// ctx.stroke();
//     ctx.fill();
// }
// drawCircle();
class Particle {
    constructor() {
        // this.x = mouse.x;
        // this.y = mouse.y;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height
        // this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedy = Math.random() * 3 - 1.5;
        this.color = 'hsl(' + hue + ',100%, 50%)';
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedy;
        if (this.size > 0.6) this.size -= 0.2;
    }
    draw() {
        ctx.fillStyle = this.color
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // ctx.stroke();
        ctx.fill();
    }
}
function init() {
    for (let i = 0; i < 100; i++) {
        particlesArray.push(new Particle());
    }
}
init();
// console.log(particlesArray)
function handleParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw()
        for (let j = i; j < particlesArray.length; j++){
            const dx = particlesArray[i].x - particlesArray[i].y;
            const dy = particlesArray[i].x - particlesArray[i].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100){
                ctx.beginPath();
                ctx.strokeStyle = particlesArray[i].color;
                ctx.lineWidth = particlesArray[i].size;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }
        if (particlesArray[i].size <= 0.3) {
            particlesArray.splice(i, 1);
            console.log(particlesArray.length);
            i--;
        }
        
    };
}


//  animation the circle moves over the mouse 
function animate() {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // animate as balls up one and down one as color sprinkling
    ctx.fillStyle = 'rgba(0,0,0,0.02)';
    ctx.fillRect(0,0, canvas.width, canvas.height);
    handleParticles();
    hue+=2;
    // it will color slow fast by 0.5/5
    // commentong it with draw circle
    // drawCircle();
    requestAnimationFrame(animate);
}
animate();

// console.log(ctx);