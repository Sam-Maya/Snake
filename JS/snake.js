//Game board
let blockSize = 25;
let rows = 20;
let cols = 20;
let board = undefined;
let context = undefined;

//snake head
let snakeX = blockSize * 10;
let snakeY = blockSize * 10;

//food
let foodX = undefined;
let foodY = undefined;


window.onload = function() {
    board = document.querySelector("#board"); 
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext('2d'); // lets you "draw" on the board

    placeFoodRandomly();
    update();
}

function update(){
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "#05c71e";
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

}

function placeFoodRandomly(){
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}