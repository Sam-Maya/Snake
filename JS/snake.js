//Game board
let blockSize = 25;
let rows = 20;
let cols = 20;
let board = undefined;
let context = undefined;
console.log('hi')

window.onload = function() {
    board = document.querySelector("#board")
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext('2d');

    update();
}

