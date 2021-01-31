'use strict';

// ! TUTORIAL:
// ! https://www.educative.io/blog/javascript-snake-game-tutorial

const GameData = [
    {
        name: '1-1',
        height: 130,
        width: 250,
        snake: [...line(0, 60, -10, 60)],
        blocks: [...line(0, 0, 240, 0), ...line(0, 0, 240, 120)],
        goal: line(240, 50, 240, 70),
        food: Array.from(new Set(randomDotsInRect(1, 20, 20, 230, 100))),
    },
    {
        name: '1-2',
        snake: [...line(0, 60, -10, 60)],
        blocks: [...line(0, 0, 240, 0), ...line(0, 0, 240, 120), ...rectangle(50, 40, 190, 80)],
        goal: line(240, 50, 240, 70),
        food: Array.from(new Set(randomDotsInRect(10, 20, 20, 230, 100, ...rectangle(50, 40, 190, 80)))),
        speed: 150,
    },
];

function line(oldX, oldY, newX, newY) {
    const changed = oldX != newX ? 'x' : 'y';
    const result = [];

    if (changed === 'x') {
        const [min, max] = [oldX, newX].sort();
        for (let x = min; x <= max; x += 10) {
            result.push([x, newY]);
        }
    } else {
        const [min, max] = [oldY, newY].sort();
        for (let y = min; y <= max; y += 10) {
            result.push([newX, y]);
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
            result.push([x, y]);
        }
    }

    return result;
}

function randomDotsInRect(amt, x1, y1, x2, y2, ...avoid) {
    const JSONavoid = avoid.map(e => JSON.stringify(e));
    const dots = [];
    const allSquares = rectangle(x1, y1, x2, y2);
    while (dots.length <= amt) {
        const dot = allSquares[Math.floor(Math.random() * allSquares.length)];
        if (!JSONavoid.includes(JSON.stringify(dot))) {
            dots.push(dot);
        }
    }
    return dots;
}

function shallowCompareCoords(coord1, coord2) {
    return coord1[0] === coord2[0] && coord1[1] === coord2[1];
}

class SnakeGame {
    constructor(gameData) {
        this.canvas = document.getElementsByTagName('canvas')[0];
        this.ctx = this.canvas.getContext('2d');
        this.snake = [];
        this.eatenFoods = [];
        this.gameData = gameData;
        this.levelData = gameData[0];
        this.foods = this.levelData.food;
        this.direction = 'right';
        this.movedThisTick = true;
        this.safeMoves = 5;
        this.score = 0;
        this.level = 0;
        this.hasWon = false;

        // canvas color variables
        this.boardBorder = 'black';
        this.boardBackground = 'white';
        this.snakeCol = 'lightblue';
        this.snakeBorder = 'darkblue';
        this.foodCol = 'lightgreen';
        this.foodBorder = 'darkgreen';
        this.blockCol = 'grey';
        this.blockBorder = 'black';
        this.goalCol = 'yellow';
        this.goalBorder = 'black';

        // settings
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.translate(0.5, 0.5);
    }

    drawSnake() {
        this.drawTiles(this.snake, this.snakeCol, this.snakeBorder, 'tile[0] < 0');
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
        const newHead = { x: this.snake[0][0], y: this.snake[0][1] };
        switch (direction) {
            case 'up': newHead.y -= 10; break;
            case 'right': newHead.x += 10; break;
            case 'down': newHead.y += 10; break;
            case 'left': newHead.x -= 10; break;
        }

        this.snake.unshift([newHead.x, newHead.y]);
        let ateSomething = false;
        for (const [i, food] of this.foods.entries()) {
            if (this.eatenFoods.includes(i)) {
                continue;
            }
            if (shallowCompareCoords(food, this.snake[0])) {
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
        if (this.checkGoal()) this.nextLevel();
        this.drawBlocks();
        this.drawGoals();
        this.drawFoods();
        this.drawSnake();
        if (this.checkCollisions()) this.lose();
        this.movedThisTick = false;
    }

    init(speed = 100) {
        this.initialSpeed = speed;
        document.addEventListener('keydown', this.changeDirection.bind(this));
        this.game = setInterval(this.tick.bind(this), speed);
        this.setLevel(0);
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

        for (const block of this.levelData.blocks) {
            const [x, y] = block;
            if (snakeEntries.includes(JSON.stringify([x, y]))) {
                return true;
            }
        }
        if (this.snake.length != snakeSet.length) {
            return true;
        }

        if (this.safeMoves > 0) {
            return;
        }

        const hitLeftWall = snakeHead[0] < 0;
        const hitRightWall = snakeHead[0] > this.canvas.width - 10;
        const hitTopWall = snakeHead[1] < 0;
        const hitBottomWall = snakeHead[1] > this.canvas.height - 10;

        return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
    }

    lose() {
        alert('You lost!');
        this.reset();
    }

    reset() {
        this.score = 0;
        this.eatenFoods = [];
        this.snake = JSON.parse(JSON.stringify(this.levelData.snake));
        this.direction = 'right';
        this.safeMoves = 7;
        this.hasWon = false;
    }

    drawFoods() {
        this.ctx.fillStyle = this.foodCol;
        this.ctx.strokeStyle = this.foodBorder;
        for (const [i, food] of this.foods.entries()) {
            if (this.eatenFoods.includes(i)) continue;
            this.ctx.fillRect(...food, 10, 10);
            this.ctx.strokeRect(...food, 10, 10);
        }
    }

    drawGoals() {
        if (this.levelData.food.length === this.eatenFoods.length) {
            this.hasWon = true;
            this.drawTiles(this.levelData.goal, this.goalCol, this.goalBorder);
        }
    }

    drawBlocks() {
        this.drawTiles(this.levelData.blocks, this.blockCol, this.blockBorder);
    }


    drawTiles(tiles, fillStyle, strokeStyle, condition) {
        this.ctx.fillStyle = fillStyle;
        this.ctx.strokeStyle = strokeStyle;
        for (const tile of tiles) {
            if (eval(condition)) continue;
            this.ctx.fillRect(...tile, 10, 10);
            this.ctx.strokeRect(...tile, 10, 10);
        }
    }

    updateScore() {
        // Intentionally using != instead of !==
        if (document.querySelector('score-counter').innerText != this.score) {
            document.querySelector('score-counter').innerText = this.score;
        }
    }

    blockAtCoordinates(coordX, coordY) {
        for (const block of this.levelData.blocks) {
            const [x, y] = block;
            if (JSON.stringify([x, y]) === JSON.stringify([coordX, coordY])) {
                return true;
            }
        }
    }

    setLevel(level) {
        if (level > this.gameData.length - 1) {
            alert('You win!');
        }
        this.levelData = GameData[level];
        this.foods = this.levelData.food;
        console.log(this.levelData);

        const shallowCopySnake = JSON.parse(JSON.stringify(this.levelData.snake));

        if (this.levelData.snake) this.snake = shallowCopySnake;
        // //if (this.levelData.height) this.canvas.height = this.levelData.height;
        // //if (this.levelData.width) this.canvas.width = this.levelData.width;
        if (this.levelData.speed) { this.setGameSpeed(this.levelData.speed); }
        this.level = level;
        this.reset();
    }

    checkGoal() {
        const JSONGoals = this.levelData.goal.map(e => JSON.stringify(e));
        if (this.hasWon) {
            if (JSONGoals.includes(JSON.stringify(this.snake[0]))) {
                return true;
            }
        }
    }

    nextLevel() {
        this.setLevel(this.level + 1);
    }
}

const snakeGame = new SnakeGame(GameData);
snakeGame.init(200);
