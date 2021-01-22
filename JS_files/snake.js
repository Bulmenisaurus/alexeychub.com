'use strict';

// ! TUTORIAL:
// ! https://www.educative.io/blog/javascript-snake-game-tutorial
class Snake {
    constructor() {
        this.canvas = document.getElementsByTagName('canvas')[0];
        this.ctx = this.canvas.getContext('2d');
        this.snake = [{ x: 200, y: 200 }, { x: 190, y: 200 }, { x: 180, y: 200 }, { x: 170, y: 200 }, { x: 160, y: 200 }];
        this.direction = 'right';
        this.movedThisTick = true;

        // canvas color variables
        this.board_border = 'black';
        this.board_background = 'white';
        this.snake_col = 'lightblue';
        this.snake_border = 'darkblue';

        // settings
        this.ctx.imageSmoothingEnabled = false;
    }

    drawSnake() {
        // Draw each part of the snake one-by-one
        this.snake.map(e => this.drawSnakePart(e));
    }

    drawSnakePart(snakePart) {
        this.ctx.fillStyle = 'lightblue';
        this.ctx.strokestyle = 'darkblue';
        this.ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
        this.ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
    }

    clearCanvas() {
        this.ctx.fillStyle = this.board_background;
        this.ctx.strokestyle = this.board_border;
        // Draw a "filled" rectangle to cover the entire canvas
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    moveSnake(direction) {
        const head = { x: this.snake[0].x, y: this.snake[0].y };
        switch (direction) {
            case 'up': head.y -= 10; break;
            case 'right': head.x += 10; break;
            case 'down': head.y += 10; break;
            case 'left': head.x -= 10; break;
            default: head.x += 10; break;
        }
        this.snake.unshift(head);
        this.snake.pop();
    }

    tick() {
        this.clearCanvas();
        this.moveSnake(this.direction);
        if (this.checkCollisions) this.lose();
        this.drawSnake();
        this.movedThisTick = false;
    }

    main(speed = 100) {
        document.addEventListener('keydown', this.changeDirection.bind(this));
        this.game = setInterval(this.tick.bind(this), speed);
    }

    setGameSpeed(speed) {
        clearInterval(this.game);
        this.game = setInterval(this.tick.bind(this), speed);
    }

    changeDirection(event) {
        const key = event.key;
        if (this.movedThisTick) return;

        if (['w', 'ArrowUp'].includes(key) && this.direction != 'down') {
            this.direction = 'up';
        } else if (['a', 'ArrowLeft'].includes(key) && this.direction != 'right') {
            this.direction = 'left';
        } else if (['s', 'ArrowDown'].includes(key) && this.direction != 'up') {
            this.direction = 'down';
        } else if (['d', 'ArrowRight'].includes(key) && this.direction != 'left') {
            this.direction = 'right';
        }
        this.movedThisTick = true;

    }

    checkCollisions() {
        const snakeHead = this.snake[0];
        for (const coords of this.snake.slice(4)) {
            const hasCollided = coords.x === snakeHead.x && coords.y === snakeHead.y;
            console.log({ snakeHead, coords });
            if (hasCollided) return true;
        }
        const hitLeftWall = snakeHead.x < 0;
        const hitRightWall = snakeHead.x > this.canvas.width - 10;
        const hitTopWall = snakeHead.y < 0;
        const hitBottomWall = snakeHead.y > this.canvas.height - 10;

        return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
    }

    lose() { }
}

const snakeGame = new Snake();
snakeGame.main(100);

