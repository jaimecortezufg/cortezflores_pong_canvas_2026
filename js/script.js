const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");

//Creación de rectángulos (jugadores y pelota)
function Rect(x,y,width,height,color){
    return {x,y,width,height,color};
}

//Creación de objetos (jugadores y pelota)
const player1 = Rect(0, (canvas.height-100)/2,20,100,'white');
const player2 = Rect((canvas.width-20), (canvas.height-10)/2,20,100,'white');
const ball = Rect(canvas.width/2 - 10,canvas.height/2 - 10,20,20,'white');
//agregar propiedad de velocidad a la pelota
ball.velocityX=4;
ball.velocityY=4;

//Dibujar rectágulos con propiedades nativas de canvas
function drawRect(rect){
    context.fillStyle = rect.color;
    context.fillRect(rect.x,rect.y,rect.width,rect.height);
}

//Dibujar todo.
function draw(){
    context.clearRect(0,0,canvas.width,canvas.height); //Primero se limpia el canvas
    drawRect(player1);
    drawRect(player2);
    drawRect(ball);
}

function update(){
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    if(ball.y <=0 || ball.y+ball.height >= canvas.height){
        ball.velocityY *= -1;
    }

    if(
        (ball.x <= player1.x+player1.width && ball.y+ball.height > player1.y && ball.y <player1.y+player1.height) ||
        (ball.x+ball.width >= player2.x && ball.y+ball.height >player2.y && ball.y < player2.y+player2.height)
    ){
        ball.velocityX *= -1;
    }

    if(ball.x < 0 || ball.x > canvas.width){
        ball.x = canvas.width/2 -10;
        ball.y = canvas.height/2 -10;
        ball.velocityX *= -1;
        ball.velocityY *= Math.random() > 0.5 ? 1 : -1; // cambiar aleatoreamente la dirección vertical de a pelota
    }

}

//Movimiento de jugadores
window.addEventListener('keydown',(event) => {
    const key = event.key;
    //mover al jugador 2 (jugador de la derecha) con tecla direccional arriba o abajo
    if(key === 'ArrowUp' && player2.y > 0) player2.y -= 10;
    if(key === 'ArrowDown' && player2.y+player2.height<canvas.height) player2.y += 10;
    //mover al jugador 1 (jugador de la izquierda) con tecla arriba 'w' o abajo con tecla 's'
    if(key === 'w' && player1.y > 0) player1.y -=10;
    if(key === 's' && player1.y + player1.height < canvas.height) player1.y += 10;
});

//Ciclo del Juego
function gameLoop(){
    update();
    draw();
    requestAnimationFrame(gameLoop); //TAREA ¿EN QUÉ CONSISTE EL MÉTODO requestAnimationFrame()?
}

//Iniciar juego
gameLoop();