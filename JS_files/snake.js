'use strict';

// ! TUTORIAL:
// ! https://www.educative.io/blog/javascript-snake-game-tutorial

function random(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}


class Snake {
    constructor() {
        this.canvas = document.getElementsByTagName('canvas')[0];
        this.ctx = this.canvas.getContext('2d');
        this.snake = [{ x: 0, y: 200 }, { x: -1, y: 200 }, { x: -2, y: 200 }, { x: -3, y: 200 }, { x: -4, y: 200 }];
        this.food = { x: 0, y: 0 };
        this.direction = 'right';
        this.movedThisTick = true;
        this.safeMoves = 5;

        // canvas color variables
        this.board_border = 'black';
        this.board_background = 'white';
        this.snake_col = 'lightblue';
        this.snake_border = 'darkblue';

        // settings
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.translate(0.5, 0.5);
    }

    drawSnake() {
        // Draw each part of the snake one-by-one
        this.snake.map(e => this.drawSnakePart(e));
    }

    drawSnakePart(snakePart) {
        this.ctx.fillStyle = 'lightblue';
        this.ctx.strokestyle = 'darkblue';

        if (snakePart.x < 0) return;
        this.ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
        this.ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
    }

    clearCanvas() {
        this.ctx.fillStyle = this.board_background;
        this.ctx.strokestyle = this.board_border;
        // Draw a "filled" rectangle to cover the entire canvas
        this.ctx.translate(-0.5, -0.5);
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(0.5, 0.5);
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
        const has_eaten_food = this.snake[0].x === this.food.x && this.snake[0].y === this.food.y;
        if (has_eaten_food) {
            // Generate new food location
            this.createFood();
        } else {
            // Remove the last part of snake body
            this.snake.pop();
        }

        this.safeMoves--;
    }

    tick() {
        this.clearCanvas();
        this.moveSnake(this.direction);
        this.drawSnake();
        if (this.checkCollisions()) this.lose();
        this.drawFood();
        this.movedThisTick = false;
    }

    init(speed = 100) {
        this.createFood();
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

        // If you compare objects using ===, the operation will always return false
        const snakeEntries = this.snake.map(e => JSON.stringify(e));
        const snakeSet = [...new Set(snakeEntries)];

        // We know that all the coordinates of the snake have to be unique
        // Otherwise, that means some parts of the snake are stacked = lose
        if (this.snake.length != snakeSet.length) {
            return true;
        }

        if (this.safeMoves > 0) {
            return;
        }

        const hitLeftWall = snakeHead.x < 0;
        const hitRightWall = snakeHead.x > this.canvas.width - 10;
        const hitTopWall = snakeHead.y < 0;
        const hitBottomWall = snakeHead.y > this.canvas.height - 10;

        return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
    }

    lose() {
        alert('You lost!');
        this.reset();
    }

    reset() {
        this.direction = 'right';
        this.snake = [{ x: 0, y: 200 }, { x: -1, y: 200 }, { x: -2, y: 200 }, { x: -3, y: 200 }, { x: -5, y: 200 }];
        this.safeMoves = 7;
    }

    createFood() {
        this.food = {
            x: random(0, this.canvas.width - 10),
            y: random(0, this.canvas.height - 10),
        };

        let foodPlaceAttempts = 0;
        while (this.food.x === this.snake[0].x && this.food.y === this.snake[0].y) {
            foodPlaceAttempts++;

            this.food = {
                x: random(0, this.canvas.width - 10),
                y: random(0, this.canvas.height - 10),
            };

            if (foodPlaceAttempts > 100) {
                console.warn('Failed to place food in under 100 tries.');
                return;
            }
        }

        const that = this;
        this.snake.map(function hasSnakeEatenFood(part) {
            const hasEaten = part.x == that.food.x && part.y == that.food.y;
            if (hasEaten) this.createFood();
        });
    }

    drawFood() {
        this.ctx.fillStyle = 'lightgreen';
        this.ctx.strokestyle = 'darkgreen';
        this.ctx.fillRect(this.food.x, this.food.y, 10, 10);
        this.ctx.strokeRect(this.food.x, this.food.y, 10, 10);
    }
}

const snakeGame = new Snake();
snakeGame.init(100);

