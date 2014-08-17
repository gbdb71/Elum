var grid = new Grid();
grid.placeBlock(9, 9, new Block(BLOCK_TYPE.EARTH));

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

  if(grid.canPlaceBlock(gridCoords.x, gridCoords.y)
      && grid.hasNeighborBlocks(gridCoords.x, gridCoords.y))
  {
    var nextBlockType = getNextBlockType();
    var nextBlock = new Block(nextBlockType);
    grid.placeBlock(gridCoords.x, gridCoords.y, nextBlock);
  }
}

var randomBlockEnabled = true;
var nextBlockType = BLOCK_TYPE.EMPTY;

function handleKeyPress(keyboardEvent)
{
  switch(keyboardEvent.which)
  {
    case 81: // Q
      randomBlockEnabled = false;
      nextBlockType = BLOCK_TYPE.EARTH;
      break;

    case 87: // W
      randomBlockEnabled = false;
      nextBlockType = BLOCK_TYPE.WATER;
      break;

    case 69: // E
      randomBlockEnabled = false;
      nextBlockType = BLOCK_TYPE.WIND;
      break;

    case 82: // R
      randomBlockEnabled = false;
      nextBlockType = BLOCK_TYPE.FIRE;
      break;

  case 84: // T
    randomBlockEnabled = true;
    nextBlockType = BLOCK_TYPE.EMPTY;
    break;
  }
}

function getNextBlockType() {

  return randomBlockEnabled
    ? Math.floor(Math.random() * 4) + 1
    : nextBlockType;
}

window.setInterval(loop, 100);
loop();

canvas.addEventListener('click', handleClick, false);
window.addEventListener('keydown', handleKeyPress, false);
