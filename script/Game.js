function Game(canvas)
{
  this.canvas = canvas;
  this.context = canvas.getContext("2d");

  this.grid = new Grid(this);
  this.ui = new UserInterface(this);

  this.nextBlockType;

  this.virusTimer = 0;
  this.virusDropInterval = 100;

  this.currentToxicity = 0;
}

Game.prototype.update = function()
{
  this.grid.update();

  this.virusTimer++;

  if(this.virusTimer > this.virusDropInterval)
  {
    var virusX = Math.floor(Math.random() * this.grid.width);

    if(this.grid.canPlaceBlock(virusX, 0))
    {
      this.grid.placeBlock(virusX, 0, new Block(BLOCK_TYPE.VIRUS));
    }

    this.virusTimer = 0;
  }
}

Game.prototype.draw = function()
{
    this.grid.draw(this.context);
    this.ui.draw(this.context);
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

  self.updateBlockType();

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
      var nextBlock = new Block(game.nextBlockType);
      game.grid.placeBlock(gridCoords.x, gridCoords.y, nextBlock);

      // Select a new block
      game.updateBlockType();
    }

  }

}

Game.prototype.updateBlockType = function() {
  this.nextBlockType = Math.floor(Math.random() * 3 + 1);
  this.ui.nextBlockType = this.nextBlockType;
}

Game.prototype.updateVirusCount = function(virusCount) {

  this.currentToxicity = Math.floor((virusCount/20) * 100);

  if(this.currentToxicity >= 100)
  {
    this.handleLose();
  }

}

Game.prototype.handleLose = function() {
  console.log("LOSE CONDITION");
}
