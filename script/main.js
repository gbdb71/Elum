var grid = new Grid();

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

function handleClick(mouseEvent)
{
  var relativeX = mouseEvent.x - canvas.offsetLeft;
  var relativeY = mouseEvent.y - canvas.offsetTop;

  var gridCoords = grid.getGridCoordinates(relativeX, relativeY);

  if(grid.canAddBlock(gridCoords.x, gridCoords.y))
  {
    var nextBlockType = getNextBlockType();
    console.log(nextBlockType);
    grid.addBlock(gridCoords.x, gridCoords.y, getNextBlockType());
  }
}

function getNextBlockType() {

  return Math.floor(Math.random() * 4) + 1;

}

window.setInterval(loop, 100);
loop();

canvas.addEventListener('click', handleClick, false);
