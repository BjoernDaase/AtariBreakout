class Ball {
    constructor(x, y, radius, dx, dy, gameWorld) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
        this.gameWorld = gameWorld;
        this.color = '#0095DD';
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;
    }

    handleCollisionWith(canvas) {
        if (this.x + this.dx > canvas.width - this.radius || this.x + this.dx < this.radius) {
            this.dx *= -1;
            this.setRandomColor();
        }
        if (this.y + this.dy < this.radius) {
            this.dy *= -1;
            this.setRandomColor();
        } else if(this.y + this.dy > canvas.height - this.radius) {
            this.gameWorld.gameOver();
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }

    setRandomColor() {
        this.color = '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
    }
}