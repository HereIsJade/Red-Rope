var socket;
var dataX = 0, dataY = 0;
var transX=120;
var trans=120;
function setup() {
  createCanvas(1280, 900);
  background(0);
  // Start a socket connection to the server
  // Some day we would run this server somewhere else
  // socket = io.connect('http://localhost:3000');
  socket = io.connect(window.location.hostname);
  // We make a named event called 'mouse' and write an
  // anonymous callback function
  socket.on('mouse',
    // When we receive data
    function(data) {
      console.log("Got: " + data.x + " " + data.y);
      // Draw a blue circle
      fill(50,255,255,120);
      noStroke();
      ellipse(data.x, data.y, 10, 10);
    }
  );
}

function draw() {
  background(0,2);

}

function touchMoved() {
  // Draw some white circles
  fill(0, 255, 100,80);
  noStroke();
  ellipse(mouseX,mouseY,10,10);
  // Send the mouse coordinates
  sendmouse(mouseX,mouseY);
  return false;
}

// Function for sending to the socket
function sendmouse(xpos, ypos) {
  // We are sending!
  console.log("sendmouse: " + xpos + " " + ypos);

  // Make a little object with  and y
  var data = {
    x: xpos,
    y: ypos
  };

  // Send that object to the socket
  socket.emit('mouse',data);
}

// function newDrawing(data){
//   dataX=data.x;
//   dataY=data.y;
// }
