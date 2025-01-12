const playBoard = document.querySelector('.play-board');

// variables CSS
const styles = getComputedStyle(document.documentElement);
const root = document.documentElement;
let gridXSize =10;
let gridYSize =10;
root.style.setProperty('--grid-x-size', gridXSize);
root.style.setProperty('--grid-y-size', gridYSize);

let foodX, foodY;
let inicialHeadX =5, inicialHeadY=5;
let playing = true;
let snake={
    length:1,
    direction: 'right',
    velocityX:0,
    velocityY:0,
    body : [{ x: inicialHeadX, y: inicialHeadY }],
};
const changeFoodPosition=() => {
    foodX = Math.floor(Math.random()*gridXSize)+1;
    foodY = Math.floor(Math.random()*gridYSize)+1;
    if (snake.body.some((part) => part.x === foodX && part.y === foodY)) {
        changeFoodPosition();
    }
}

const initGame=() => {
    if (!playing) return ;
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX};"></div>`;
    // Update snake body positions
    for (let i = snake.length - 1; i > 0; i--) {
        snake.body[i] = { ...snake.body[i - 1] };
    }
    snake.body[0].x += snake.velocityX;
    snake.body[0].y += snake.velocityY;
    
    // Draw the snake
    htmlMarkup += `<div class="snake-head" style="grid-area: ${snake.body[0].y} / ${snake.body[0].x};"></div>`;
    for (let i = 1; i < snake.length; i++) {
        htmlMarkup += `<div class="snake-body" style="grid-area: ${snake.body[i].y} / ${snake.body[i].x};"></div>`;
    }
    //
    playBoard.innerHTML = htmlMarkup;
    checkPosition()
}

const checkPosition=() => {
    if(snake.body[0].x === foodX && snake.body[0].y === foodY){
        console.log(snake.length)
        snake.body.push({ x: snake.body[snake.length - 1].x, y: snake.body[snake.length - 1].y });
        snake.length++;
        changeFoodPosition();
    }
    
    if(snake.body[0].x < 1 || snake.body[0].x > gridXSize || snake.body[0].y < 1 || snake.body[0].y > gridYSize){
        alert('Game Over');
        console.log("game over")
        playing = false;
        snake.velocityX = 0;
        snake.velocityY = 0;
    }

}

const changeDirection= (e) => {
    console.log(e.key)
    console.log(snake.direction)
    if(e.key === 'ArrowUp' && snake.direction !== 'down'){
        snake.direction = 'up';
        snake.velocityX = 0;
        snake.velocityY = -1;
        }
    else if (e.key === 'ArrowDown' && snake.direction !== 'up'){
        snake.direction = 'down';
        snake.velocityX = 0;
        snake.velocityY = 1;}
    else if (e.key === 'ArrowRight' && snake.direction !== 'left'){
        snake.direction = 'right';
        snake.velocityX = 1;
        snake.velocityY = 0;}
    else if (e.key === 'ArrowLeft' && snake.direction !== 'right'){
        snake.direction = 'left';
        snake.velocityX = -1;
        snake.velocityY = 0 ;}
    }
    


changeFoodPosition();
document.addEventListener('keydown', changeDirection);
setInterval(initGame, 200);