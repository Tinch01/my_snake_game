// variables CSS
const playBoard = document.querySelector('.play-board');
const scoreElement = document.querySelector('.score-number');
const highScoreElement = document.querySelector('.high-score-number');
const styles = getComputedStyle(document.documentElement);
const root = document.documentElement;
//Configuracion default:
let gridYSize =10;
let gridXSize =10;
let inicialHeadX =5, inicialHeadY=5;
root.style.setProperty('--grid-x-size', gridXSize);
root.style.setProperty('--grid-y-size', gridYSize);

let score = 0;
let highScore = 0; //ACA DEBERIA OBTENERLO E ALGUN LADO
let setIntervalId;
let gameOver=false;
let playing = true; //Borrar variable si no se usa
let foodX, foodY;
let snake={
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

const handleGameOver=() => {
    clearInterval(setIntervalId);
    alert('Game Over');
    playing = false;
    location.reload();
}
const initGame=() => {
    if (gameOver) {
        handleGameOver();
        return;
    }
    if (score > highScore){
        highScore=score;
    }
    scoreElement.innerHTML = score;
    highScoreElement.innerHTML = highScore;
    console.log("primero va..", JSON.stringify(snake.body));

    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX};"></div>`;
    // Update snake body positions
    for (let i = snake.body.length - 1; i > 0; i--) {
        snake.body[i].x = snake.body[i - 1].x
        snake.body[i].y = snake.body[i - 1].y ;
    }
    snake.body[0].x += snake.velocityX;
    snake.body[0].y += snake.velocityY;
    
    // Draw the snake
    htmlMarkup += `<div class="snake-head" style="grid-area: ${snake.body[0].y} / ${snake.body[0].x};"></div>`;
    //for (let i = 1; i < snake.body.length; i++) {
        //    htmlMarkup += `<div class="snake-body" style="grid-area: ${snake.body[i].y} / ${snake.body[i].x};"></div>`;
        //}
    for (let i=1; i<=snake.body.length -1 && i > 0 ; i++){
        htmlMarkup += `<div class="snake-body" style="grid-area: ${snake.body[i].y} / ${snake.body[i].x};"></div>`;
    }
        
    playBoard.innerHTML = htmlMarkup;
    checkPosition()
    console.log("despues va..", JSON.stringify(snake.body));

}

const checkPosition=() => {
    if(snake.body[0].x === foodX && snake.body[0].y === foodY){
        //snake.body.push({ x: snake.body[snake.body.length - 1].x, y: snake.body[snake.body.length - 1].y });
        snake.body.push({ x: foodX, y:foodY });
        console.log("crecio a:", snake.body.length)
        score++;
        changeFoodPosition();
    }else if (snake.body.slice(1).some(part => part.x === snake.body[0].x && part.y === snake.body[0].y)) {
        alert('TU CUERPO!');
        gameOver=true;
        
    }
    
    if(snake.body[0].x < 1 || snake.body[0].x > gridXSize || snake.body[0].y < 1 || snake.body[0].y > gridYSize){
        gameOver=true;
    }

}

const changeDirection= (e) => {
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
setIntervalId = setInterval(initGame, 125);