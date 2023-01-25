//Variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let dBolinha = 17;
let raioB = dBolinha / 2; //Esse raio é para a bolinha não entrar metade na borda, já que o centro é o ponto X e queremos a borda dela.

//Movimento da bolinha
let velXBolinha = 5;
let velYBolinha = 5;

//variaveis da Raquete
let xRaquete = 5;
let yRaquete = 150;
let rComprimento = 10;
let rAltura = 90;
let colidiu = false;

//variaveis Raquete oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

//Placar
let meusPontos = 0;
let pontosDoOponente = 0;

//Erro oponente
let chanceDeErrar = 0;

//sons do jogo
let trilha;
let ponto;
let raquetada;

function preload() {
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentoBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaquete();
  verificaColisaoRaquete();
  colisaoRaqueteBiblioteca(xRaquete, yRaquete);
  colisaoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  //bolinhaNaoFicaPresa();
  //multiplayer();
  incluirPlacar();
  mostrarPontos();
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, dBolinha);
}

function movimentoBolinha(){
  xBolinha += velXBolinha;
  yBolinha += velYBolinha;
}

function verificaColisaoBorda(){
  if (xBolinha + raioB > width || xBolinha - raioB < 0){
    velXBolinha *= -1;
  }
  if (yBolinha + raioB > height || yBolinha - raioB < 0){
    velYBolinha *= -1;
  }
}

function mostraRaquete(x, y){
  rect(x, y, rComprimento, rAltura);
}

function movimentaRaquete(){
  if(keyIsDown(UP_ARROW)) {
    yRaquete -= 8;
  }
  if(keyIsDown(DOWN_ARROW)) {
    yRaquete += 8;
  }
}

function verificaColisaoRaquete() {
  if (xBolinha - raioB < xRaquete + rComprimento && yBolinha - raioB < yRaquete + rAltura && yBolinha + raioB > yRaquete){
    velXBolinha *= -1;
    raquetada.play();
  }
  
}

function colisaoRaqueteBiblioteca(x, y){
  colidiu = collideRectCircle(x, y, rComprimento, rAltura, xBolinha, yBolinha, raioB);
  
  if(colidiu){
    velXBolinha *= -1;
    raquetada.play();
  }
  
}

function movimentaRaqueteOponente() {
  velocidadeYOponente = yBolinha - yRaqueteOponente - rComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  
  calculaChanceDeErrar();
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function bolinhaNaoFicaPresa(){
    if (xBolinha - raioB < 0){
    xBolinha = 23
    }
}

function multiplayer(){
  if(keyIsDown(87)) {
    yRaqueteOponente -= 8;
  }
  if(keyIsDown(83)) {
    yRaqueteOponente += 8;
  }
} //função para multiplayer


function incluirPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(20);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 470, 26);
}

function mostrarPontos(){
  if (xBolinha > 590) {
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10) {
    pontosDoOponente += 1;
    ponto.play();
  }
}

