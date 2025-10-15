class ShootingStar {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.reset();
    }

    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = 0;
        this.length = 50 + Math.random() * 80;
        this.speed = 8 + Math.random() * 8;
        this.angle = (Math.PI / 4) + (Math.random() * Math.PI / 4);
        this.opacity = 0;
        this.fadeInDuration = 30;
        this.fadeOutStart = 50 + Math.random() * 20;
        this.life = 0;
        this.width = 2;
    }

    update() {
        this.life++;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        // Gestion de l'opacité
        if (this.life < this.fadeInDuration) {
            this.opacity = this.life / this.fadeInDuration;
        } else if (this.life > this.fadeOutStart) {
            this.opacity = Math.max(0, 1 - (this.life - this.fadeOutStart) / 20);
        }

        if (this.opacity <= 0 || this.y > this.canvas.height || this.x > this.canvas.width) {
            this.reset();
        }
    }

    draw() {
        const gradient = this.ctx.createLinearGradient(
            this.x,
            this.y,
            this.x - Math.cos(this.angle) * this.length,
            this.y - Math.sin(this.angle) * this.length
        );

        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
        gradient.addColorStop(0.3, `rgba(255, 240, 200, ${this.opacity * 0.3})`);
        gradient.addColorStop(1, 'transparent');

        this.ctx.beginPath();
        this.ctx.strokeStyle = gradient;
        this.ctx.lineWidth = this.width;
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(
            this.x - Math.cos(this.angle) * this.length,
            this.y - Math.sin(this.angle) * this.length
        );
        this.ctx.stroke();
    }
}

// Création du canvas en arrière-plan
const canvas = document.createElement('canvas');
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.pointerEvents = 'none';
canvas.style.zIndex = '0';
document.body.insertBefore(canvas, document.body.firstChild);

const ctx = canvas.getContext('2d');
let width, height;

// Gestion du redimensionnement
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Création des étoiles filantes
const stars = Array.from({ length: 3 }, () => new ShootingStar(canvas, ctx));

// Animation
function animate() {
    ctx.clearRect(0, 0, width, height);
    
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    
    requestAnimationFrame(animate);
}

animate();