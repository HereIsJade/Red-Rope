var socket;
var dataX = 0, dataY = 0;
var  VerletPhysics2D = toxi.physics2d.VerletPhysics2D,
     VerletParticle2D = toxi.physics2d.VerletParticle2D,
     Vec2D = toxi.geom.Vec2D,
     ParticleString2D = toxi.physics2d.ParticleString2D;

import processing.opengl.*;

import toxi.physics2d.constraints.*;
import toxi.physics2d.*;

import toxi.geom.*;
import toxi.math.*;

int NUM_PARTICLES = 75;
int REST_LENGTH=10;

VerletPhysics2D physics;
VerletParticle2D head,tail;

boolean isTailLocked;

var startTime;
// var currTime;
void setup() {
  size(1280, 960);
  smooth();
  physics=new VerletPhysics2D();
  Vec2D stepDir=new Vec2D(1,1).normalizeTo(REST_LENGTH);
  ParticleString2D s=new ParticleString2D(physics, new Vec2D(), stepDir, NUM_PARTICLES, 1, 0.1);
  head=s.getHead();
  head.lock();
  tail=s.getTail();

  // socket = io.connect('http://localhost:3000');
  socket = io.connect(window.location.hostname);
  socket.on('mouse', newDrawing);
  startTime=0;
}

void draw() {
 background(0);
 stroke(255,0,0);
 noFill();
 head.set(mouseX,mouseY);
 tail.set(dataX,dataY);
 physics.update();
 beginShape();
 int partLen = physics.particles.length;
 int i =0;
 for(i=0;i<partLen;i++) {
   VerletParticle2D p= physics.particles[i];
   vertex(p.x,p.y);
 }
 endShape();
 for(i=0;i<partLen;i++) {
   VerletParticle2D p= physics.particles[i];
   ellipse(p.x,p.y,0.2,0.2);
 }

 int currTime=second();
 if(currTime==30){
   window.location.href = "draw.html";
 }
 console.log(currTime);
}

void mousePressed() {
 isTailLocked=!isTailLocked;
 if (isTailLocked) {
   tail.lock();
 }
 else {
   tail.unlock();
 }
}

void mouseMoved() {
  console.log(mouseX,mouseY);
  var data={
    x:mouseX,
    y:mouseY
  }
  socket.emit('mouse',data);
}

function newDrawing(data){
  dataX=data.x;
  dataY=data.y;
}
