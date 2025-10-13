const canvas = document.getElementById('hearts-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = [];

class Heart {
    constructor(x, y, size, speed, opacity) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
        this.opacity = opacity;
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y + this.size / 4);
        ctx.quadraticCurveTo(this.x, this.y, this.x + this.size / 4, this.y);
        ctx.quadraticCurveTo(this.x + this.size / 2, this.y, this.x + this.size / 2, this.y + this.size / 4);
        ctx.quadraticCurveTo(this.x + this.size / 2, this.y, this.x + this.size * 3 / 4, this.y);
        ctx.quadraticCurveTo(this.x + this.size, this.y, this.x + this.size, this.y + this.size / 4);
        ctx.quadraticCurveTo(this.x + this.size, this.y + this.size / 2, this.x + this.size * 3 / 4, this.y + this.size * 3 / 4);
        ctx.lineTo(this.x + this.size / 2, this.y + this.size);
        ctx.lineTo(this.x + this.size / 4, this.y + this.size * 3 / 4);
        ctx.quadraticCurveTo(this.x, this.y + this.size / 2, this.x, this.y + this.size / 4);
        ctx.fillStyle = `rgba(255, 105, 180, ${this.opacity})`;
        ctx.fill();
    }

    update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.y = -this.size;
            this.x = Math.random() * canvas.width;
        }
    }
}

function createHearts() {
    for (let i = 0; i < 50; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 20 + 10;
        const speed = Math.random() * 2 + 1;
        const opacity = Math.random() * 0.5 + 0.5;
        hearts.push(new Heart(x, y, size, speed, opacity));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach(heart => {
        heart.update();
        heart.draw();
    });
    requestAnimationFrame(animate);
}

createHearts();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    hearts.length = 0;
    createHearts();
});