//Game board
let blockSize = 25;
let rows = 20;
let cols = 20;
let board = undefined;
let context = undefined;

//snake head
let snakeX = blockSize * 10;
let snakeY = blockSize * 10;

//snake body
let body = [];

//food
let foodX = undefined;
let foodY = undefined;

//moving the snake
let velocityX = 0;
let velocityY = 0;


window.onload = function() {
    board = document.querySelector("#board"); 
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext('2d'); // lets you "draw" on the board

    placeFoodRandomly();
    document.addEventListener("keydown", move)
    setInterval(update, 1000/10);
}

function update(){
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if(snakeX === foodX && snakeY === foodY){
        placeFoodRandomly();
    }

    context.fillStyle = "#05c71e";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
}

function placeFoodRandomly(){
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function move(input){
    if(input.code == "ArrowUp" && velocityY !== 1){
        velocityX = 0;
        velocityY = -1;
    }
    else if(input.code == "ArrowDown" && velocityY !== -1){
        velocityX = 0;
        velocityY = 1;
    }
    else if(input.code == "ArrowLeft" && velocityX !== 1){
        velocityX = -1;
        velocityY = 0;
    }
    else if(input.code == "ArrowRight" && velocityX !== -1){
        velocityX = 1;
        velocityY = 0;
    }
}