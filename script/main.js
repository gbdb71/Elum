var grid = new Grid();
grid.addBlock(3, 5);
grid.addBlock(8, 9);
grid.addBlock(10, 20);
grid.addBlock(40, 3);
grid.addBlock(40, 4);

var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

function update()
{
  grid.update();
}

function draw()
{
  grid.draw(context);
}

function loop()
{
  update();
  draw();
}

window.setInterval(loop, 200);
loop();
