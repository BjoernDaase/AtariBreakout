class GameWorld {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.addEventListeners();
        this.addGameElements();
        this.rightPressed = false;
        this.leftPressed = false;

        this.start();
    }

    start() {
        if (!this.requestId) {
            this.requestId = requestAnimationFrame(this.gameLoop.bind(this));
        }
    }

    stop() {
        if (this.requestId) {
            cancelAnimationFrame(this.requestId);
            this.requestId = undefined;
        }
    }

    addEventListeners() {
        document.addEventListener('keydown', e => {
            if (e.key === 'Right' || e.key === 'ArrowRight') {
                this.rightPressed = true;
            } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
                this.leftPressed = true;
            }
        });

        document.addEventListener('keyup', e => {
            if (e.key === 'Right' || e.key === 'ArrowRight') {
                this.rightPressed = false;
            } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
                this.leftPressed = false;
            }
        });
    }

    addGameElements() {
        this.addBall();
        this.addPaddle();
        this.addBricks();
    }

    addBall() {
        const ballX = this.canvas.width / 2;
        const ballY = this.canvas.height - 30;
        const ballRadius = 10;
        const ballDx = 2;
        const ballDy = -2;

        this.ball = new Ball(
            ballX,
            ballY,
            ballRadius,
            ballDx,
            ballDy,
            this
        );
    }

    addPaddle() {
        const paddleWidth = 75;
        const paddleHeight = 10;
        const paddleMovementDistance = 7;

        this.paddle = new Paddle(
            paddleWidth,
            paddleHeight,
            paddleMovementDistance,
            this
        );
    }

    addBricks() {
        const brickRowCount = 3;
        const brickColumnCount = 5;
        const brickWidth = 75;
        const brickHeight = 20;
        const brickPadding = 10;
        const brickOffsetTop = 30;
        const brickOffsetLeft = 30;
        this.bricks = [];

        for (let column = 0; column < brickColumnCount; column++) {
            for (let row = 0; row < brickRowCount; row++) {
                const brickX = column * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = row * (brickHeight + brickPadding) + brickOffsetTop;
                this.bricks.push(new Brick (brickX, brickY, brickWidth, brickHeight));
            }
        }
    }

    drawBricks() {
        const context = this.ctx;
        this.bricks.forEach(function(brick) {
            brick.draw(context);
        });
    }

    gameOver() {
        document.location.reload();
        alert('GAME OVER');
        this.stop();
    }

    gameLoop() {
        this.requestId = undefined;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawBricks();

        this.ball.move();
        this.ball.handleCollisionWith(this.canvas);
        this.ball.draw(this.ctx);

        this.paddle.move(this.leftPressed, this.rightPressed, this.canvas.width);
        this.paddle.draw(this.ctx, this.canvas.height);

        this.start();
    }
}