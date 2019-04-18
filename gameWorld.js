class GameWorld {
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.addEventListeners();
        this.addGameElements();
        this.rightPressed = false;
        this.leftPressed = false;

        this.interval = setInterval(this.gameLoop.bind(this), 10);
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
        clearInterval(this.interval);
        alert('GAME OVER');
        document.location.reload();
    }

    gameLoop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ball.handleCollisionWith(this.canvas);
        this.ball.move();
        this.ball.draw(this.ctx);

        this.paddle.move(this.leftPressed, this.rightPressed, this.canvas.width);
        this.paddle.draw(this.ctx, this.canvas.height);
    }
}