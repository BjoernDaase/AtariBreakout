class GameWorld {
    constructor(canvas){
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
        this.ball = new Ball(
            this.canvas.width / 2,
            this.canvas.height - 30,
            10,
            2,
            -2,
            this
        );
        this.paddle = new Paddle(
            75,
            10,
            7,
            this
        );
    }

    gameOver() {
        document.location.reload();
        alert('GAME OVER');
        this.stop();
    }

    gameLoop() {
        this.requestId = undefined;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ball.move();
        this.ball.handleCollisionWith(this.canvas);
        this.ball.draw(this.ctx);

        this.paddle.move(this.leftPressed, this.rightPressed, this.canvas.width);
        this.paddle.draw(this.ctx, this.canvas.height);

        this.start();
    }
}