'use strict';
const GameData = [
    {
        name: '1-1',
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
    {
        name: '1-3',
        snake: [[0, 10]],
        blocks: [...rectangle(0, 0, 80, 80, ...rectangle(10, 10, 70, 70)), ...rectangle(50, 50, 60, 60), ...rectangle(20, 20, 30, 30), ...rectangle(20, 50, 30, 60), ...rectangle(50, 20, 60, 30)],
        goal: [[40, 40]],
        food: [[40, 40], [40, 60], [40, 20], [20, 40], [60, 40]],
        speed: 140,
        height: 90,
        width: 90,
        fadingFruit: 5,
    },
];
/* General Helper functions */
function containsCoordinates(arr, coords) {
    return arr.map(i => JSON.stringify(i)).includes(JSON.stringify(coords));
}
function shallowCompareCoords(coord1, coord2) {
    return coord1[0] === coord2[0] && coord1[1] === coord2[1];
}
/* Helper functions for defining coordinates: */
function line(oldX, oldY, newX, newY) {
    const changed = oldX != newX ? 'x' : 'y';
    const result = [];
    if (changed === 'x') {
        const [min, max] = [oldX, newX].sort();
        for (let x = min; x <= max; x += 10) {
            result.push([x, newY]);
        }
    }
    else {
        const [min, max] = [oldY, newY].sort();
        for (let y = min; y <= max; y += 10) {
            result.push([newX, y]);
        }
    }
    return result;
}
function rectangle(x1, y1, x2, y2, ...avoid) {
    // x1 and y1 are top-left corner,
    // x2 and y2 are bottom-right corner.
    const result = [];
    for (let x = x1; x <= x2; x += 10) {
        for (let y = y1; y <= y2; y += 10) {
            if (!containsCoordinates(avoid, [x, y])) {
                result.push([x, y]);
            }
        }
    }
    return result;
}
function randomDotsInRect(amt, x1, y1, x2, y2, ...avoid) {
    const dots = [];
    const allSquares = rectangle(x1, y1, x2, y2);
    while (dots.length <= amt) {
        const dot = allSquares[Math.floor(Math.random() * allSquares.length)];
        if (!containsCoordinates(avoid, dot)) {
            dots.push(dot);
        }
    }
    return dots;
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
        this.moves = 0;
        this.deaths = 0;
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
    //! Start of helper and important functions
    clearCanvas() {
        this.ctx.fillStyle = this.boardBackground;
        this.ctx.strokeStyle = this.boardBorder;
        // Draw a "filled" rectangle to cover the entire canvas
        this.ctx.translate(-0.5, -0.5);
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(0.5, 0.5);
    }
    tick() {
        this.clearCanvas();
        this.updateGUI();
        if (this.checkGoal()) {
            this.nextLevel();
        }
        this.moveSnake(this.direction);
        this.drawBlocks();
        this.drawGoals();
        this.drawFoods();
        this.drawSnake();
        if (this.checkCollisions()) {
            this.lose();
        }
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
    //! Start of movement managment/controller
    moveSnake(direction) {
        const newHead = { x: this.snake[0][0], y: this.snake[0][1] };
        switch (direction) {
            case 'up':
                newHead.y -= 10;
                break;
            case 'right':
                newHead.x += 10;
                break;
            case 'down':
                newHead.y += 10;
                break;
            case 'left':
                newHead.x -= 10;
                break;
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
    changeDirection(event) {
        const key = event.key;
        if (this.movedThisTick) {
            return;
        }
        if (['w', 'ArrowUp'].includes(key) && this.direction != 'down') {
            this.direction = 'up';
        }
        else if (['a', 'ArrowLeft'].includes(key) && this.direction != 'right') {
            this.direction = 'left';
        }
        else if (['s', 'ArrowDown'].includes(key) && this.direction != 'up') {
            this.direction = 'down';
        }
        else if (['d', 'ArrowRight'].includes(key) && this.direction != 'left') {
            this.direction = 'right';
        }
        this.movedThisTick = true;
    }
    checkCollisions() {
        const snakeHead = this.snake[0];
        // If you compare objects using ===, the operation will always return false
        const snakeEntries = this.snake.map(e => JSON.stringify(e));
        const snakeSet = Array.from(new Set(snakeEntries));
        // We know that all the coordinates of the snake have to be unique
        // Otherwise, that means some parts of the snake are stacked = lose
        for (const block of this.levelData.blocks) {
            if (containsCoordinates(this.snake, block)) {
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
        this.deaths++;
        this.reset();
    }
    reset() {
        this.moves = 0;
        this.score = 0;
        this.eatenFoods = [];
        this.setGameSpeed(this.initialSpeed);
        this.snake = JSON.parse(JSON.stringify(this.levelData.snake));
        this.direction = 'right';
        this.safeMoves = 7;
        this.hasWon = false;
    }
    //! Start of drawing/rendering section:
    drawSnake() {
        this.drawTiles(this.snake, this.snakeCol, this.snakeBorder, (t) => { return t[0] < 0; });
    }
    drawFoods() {
        this.drawTiles(this.foods, this.foodCol, this.foodBorder, (food, i) => { return this.eatenFoods.includes(i); });
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
    // Skipdraw is a callback that returns true when you want to skip
    drawTiles(tiles, fillStyle, strokeStyle, skipDraw = () => false) {
        this.ctx.fillStyle = fillStyle;
        this.ctx.strokeStyle = strokeStyle;
        for (const [i, tile] of tiles.entries()) {
            if (skipDraw(tile, i)) {
                continue;
            }
            this.ctx.fillRect(tile[0], tile[1], 10, 10);
            this.ctx.strokeRect(tile[0], tile[1], 10, 10);
        }
    }
    //! Start of GUI sections:
    updateGUI() {
        this.updateScore();
        this.updateDeaths();
        this.updateFood();
    }
    updateScore() {
        const score = document.querySelector('#score');
        if (score.innerText !== this.score.toString()) {
            score.innerText = this.score.toString();
        }
    }
    updateDeaths() {
        const deaths = document.querySelector('#deaths');
        if (deaths.innerText !== this.deaths.toString()) {
            deaths.innerText = this.deaths.toString();
        }
    }
    updateFood() {
        const food = document.querySelector('#food');
        food.innerText = this.eatenFoods.length + '/' + this.foods.length;
    }
    //! Start of level managment:
    setLevel(level) {
        if (level > this.gameData.length - 1) {
            alert('You win!');
            return;
        }
        this.levelData = GameData[level];
        this.foods = this.levelData.food;
        if (this.levelData.snake) {
            this.snake = this.levelData.snake;
        }
        if (this.levelData.height || this.levelData.width) {
            this.canvas.height = this.levelData.height;
            this.canvas.width = this.levelData.width;
            this.ctx.translate(0.5, 0.5);
        }
        if (this.levelData.speed) {
            this.setGameSpeed(this.levelData.speed);
            this.initialSpeed = this.levelData.speed;
        }
        this.level = level;
        this.reset();
    }
    checkGoal() {
        if (this.hasWon) {
            if (containsCoordinates(this.levelData.goal, this.snake[0])) {
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
