class Paddle {
    constructor(config) {
        this.width = config.width;
        this.height = config.height;
        this.x = (config.gameFieldWidth - this.width) / 2;
        this.movementDistance = config.movementDistance;
        this.color = '#0095DD';
    }

    move(leftPressed, rightPressed, canvasWidth) {
        if(rightPressed && this.x < canvasWidth - this.width) {
            this.x += this.movementDistance;
        }
        else if(leftPressed && this.x > 0) {
            this.x -= this.movementDistance;
        }
    }

    draw(ctx, canvasHeight) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.rect(this.x, canvasHeight - this.height, this.width, this.height);
        ctx.fill();
        ctx.closePath();
    }
}
