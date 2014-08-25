var GAME_STATE = {
  PLAYING: 1,
  PAUSED: 2
};

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

  this.currentState = GAME_STATE.PLAYING;
}

Game.prototype.update = function()
{
  if(this.currentState === GAME_STATE.PLAYING)
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
}

Game.prototype.draw = function()
{
  if(this.currentState === GAME_STATE.PLAYING)
  {
    this.grid.draw(this.context);
    this.ui.draw(this.context);
  }
}

Game.prototype.start = function()
{
  var self = this;

  self.canvas.addEventListener('click', function(mouseEvent) { self.handleClick(self, mouseEvent) }, false);
  self.canvas.addEventListener('mousemove', function(mouseEvent) { self.handleMouseMove(self, mouseEvent) }, false);

  function loop()
  {
    self.update();
    self.draw();
  }

  self.updateBlockType();

  window.setInterval(loop, 100);
  loop();

  this.displayMessage("assignment 001", "Place 10 EARTH blocks");

}

Game.prototype.handleClick = function(game, mouseEvent)
{

  if(this.currentState === GAME_STATE.PAUSED)
  {
    this.currentState = GAME_STATE.PLAYING;
    return;
  }

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

Game.prototype.handleMouseMove = function(game, mouseEvent)
{

  if(this.currentState === GAME_STATE.PAUSED)
  {
    this.currentState = GAME_STATE.PLAYING;
    return;
  }

  var relativeX = mouseEvent.x - game.canvas.offsetLeft;
  var relativeY = mouseEvent.y - game.canvas.offsetTop;

  if(relativeX <= 1000)
  {

    // User has clicked the grid
    var gridCoords = game.grid.getGridCoordinates(relativeX, relativeY);

    if(game.grid.canPlaceBlock(gridCoords.x, gridCoords.y))
    {
      game.grid.addPlaceholder(gridCoords.x, gridCoords.y);
      return;
    }

  }

  game.grid.removePlaceholder();

}

Game.prototype.updateBlockType = function() {
  this.nextBlockType = Math.floor(Math.random() * 4 + 1);
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

Game.prototype.displayMessage = function(modalTitle, modalText) {

  this.currentState = GAME_STATE.PAUSED;

  this.context.fillStyle = "rgba(0, 0, 0, 0.5)";
  this.context.fillRect(0, 0, 1000, 500);

  this.context.fillStyle = "#111";
  this.context.fillRect(0, 150, 1000, 200);

  this.context.fillStyle = "#777";
  this.context.font = "30px Arial, sans-serif";
  this.context.fillText(modalTitle, 50, 200);

  this.context.fillStyle = "#FFF";
  this.context.font = "20px Arial, sans-serif";
  this.context.fillText(modalText, 50, 240);

}
