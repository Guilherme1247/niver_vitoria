class ParticleHeart {
    constructor() {
        this.canvas = document.getElementById('heartCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.heartPoints = [];
        this.dustParticles = [];
        
        this.resize();
        this.createHeartPoints();
        this.createParticles();
        this.createDustParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
        
        // Iniciar transição após 4 segundos
        setTimeout(() => this.startTransition(), 4000);
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createHeartPoints() {
        this.heartPoints = [];
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2 - 50;
        const scale = 8;
        
        for (let t = 0; t < Math.PI * 2; t += 0.1) {
            const x = scale * (16 * Math.sin(t) ** 3);
            const y = -scale * (13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
            
            this.heartPoints.push({
                x: centerX + x,
                y: centerY + y
            });
        }
    }
    
    createParticles() {
        this.particles = [];
        
        this.heartPoints.forEach((point, index) => {
            for (let i = 0; i < 3; i++) {
                this.particles.push({
                    targetX: point.x + (Math.random() - 0.5) * 10,
                    targetY: point.y + (Math.random() - 0.5) * 10,
                    x: point.x + (Math.random() - 0.5) * 100,
                    y: point.y + (Math.random() - 0.5) * 100,
                    size: Math.random() * 3 + 1,
                    opacity: Math.random() * 0.8 + 0.2,
                    speed: Math.random() * 0.02 + 0.01,
                    color: this.getRandomColor(),
                    pulse: Math.random() * Math.PI * 2,
                    pulseSpeed: Math.random() * 0.05 + 0.02
                });
            }
        });
    }
    
    createDustParticles() {
        this.dustParticles = [];
        
        for (let i = 0; i < 50; i++) {
            this.dustParticles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.3 + 0.1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                life: Math.random() * 100 + 50,
                maxLife: 150
            });
        }
    }
    
    getRandomColor() {
        const colors = [
            'rgba(255, 182, 193, ',
            'rgba(255, 160, 160, ',
            'rgba(255, 105, 180, ',
            'rgba(255, 255, 255, ',
            'rgba(255, 192, 203, '
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            const dx = particle.targetX - particle.x;
            const dy = particle.targetY - particle.y;
            
            particle.x += dx * particle.speed;
            particle.y += dy * particle.speed;
            
            particle.pulse += particle.pulseSpeed;
            const pulseSize = particle.size + Math.sin(particle.pulse) * 0.5;
            const pulseOpacity = particle.opacity + Math.sin(particle.pulse) * 0.2;
            
            this.ctx.save();
            this.ctx.globalAlpha = pulseOpacity;
            this.ctx.fillStyle = particle.color + pulseOpacity + ')';
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = particle.color + '0.8)';
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, pulseSize, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
        
        this.dustParticles.forEach((dust, index) => {
            dust.x += dust.speedX;
            dust.y += dust.speedY;
            dust.life--;
            
            if (dust.life <= 0) {
                dust.x = Math.random() * this.canvas.width;
                dust.y = Math.random() * this.canvas.height;
                dust.life = dust.maxLife;
                dust.speedX = (Math.random() - 0.5) * 0.5;
                dust.speedY = (Math.random() - 0.5) * 0.5;
            }
            
            if (dust.x < 0 || dust.x > this.canvas.width) dust.speedX *= -1;
            if (dust.y < 0 || dust.y > this.canvas.height) dust.speedY *= -1;
            
            this.ctx.save();
            this.ctx.globalAlpha = dust.opacity * (dust.life / dust.maxLife);
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            this.ctx.beginPath();
            this.ctx.arc(dust.x, dust.y, dust.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
        
        requestAnimationFrame(() => this.animate());
    }
    
    startTransition() {
        this.particles.forEach(particle => {
            particle.targetX += (Math.random() - 0.5) * 200;
            particle.targetY += (Math.random() - 0.5) * 200;
            particle.speed *= 3;
        });
        
        setTimeout(() => {
            document.querySelector('.loading-container').classList.add('fade-out');
            document.getElementById('phoneScreen').classList.add('show');
        }, 1000);
    }
}

// Brincadeira do botão no celular
let attemptCount = 0;
const maxAttempts = 5;
const buttonPositions = ['pos-1', 'pos-2', 'pos-3', 'pos-4', 'pos-center'];
const messages = [
    "Ops! Quase conseguiu! 😄 Tente de novo!",
    "Haha! O botão fugiu! 😜 Mais uma vez!",
    "Você está chegando perto! 😊 Continue tentando!",
    "Quase lá! 🤭 Uma última tentativa!",
    "Parabéns! Você conseguiu! 🎉 Redirecionando..."
];

function handleButtonClick() {
    const button = document.getElementById('magicButton');
    const attemptInfo = document.getElementById('attemptInfo');
    const attemptCountSpan = document.getElementById('attemptCount');
    const gameMessage = document.getElementById('gameMessage');
    
    attemptCount++;
    
    if (attemptCount === 1) {
        attemptInfo.style.display = 'block';
    }
    
    attemptCountSpan.textContent = attemptCount;
    gameMessage.textContent = messages[attemptCount - 1];
    
    if (attemptCount < maxAttempts) {
        button.classList.add('running');
        
        if (navigator.vibrate) {
            navigator.vibrate(100);
        }
        
        setTimeout(() => {
            buttonPositions.forEach(pos => button.classList.remove(pos));
            button.classList.add(buttonPositions[attemptCount - 1]);
            button.classList.remove('running');
        }, 400);
        
    } else {
        button.classList.add('success');
        button.textContent = 'Redirecionando... 🎉';
        button.disabled = true;
        
        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100, 50, 200]);
        }
        
        attemptInfo.style.display = 'none';
        
        // Redirecionar para outra página após 2 segundos
        setTimeout(() => {
            window.location.href = "niver.html";
        }, 2000);
    }
}

// Inicializar quando a página carregar
window.addEventListener('load', () => {
    new ParticleHeart();
});

// Fallback de segurança
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (!document.querySelector('.loading-container').classList.contains('fade-out')) {
            new ParticleHeart();
        }
    }, 1000);
});

// Inicializar posição do botão
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const button = document.getElementById('magicButton');
        if (button) {
            button.classList.add('pos-center');
        }
    }, 100);
});
