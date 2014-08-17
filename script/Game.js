var GAME_STATE = {
  START: 0,
  IN_LEVEL: 1
};

function Game(canvas)
{
  this.canvas = canvas;
  this.context = canvas.getContext("2d");

  this.grid = null;
  this.ui = new UserInterface(this);

  this.nextBlockType = BLOCK_TYPE.EARTH;

  this.currentLevel = 0;
  this.currentState = GAME_STATE.START;

  this.tileCounts = [];
  this.tileCounts[BLOCK_TYPE.EARTH] = 0;
  this.tileCounts[BLOCK_TYPE.WATER] = 0;
  this.tileCounts[BLOCK_TYPE.FIRE] = 0;
  this.tileCounts[BLOCK_TYPE.WIND] = 0;
}

Game.prototype.update = function()
{
  switch(this.currentState)
  {
    case GAME_STATE.START:
      this.setUpLevel(this.currentLevel);
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

  if(relativeX > 1000)
  {

    // User has clicked the user interface
    game.ui.handleClick(relativeX, relativeY);

  }
  else
  {

    // User has clicked the grid
    var gridCoords = game.grid.getGridCoordinates(relativeX, relativeY);

    if(game.grid.canPlaceBlock(gridCoords.x, gridCoords.y))
    {
      var nextBlockType = game.getNextBlockType();
      var nextBlock = new Block(nextBlockType);
      game.grid.placeBlock(gridCoords.x, gridCoords.y, nextBlock);
    }

  }

}

Game.prototype.getNextBlockType = function() {
  return this.nextBlockType;
}

Game.prototype.handleSelectBlockType = function(blockType) {
  this.nextBlockType = blockType;
}

Game.prototype.handleResetLevel = function(blockType) {
  this.setUpLevel(this.currentLevel);
}

Game.prototype.handleWinLevel = function(blockType) {
  this.setUpLevel(++this.currentLevel);
}

Game.prototype.setUpLevel = function(levelIndex) {
  this.grid = new Grid(this);
  LEVELS[levelIndex](this.grid);
  this.currentState = GAME_STATE.IN_LEVEL;
}
