let ball, block;
let pontos = 0, erros = 0;
function setup() {
    frameRate(30);
    createCanvas(500, 500);
    background(100);
}
function draw() {
    background(100);
    text(`Erros: ${erros}`, 15, 30);
    text(`Pontos: ${pontos}`, 15, 60);
    if(!ball) ball = new Ball(300, 100);
    if(!block) block = new Block(200, 470);
    block.draw()
    ball.draw();
    ball.update();
    captureKeyboard();
    let win = checkWin(ball, block);
    if(win) {restart(ball, block); pontos++}
    if(ball.y >= 500) {restart(ball, block); erros++}
    if(erros >= 5) {erros = 0; pontos = 0}
}
function captureKeyboard() {
    if(keyIsDown(LEFT_ARROW)) move(37);
    if(keyIsDown(RIGHT_ARROW)) move(39);

}
function move(direcao) {
    block.update(direcao);
}
function checkWin(ball, block) {
    let BallX = ball.x+20;
    let BallY = ball.y;
    let BlockX = block.x;
    let BlockY = block.y;
    if(BallY > BlockY) {
        if(BallX > BlockX && BallX < (BlockX+113)) return true;
    } 
    return false;
}
function restart(ball, block) {
    ball.x = Math.floor(Math.random()*480);
    ball.y = 100;
    ball.yVelocity = 1;
}
class Ball {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.yVelocity = 1;
        this.gravity = 0.5
    }
    update() {
        this.yVelocity  += this.gravity;
        this.y += this.yVelocity;
    }
    draw() {
        ellipse(this.x, this.y, 20, 20);
    }
}
class Block {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    update(direcao) {
        let x = this.x;
        console.log(direcao);
        if(x > 380 && direcao === 37) return this.x += -10;
        if(x < 20 && direcao === 39) return this.x += 10;
        if(x > 20 && direcao === 37) return this.x += -10;
        if(x < 380 && direcao === 39) return this.x += 10;
    }
    draw() {
        rect(this.x, this.y, 100, 25)
    }
}