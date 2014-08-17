var GAME_STATE = {
  START: 0,
  IN_LEVEL: 1
};

function Game(canvas)
{
  this.canvas = canvas;
  this.context = canvas.getContext("2d");

  this.grid = null;
  this.ui = new UserInterface();

  this.nextBlockType = BLOCK_TYPE.EARTH;

  this.currentLevel = 0;
  this.currentState = GAME_STATE.START;
}

Game.prototype.update = function()
{
  switch(this.currentState)
  {
    case GAME_STATE.START:
      this.grid = new Grid();
      LEVELS[this.currentLevel](this.grid);
      this.currentState = GAME_STATE.IN_LEVEL;
      break;

    case GAME_STATE.IN_LEVEL:
      this.grid.update();
      break;
  }
}

Game.prototype.draw = function()
{
  switch(this.currentState)
  {
    case GAME_STATE.IN_LEVEL:
      this.grid.draw(this.context);
      this.ui.draw(this.context);
      break;
  }
}

Game.prototype.start = function()
{
  var self = this;

  self.canvas.addEventListener('click', function(mouseEvent) { self.handleClick(self, mouseEvent) }, false);
  window.addEventListener('keydown', function(keyboardEvent) { self.handleKeyPress(self, keyboardEvent) }, false);

  function loop()
  {
    self.update();
    self.draw();
  }

  window.setInterval(loop, 100);
  loop();

}

Game.prototype.handleClick = function(game, mouseEvent)
{

  var relativeX = mouseEvent.x - game.canvas.offsetLeft;
  var relativeY = mouseEvent.y - game.canvas.offsetTop;

  var gridCoords = game.grid.getGridCoordinates(relativeX, relativeY);

  if(game.grid.canPlaceBlock(gridCoords.x, gridCoords.y)
      && game.grid.hasNeighborBlocks(gridCoords.x, gridCoords.y))
  {
    var nextBlockType = game.getNextBlockType();
    var nextBlock = new Block(nextBlockType);
    game.grid.placeBlock(gridCoords.x, gridCoords.y, nextBlock);
  }

}

Game.prototype.handleKeyPress = function(game, keyboardEvent)
{
  switch(keyboardEvent.which)
  {
    case 81: // Q
      game.nextBlockType = BLOCK_TYPE.EARTH;
      break;

    case 87: // W
      game.nextBlockType = BLOCK_TYPE.WATER;
      break;

    case 69: // E
      game.nextBlockType = BLOCK_TYPE.WIND;
      break;

    case 82: // R
      game.nextBlockType = BLOCK_TYPE.FIRE;
      break;

    case 84: // T
      game.nextBlockType = BLOCK_TYPE.EMPTY;
      break;

    default:
      game.nextBlockType = BLOCK_TYPE.EARTH;
      break;
  }
}

Game.prototype.getNextBlockType = function() {
  return this.nextBlockType;
}
