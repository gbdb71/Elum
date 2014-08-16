var grid = new Grid();
grid.addBlock(3, 5);
grid.addBlock(8, 9);

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
