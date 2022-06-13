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

//is game over
let gameOver = false;

//used to handle swipes on mobile
let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;


window.onload = function() {
    board = document.querySelector("#board"); 
    if(window.innerWidth <= 700){
        blockSize = 15;
        snakeX = blockSize * 10;
        snakeY = blockSize * 10;
    }
    board.width = cols * blockSize;
    board.height = rows * blockSize;
    context = board.getContext('2d'); // lets you "draw" on the board

    placeFoodRandomly();
    document.addEventListener("keydown", move)
    setInterval(update, 1000/10);
}

function update(){
    if (gameOver){
        return;
    }

    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if(snakeX === foodX && snakeY === foodY){
        body.push([foodX, foodY]);//adds to body when food is eaten
        placeFoodRandomly();
    }

    context.fillStyle = "#05c71e";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    //game over conditions
    if(snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize){
        gameOver = true;
        alert("Game Over");
    }

    for(let i = 0; i < body.length; i++){
        if(snakeX == body[i][0] && snakeY == body[i][1]){
            gameOver = true;
            alert("Game Over");
        }
    }
    
    //creates a body from the food the snake eats
    for(let i = 0; i < body.length; i++){
        context.fillRect(body[i][0], body[i][1], blockSize, blockSize);
    }

    for(let i = body.length - 1; i > 0; i--){
        body[i] = body[i - 1];
    }

    if(body.length){
        body[0] = [snakeX, snakeY];
    }
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

//handles swipes on mobile
document.addEventListener('touchstart', function(event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
}, false);

document.addEventListener('touchend', function(event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    handleGesture();
}, false); 

function handleGesture() {
    if (touchendX + 100 < touchstartX && velocityX !== 1){
        velocityX = -1;
        velocityY = 0;
    }
    
    else if (touchendX > touchstartX + 100 && velocityX !== -1){
        velocityX = 1;
        velocityY = 0;
    }
    
    else if (touchendY + 100 < touchstartY && velocityY !== 1){
        velocityX = 0;
        velocityY = -1;
    }
    
    else if (touchendY > touchstartY + 100&& velocityY !== -1){
        velocityX = 0;
        velocityY = 1;
    }
}