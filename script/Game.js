var GAME_STATE = {
  PLAYING: 1,
  PAUSED: 2,
  GAME_OVER: 3
};

/**
 * The game
 * @constructor
 * @param {HTMLCanvasElement} canvas  - Canvas for displaying the game
 */
function Game(canvas)
{
  this.canvas = canvas;
  this.context = canvas.getContext("2d");

  var canvasWidth = canvas.width;
  var canvasHeight = canvas.height;

  var uiWidth = Math.floor(0.1666666666666667 * canvasWidth);

  var gridWidth = canvasWidth - uiWidth;
  var blockSize = Math.floor(gridWidth/SETTINGS.GridWidth);

  this.grid = new Grid(this, SETTINGS.GridWidth, SETTINGS.GridHeight, blockSize);
  this.ui = new UserInterface(this, gridWidth, 0, uiWidth, canvasHeight);

  this.reset();
}

Game.prototype.reset = function()
{
  this.nextBlockType;
  this.placeableBlocks = [BLOCK_TYPE.EARTH];
  this.overrideBlock = null;

  this.virusesEnabled = false;
  this.virusTimer = 0;
  this.virusDropInterval = 40;

  this.lifeEnabled = false;
  this.lifeTimer = 0;
  this.lifeDropInterval = 100;

  this.currentToxicity = 0;
  this.currentTerraform = 0;

  this.currentState = GAME_STATE.PLAYING;
  this.currentLevel = 0;
  this.currentGoal = "";
}

