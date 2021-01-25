'use strict';

// ! TUTORIAL:
// ! https://www.educative.io/blog/javascript-snake-game-tutorial

const GameData = [
    {
        name: '1-1',
        blocks: [...line(0, 0, 390, 0), ...rectangle(350, 350, 390, 390)],
        food: [{ x: 100, y: 100 }, { x: 110, y: 110 }],
    },
];

function line(oldX, oldY, newX, newY) {
    const changed = oldX != newX ? 'x' : 'y';
    const result = [];

    if (changed === 'x') {
        const [min, max] = [oldX, newX].sort();
        for (let x = min; x <= max; x += 10) {
            result.push({ x: x, y: newY });
        }
    } else {
        const [min, max] = [oldY, newY].sort();
        for (let y = min; y <= max; y += 10) {
            result.push({ x: newX, y: y });
        }
    }

    return result;
}

function rectangle(x1, y1, x2, y2) {
    // x1 and y1 are top-left corner,
    // x2 and y2 are bottom-right corner.

    const result = [];
    for (let x = x1; x <= x2; x += 10) {
        for (let y = y1; y <= y2; y += 10) {
            result.push({ x, y });
        }
    }

    return result;
}

class SnakeGame {
    constructor(gameData) {
        this.canvas = document.getElementsByTagName('canvas')[0];
        this.ctx = this.canvas.getContext('2d');
        this.snake = [{ x: 0, y: 200 }, { x: -1, y: 200 }, { x: -2, y: 200 }, { x: -3, y: 200 }, { x: -4, y: 200 }];
        this.eatenFoods = [];
        this.gameData = gameData;
        this.foods = this.gameData[0].food;
        this.direction = 'right';
        this.movedThisTick = true;
        this.safeMoves = 5;
        this.score = 0;
        this.level = 0;

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
        const snakeHead = JSON.stringify(this.snake[0]);
        let ateSomething = false;
        for (const [i, food] of this.foods.entries()) {
            const jsonFood = JSON.stringify(food);

            if (this.eatenFoods.includes(i)) {
                continue;
            }

            if (snakeHead === jsonFood) {
                ateSomething = true;
                this.eatenFoods.push(i);
                this.score++;
                this.setGameSpeed(Math.max(this.initialSpeed / 2, this.initialSpeed - this.score * 5));
            }
        }

        if (!ateSomething) {
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
        this.drawFoods();
        if (this.checkCollisions()) this.lose();
        this.movedThisTick = false;
    }

    init(speed = 100) {
        this.initialSpeed = speed;
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

        for (const block of this.gameData[this.level].blocks) {
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
        this.eatenFoods = [];
        this.setGameSpeed(100);
        this.direction = 'right';
        this.snake = [{ x: 0, y: 200 }, { x: -1, y: 200 }, { x: -2, y: 200 }, { x: -3, y: 200 }, { x: -5, y: 200 }];
        this.safeMoves = 7;
    }

    drawFoods() {
        this.ctx.fillStyle = this.foodCol;
        this.ctx.strokeStyle = this.foodBorder;
        for (const [i, food] of this.foods.entries()) {
            if (this.eatenFoods.includes(i)) continue;
            this.ctx.fillRect(food.x, food.y, 10, 10);
            this.ctx.strokeRect(food.x, food.y, 10, 10);
        }
    }

    drawBlocks() {
        this.ctx.fillStyle = this.blockCol;
        this.ctx.strokeStyle = this.blockBorder;
        for (const block of this.gameData[this.level].blocks) {
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
        for (const block of this.gameData[this.level].blocks) {
            const { x, y } = block;
            if (JSON.stringify([x, y]) === JSON.stringify([coordX, coordY])) {
                return true;
            }
        }
    }
}

const snakeGame = new SnakeGame(GameData);
snakeGame.init(100);

