/**
 * The user interface that displays information about the current game status
 * @constructor
 * @param {Game}  game  - Current game
 */
function UserInterface(game, x, y, width, height) {

  this.game = game;

  this.uiX = x;
  this.uiY = y;
  this.uiWidth = width;
  this.uiHeight = height;

  this.tileSelectionHeight = Math.floor(0.1 * this.uiHeight);

  this.nextBlockType = null;

  this.uiLeftMargin = this.uiX + Math.floor(0.1 * this.uiWidth);
  this.uiTopMargin = this.uiY + Math.floor(0.14 * this.uiHeight);

};

UserInterface.prototype.draw = function(context) {

  // Draw background
  context.fillStyle = SETTINGS.UiBackgroundColor;
  context.fillRect(this.uiX, this.uiY, this.uiWidth, this.uiHeight);

  // Draw game title
  context.fillStyle = SETTINGS.UiTextColor;
  context.font = SETTINGS.UiFontStyle;
  context.fillText("elum", this.uiLeftMargin, this.uiTopMargin);

  var tileName;

  // Draw tile preview
  switch(this.nextBlockType)
  {
    case BLOCK_TYPE.FIRE:
      context.fillStyle = "rgba(214, 30, 30, 1)";
      tileName = "fire";
      break;

    case BLOCK_TYPE.EARTH:
      context.fillStyle = "rgba(196, 107, 33, 1)";
      tileName = "earth";
      break;

    case BLOCK_TYPE.WATER:
      context.fillStyle = "rgba(33, 104, 196, 1)";
      tileName = "water";
      break;

    case BLOCK_TYPE.WIND:
      context.fillStyle = "rgba(112, 208, 230, 1)";
      tileName = "wind";
      break;
  }

  context.fillRect(this.uiX, 100, this.uiWidth, this.tileSelectionHeight);

  context.fillStyle = "rgba(255, 255, 255, 0.1)";
  context.fillRect(this.uiX, 100, 10, this.tileSelectionHeight);

  context.fillStyle = "#FFF";
  context.font = "16px Arial, sans-serif";
  context.fillText(tileName, this.uiLeftMargin, 140);

  context.fillText("toxicity", this.uiLeftMargin, 190);
  context.fillText("water", this.uiLeftMargin, 210);

  context.fillText("goal", this.uiLeftMargin, 420);
  context.fillText(this.game.currentGoal, this.uiLeftMargin, 440);

  context.fillText(this.game.currentToxicity + "%", 1100, 190);
  context.fillText(this.game.currentWaterLevel + "%", 1100, 210);



};