Game.prototype.update = function()
{
  if(this.currentState === GAME_STATE.PLAYING)
  {
    var stats = this.grid.update();
    this.checkLevelProgress(stats);

    this.updateVirusCount(stats.blockCounts[BLOCK_TYPE.VIRUS]);
    this.updateWaterLevel(stats.blockCounts[BLOCK_TYPE.WATER]);

    if(this.virusesEnabled)
    {
      this.virusTimer++;

      if(this.virusTimer > this.virusDropInterval)
      {
        var virusX = Math.floor(Math.random() * this.grid.width);

        if(this.grid.canPlaceBlock(virusX, 0))
        {
          this.grid.placeBlock(virusX, 0, new Block(BLOCK_TYPE.VIRUS, 50));
        }

        this.virusTimer = 0;
      }
    }

    if(this.lifeEnabled)
    {
      this.lifeTimer++;

      if(this.lifeTimer > this.lifeDropInterval)
      {
        var lifeX = Math.floor(Math.random() * this.grid.width);

        if(this.grid.canPlaceBlock(lifeX, 0))
        {
          this.grid.placeBlock(lifeX, 0, new Block(BLOCK_TYPE.LIFE, 50));
        }

        this.lifeTimer = 0;
      }
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

}

Game.prototype.handleClick = function(game, mouseEvent)
{

  if(this.currentState === GAME_STATE.PAUSED)
  {
    this.currentState = GAME_STATE.PLAYING;
    return;
  }

  if(this.currentState === GAME_STATE.GAME_OVER)
  {
    this.reset();
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
      var nextBlock = new Block(game.nextBlockType, 50);
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
      game.grid.movePlaceholder(gridCoords.x, gridCoords.y);
      return;
    }

  }

  game.grid.removePlaceholder();

}

Game.prototype.updateBlockType = function() {

  var nextBlockType;

  if(this.overrideBlock != null)
  {
    nextBlockType = this.overrideBlock;
  }
  else if(this.placeableBlocks.length == 1)
  {
    nextBlockType = BLOCK_TYPE.EARTH;
  }
  else
  {
    nextBlockType = this.placeableBlocks[Math.floor(Math.random() * this.placeableBlocks.length)];
  }

  this.nextBlockType = this.ui.nextBlockType = nextBlockType;
  this.overrideBlock = null;

}

Game.prototype.updateVirusCount = function(virusCount) {

  this.currentToxicity = Math.floor((virusCount/20) * 100);

  if(this.currentToxicity >= 100)
  {
    this.currentState = GAME_STATE.GAME_OVER;
    this.displayGameOver();
  }

}

Game.prototype.updateWaterLevel = function(waterCount) {

  this.currentWaterLevel = Math.floor((waterCount/10) * 100);

}

Game.prototype.displayGameOver = function() {

  this.context.fillStyle = "rgba(0, 0, 0, 0.5)";
  this.context.fillRect(0, 0, 1000, 500);

  this.context.fillStyle = "#111";
  this.context.fillRect(0, 150, 1000, 200);

  this.context.fillStyle = "#777";
  this.context.font = "30px Arial, sans-serif";
  this.context.fillText("MISSION FAILED", 50, 200);

  this.context.fillStyle = "#FFF";
  this.context.font = "20px Arial, sans-serif";
  this.context.fillText("Planet has become too toxic", 50, 240);

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

Game.prototype.checkLevelProgress = function(stats) {

  // Level 0: Pre-Start
  if(this.currentLevel == 0)
  {
    this.currentLevel++;
    return;
  }

  // Level 1: Start Game
  if(this.currentLevel == 1)
  {
    this.currentLevel++;
    this.currentGoal = "Place 10 EARTH";
    this.displayMessage("assignment 001", "Place 10 EARTH blocks");
    return;
  }

  // Level 2: Place 10 EARTH blocks
  if(this.currentLevel == 2)
  {
    if(stats.blockCounts[BLOCK_TYPE.EARTH] >= 10)
    {
      this.currentLevel++;
      this.currentGoal = "Place 5 FIRE";
      this.displayMessage("assignment 002", "You've unlocked FIRE! Get 5 fires burning at once");
      this.placeableBlocks.push(BLOCK_TYPE.FIRE);
      this.overrideBlock = BLOCK_TYPE.FIRE;
      return;
    }

    return;
  }

  // Level 3: Place 5 FIRE blocks
  if(this.currentLevel == 3)
  {
    if(stats.blockCounts[BLOCK_TYPE.FIRE] >= 5)
    {
      this.currentLevel++;
      this.currentGoal = "Burn 5 VIRUS";
      this.displayMessage("assignment 003", "VIRUSES are invading! Burn 5 VIRUSES with FIRE!");
      this.virusesEnabled = true;
      this.virusTimer = this.virusDropInterval + 1;
      return;
    }

    return;
  }

  // Level 4: Burn 10 VIRUSES with FIRE
  if(this.currentLevel == 4)
  {
    if(stats.burnedVirusCount >= 5)
    {
      this.currentLevel++;
      this.currentGoal = "Erode 1 EARTH";
      this.displayMessage("assignment 004", "You've unlocked WATER! Use WATER to erode 1 EARTH block");
      this.placeableBlocks.push(BLOCK_TYPE.WATER);
      this.overrideBlock = BLOCK_TYPE.WATER;
    }
  }

  // Level 5: Erode 1 EARTH block with WATER
  if(this.currentLevel == 5)
  {
    if(stats.erosionCount >= 1)
    {
      this.currentLevel++;
      this.currentGoal = "Spread 50 FIRE";
      this.displayMessage("assignment 005", "You've unlocked WIND! Use WIND to spread 50 FIRE blocks");
      this.placeableBlocks.push(BLOCK_TYPE.WIND);
      this.overrideBlock = BLOCK_TYPE.WIND;
    }
  }

  // Level 6: Spread 50 FIRE blocks with WIND
  if(this.currentLevel == 6)
  {
    if(stats.windSpreadFireCount >= 50)
    {
      this.currentLevel++;
      this.currentGoal = "Place 10 WATER";
      this.displayMessage("assignment 006", "You're ready to terraform! Place 10 WATER blocks");
    }
  }

  // Level 7: Place 10 WATER blocks
  if(this.currentLevel == 7)
  {
    if(stats.blockCounts[BLOCK_TYPE.WATER] >= 10)
    {
      this.currentLevel++;
      this.currentGoal = "Support 10 LIFE";
      this.displayMessage("assignment 007", "Keep 10 WATER blocks to support 10 LIFE");
    }
  }

  // Level 8: Support 10 LIFE
  if(this.currentLevel == 8)
  {
    if(stats.blockCounts[BLOCK_TYPE.LIFE] >= 10)
    {
      this.displayWin();
    }
  }
}
