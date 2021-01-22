class Snake {
    constructor() {
        this.canvas = document.getElementsByTagName('canvas')[0];
        this.ctx = this.canvas.getContext('2d');
        this.snake = [{ x: 200, y: 200 }, { x: 190, y: 200 }, { x: 180, y: 200 }, { x: 170, y: 200 }, { x: 160, y: 200 }];
    }

    drawSnakePart(snakePart) {
        this.ctx.fillStyle = 'lightblue';
        this.ctx.strokestyle = 'darkblue';
        this.ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
        this.ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
    }

    drawSnake() {
        this.snake.map(e => this.drawSnakePart(e));
    }
}

const snakeGame = new Snake();
snakeGame.drawSnake();
