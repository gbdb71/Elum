var grid = new Grid();
grid.addBlock(3, 5, BLOCK_TYPE.FIRE);
grid.addBlock(8, 9, BLOCK_TYPE.EARTH);
grid.addBlock(10, 20, BLOCK_TYPE.WIND);
grid.addBlock(40, 3, BLOCK_TYPE.WATER);
grid.addBlock(40, 4, BLOCK_TYPE.FIRE);

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
