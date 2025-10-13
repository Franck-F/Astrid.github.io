const canvas = document.getElementById('hearts-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = [];
const clouds = [];
let bigHeart = null;
let animationState = 'typing';

const h1 = document.querySelector('h1');
const text = h1.innerText;
h1.innerText = '';
let i = 0;

function typeWriter() {
    if (i < text.length) {
        h1.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 150);
    } else {
        setTimeout(() => {
            h1.style.display = 'none';
            animationState = 'bigHeart';
            hearts.length = 0; // Remove small hearts
            createMoreClouds();
            createBigHeart();
        }, 1000);
    }
}

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

class Cloud {
    constructor(x, y, size, speed, opacity) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
        this.opacity = opacity;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, Math.PI * 0.5, Math.PI * 1.5);
        ctx.arc(this.x + this.size, this.y - this.size, this.size * 0.7, Math.PI * 1, Math.PI * 2);
        ctx.arc(this.x + this.size * 2, this.y, this.size, Math.PI * 1.5, Math.PI * 0.5);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
    }

    update() {
        this.x += this.speed;
        if (this.x > canvas.width) {
            this.x = -this.size * 2;
        }
    }
}

function createHearts() {
    for (let i = 0; i < 25; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 20 + 10;
        const speed = Math.random() * 2 + 1;
        const opacity = Math.random() * 0.5 + 0.5;
        hearts.push(new Heart(x, y, size, speed, opacity));
    }
}

function createClouds() {
    for (let i = 0; i < 10; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height / 2;
        const size = Math.random() * 40 + 20;
        const speed = Math.random() * 0.5 + 0.1;
        const opacity = Math.random() * 0.3 + 0.2;
        clouds.push(new Cloud(x, y, size, speed, opacity));
    }
}

function createMoreClouds() {
    for (let i = 0; i < 15; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height / 2;
        const size = Math.random() * 50 + 30;
        const speed = Math.random() * 0.6 + 0.2;
        const opacity = Math.random() * 0.4 + 0.3;
        clouds.push(new Cloud(x, y, size, speed, opacity));
    }
}

function createBigHeart() {
    bigHeart = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        size: 200,
        opacity: 0,
        scale: 1,
        blinking: true,
        lastBlink: Date.now(),
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.scale(this.scale, this.scale);
            ctx.beginPath();
            ctx.moveTo(0, this.size * 0.25);
            ctx.bezierCurveTo(this.size * 0.5, -this.size * 0.25, this.size, -this.size * 0.75, 0, -this.size * 0.25);
            ctx.bezierCurveTo(-this.size, -this.size * 0.75, -this.size * 0.5, -this.size * 0.25, 0, this.size * 0.25);
            ctx.fillStyle = `rgba(255, 20, 147, ${this.opacity})`;
            ctx.fill();
            ctx.restore();
        },
        update() {
            if (this.blinking) {
                if (Date.now() - this.lastBlink > 500) {
                    this.opacity = this.opacity === 1 ? 0.5 : 1;
                    this.lastBlink = Date.now();
                }
            }
        }
    };
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (animationState === 'typing') {
        hearts.forEach(heart => {
            heart.update();
            heart.draw();
        });
    }

    clouds.forEach(cloud => {
        cloud.update();
        cloud.draw();
    });

    if (animationState === 'bigHeart' && bigHeart) {
        bigHeart.update();
        bigHeart.draw();
    }

    requestAnimationFrame(animate);
}

createHearts();
createClouds();
animate();
typeWriter();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    hearts.length = 0;
    clouds.length = 0;
    bigHeart = null;
    animationState = 'typing';
    i = 0;
    h1.innerText = '';
    h1.style.display = 'block';
    createHearts();
    createClouds();
    typeWriter();
});