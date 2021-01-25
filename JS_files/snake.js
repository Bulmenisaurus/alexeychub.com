'use strict';

// ! TUTORIAL:
// ! https://www.educative.io/blog/javascript-snake-game-tutorial

function random(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function objectsEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

const Blocks = [];
const notTheCanvasInsideSnakeGameDontUsePls = document.getElementsByTagName('canvas')[0];
for (let x = 0; x < 20; x++) {
    Blocks.push({
        x: random(10, notTheCanvasInsideSnakeGameDontUsePls.width - 10),
        y: random(0, notTheCanvasInsideSnakeGameDontUsePls.height - 10),
    });
}


class SnakeGame {
    constructor(blocks) {
        this.canvas = document.getElementsByTagName('canvas')[0];
        this.ctx = this.canvas.getContext('2d');
        this.snake = [{ x: 0, y: 200 }, { x: -1, y: 200 }, { x: -2, y: 200 }, { x: -3, y: 200 }, { x: -4, y: 200 }];
        this.food = { x: 0, y: 0 };
        this.direction = 'right';
        this.movedThisTick = true;
        this.safeMoves = 5;
        this.score = 0;
        this.blocks = blocks;

        // canvas color variables
        this.boardBorder = 'black';
        this.boardBackground = 'white';
        this.snakeCol = 'lightblue';
        this.snakeBorder = 'darkblue';
        this.foodCol = 'lightgreen';
        this.foodBorder = 'darkgreen';
        this.blockCol = 'grey';
        this.blockBorder = 'black';

        // settings
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.translate(0.5, 0.5);
    }

    drawSnake() {
        this.ctx.fillStyle = this.snakeCol;
        this.ctx.strokeStyle = this.snakeBorder;

        this.snake.map(e => {
            if (e.x < 0) return;
            this.ctx.fillRect(e.x, e.y, 10, 10);
            this.ctx.strokeRect(e.x, e.y, 10, 10);
        });
    }

    clearCanvas() {
        this.ctx.fillStyle = this.boardBackground;
        this.ctx.strokeStyle = this.boardBorder;
        // Draw a "filled" rectangle to cover the entire canvas
        this.ctx.translate(-0.5, -0.5);
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(0.5, 0.5);
    }

    moveSnake(direction) {
        const newHead = { x: this.snake[0].x, y: this.snake[0].y };
        switch (direction) {
            case 'up': newHead.y -= 10; break;
            case 'right': newHead.x += 10; break;
            case 'down': newHead.y += 10; break;
            case 'left': newHead.x -= 10; break;
        }

        this.snake.unshift(newHead);

        if (objectsEqual(this.food, this.snake[0])) {
            this.score++;
            this.setGameSpeed(Math.max(this.initialSpeed / 2, this.initialSpeed - this.score * 5));
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
        this.updateScore();
        this.moveSnake(this.direction);
        this.drawSnake();
        this.drawBlocks();
        this.drawFood();
        if (this.checkCollisions()) this.lose();
        this.movedThisTick = false;
    }

    init(speed = 100) {
        this.initialSpeed = speed;
        this.createFood();
        document.addEventListener('keydown', this.changeDirection.bind(this));
        this.game = setInterval(this.tick.bind(this), speed);
    }

    setGameSpeed(speed) {
        console.log(`Setting game speed to ${speed}`);
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

        for (const block of this.blocks) {
            const { x, y } = block;
            if (snakeEntries.includes(JSON.stringify({ x, y }))) {
                return true;
            }
        }
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
        this.score = 0;
        this.setGameSpeed(100);
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
        const { x, y } = this.food;
        while (objectsEqual(this.snake[0], this.food) || this.blockAtCoordinates(x, y)) {
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
        this.snake.map(part => {
            const hasEaten = part.x == that.food.x && part.y == that.food.y;
            if (objectsEqual(part, that.food)) this.createFood();
        });
    }

    drawFood() {
        this.ctx.fillStyle = this.foodCol;
        this.ctx.strokeStyle = this.foodBorder;
        this.ctx.fillRect(this.food.x, this.food.y, 10, 10);
        this.ctx.strokeRect(this.food.x, this.food.y, 10, 10);
    }

    drawBlocks() {
        this.ctx.fillStyle = this.blockCol;
        this.ctx.strokeStyle = this.blockBorder;
        for (const block of this.blocks) {
            this.ctx.fillRect(block.x, block.y, 10, 10);
            this.ctx.strokeRect(block.x, block.y, 10, 10);
        }
    }
    updateScore() {
        // Intentionally using != instead of !==
        if (document.querySelector('score-counter').innerText != this.score) {
            document.querySelector('score-counter').innerText = this.score;
        }
    }

    blockAtCoordinates(coordX, coordY) {
        for (const block of this.blocks) {
            const { x, y } = block;
            if (JSON.stringify([x, y]) === JSON.stringify([coordX, coordY])) {
                return true;
            }
        }
    }
}

const snakeGame = new SnakeGame(Blocks);
snakeGame.init(100);

