const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var solo;
var corda, corda2, corda3;
var fruta;
var fruta_cons, fruta_cons3, fruta_cons2;
var imagemComida;
var imagemCoelho;
var fundo;
var spriteCoelho;
var botao, botao2, botao3;
var balao;
var botaomudo;

var canW, canH;


var piscando, comendo, triste;
var musica, sombalao, somcorda, somcomer, somtriste;

function preload(){
  imagemComida =  loadImage("melon.png");
  imagemCoelho = loadImage("Rabbit-01.png");
  fundo = loadImage("background.png");
  piscando = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  comendo = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png");
  triste = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");
  comendo.playing = true;
  triste.playing = true;
  piscando.playing = true;
  piscando.looping = true;
  comendo.looping = false;
  triste.looping = false;
  musica = loadSound("sound1.mp3");
  somtriste = loadSound("sad.wav");
  sombalao = loadSound("air.wav");
  somcorda = loadSound("rope_cut.mp3");
  somcomer = loadSound("eating_sound.mp3");



}

function setup() {
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if(isMobile){
  canW = displayWidth;
  canH = displayHeight;
  createCanvas(canW + 80, canH);

}
else {
  canW = windowWidth-10;
  canH = windowHeight-10;
  createCanvas(canW, canH);
}

  piscando.frameDelay = 20;
  comendo.frameDelay = 20;
  triste.frameDelay = 20;
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  solo = new Solo(200, canH-10, 600, 20);
  corda = new Corda(9, {x: 40, y: 30});
  corda2 = new Corda(7, {x: 370, y: 40});
  corda3 = new Corda(4, {x: 400, y: 225});

  spriteCoelho = createSprite(250, canH-85, 100, 100);
  spriteCoelho.scale = 0.2
  spriteCoelho.addImage(imagemCoelho);
  spriteCoelho.addAnimation("piscando", piscando);
  spriteCoelho.addAnimation("triste", triste);
  spriteCoelho.addAnimation("comendo", comendo);
  spriteCoelho.changeAnimation("piscando");
  botaomudo = createImg("mute.png");
  botaomudo.mouseClicked(mudo);
  botaomudo.size(50,50);
  botaomudo.position(435, 20);
  

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);

  fruta_options = {
    density: 0.001
  }
  fruta = Bodies.circle(300, 300, 20, fruta_options);
  Composite.add(corda.body, fruta);
  fruta_cons = new Link(corda, fruta);
  fruta_cons2 = new Link(corda2, fruta);
  fruta_cons3 = new Link(corda3, fruta);


  imageMode(CENTER);

  botao = createImg("cut_button.png");
  botao.size(50, 50);
  botao.position(20, 30);
  botao.mouseClicked(tirar);

  botao2 = createImg("cut_button.png");
  botao2.size(50, 50);
  botao2.position(330, 35);
  botao2.mouseClicked(tirar2);

  botao3 = createImg("cut_button.png");
  botao3.size(50, 50);
  botao3.position(360, 200);
  botao3.mouseClicked(tirar3);



  musica.play();
  musica.setVolume(0.2);


  
}

function draw() {
 
  background(51);
  image(fundo, canW/2, canH/2, canW, canH);
  if (fruta!= null){
    image(imagemComida, fruta.position.x, fruta.position.y, 80, 80);
  }
  solo.mostrar();
  corda.mostrar();
  corda2.mostrar();
  corda3.mostrar();

  if(colisao(fruta, spriteCoelho)){
    spriteCoelho.changeAnimation("comendo");
    somcomer.play();
  }
 
  if(colisao(fruta, solo.body)){
    spriteCoelho.changeAnimation("triste");
    musica.stop();
    somtriste.play();
  }
  Engine.update(engine);
  
drawSprites();



}
function tirar(){
  corda.cortar();
  somcorda.play();
  fruta_cons.soltar();
  fruta_cons = null;
}
function tirar2(){
  corda2.cortar();
  somcorda.play();
  fruta_cons2.soltar();
  fruta_cons2 = null;
}
function tirar3(){
  corda3.cortar();
  somcorda.play();
  fruta_cons3.soltar();
  fruta_cons3 = null;
}
function colisao(corpo, sprite){
  if(fruta!= null){
    var d = dist(corpo.position.x, corpo.position.y, sprite.position.x, sprite.position.y);
    if(d <= 80){
      World.remove(world, fruta);
      fruta = null;
      return true;
    }
    else {
      return false;
    }
  }
}

function mudo(){
  if(musica.isPlaying()){
    musica.stop();
  }
  else {
    musica.play();
  }
}