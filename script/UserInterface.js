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
  this.uiInnerLeftMargin = this.uiLeftMargin + Math.floor(this.uiWidth/2);
  this.uiTopMargin = this.uiY + Math.floor(0.14 * this.uiHeight);

  this.tileSelectionY = this.uiTopMargin + Math.floor(0.06 * this.uiHeight);
  this.tileSelectionTextY = this.tileSelectionY + Math.floor(0.8 * this.tileSelectionHeight);
  this.tileSelectionHighlightWidth = Math.floor(0.05 * this.uiWidth);

  this.toxicityTextY = Math.floor(0.38 * this.uiHeight);
  this.waterTextY = Math.floor(0.42 * this.uiHeight);

  this.goalHeaderTextY = Math.floor(0.84 * this.uiHeight);
  this.goalTextY = Math.floor(0.89 * this.uiHeight);
};

/**
 * Renders the user interface
 * @param {CanvasRenderingContext2D}  context - 2D rendering context to use when rendering the block
 */
UserInterface.prototype.draw = function(context) {

  // Draw background
  context.fillStyle = SETTINGS.UiBackgroundColor;
  context.fillRect(this.uiX, this.uiY, this.uiWidth, this.uiHeight);

  // Draw game title
  context.fillStyle = SETTINGS.UiTextColor;
  context.font = SETTINGS.UiTitleFontStyle;
  context.fillText("elum", this.uiLeftMargin, this.uiTopMargin);

  var tileName;

  // Draw tile preview
  switch(this.nextBlockType)
  {
    case BLOCK_TYPE.FIRE:
      tileName = "fire";
      break;

    case BLOCK_TYPE.EARTH:
      tileName = "earth";
      break;

    case BLOCK_TYPE.WATER:
      tileName = "water";
      break;

    case BLOCK_TYPE.WIND:
      tileName = "wind";
      break;
  }

  // Draw base tile preview
  context.fillStyle
    = UTILITY.getRgbaFillStyle(SETTINGS.BlockBaseColor[this.nextBlockType], 1);
  context.fillRect(this.uiX, this.tileSelectionY, this.uiWidth, this.tileSelectionHeight);

  // Draw tile preview highlight
  context.fillStyle = "rgba(255, 255, 255, 0.1)";
  context.fillRect(
    this.uiX, this.tileSelectionY,
    this.tileSelectionHighlightWidth, this.tileSelectionHeight);

  // Tile preview text
  context.fillStyle = SETTINGS.UiTextColor;
  context.font = SETTINGS.UiFontStyle;
  context.fillText(tileName, this.uiLeftMargin, this.tileSelectionTextY);

  // Current levels
  context.fillText("toxicity", this.uiLeftMargin, this.toxicityTextY);
  context.fillText(this.game.currentToxicity + "%", this.uiInnerLeftMargin, this.toxicityTextY);

  context.fillText("water", this.uiLeftMargin, this.waterTextY);
  context.fillText(this.game.currentWaterLevel + "%", this.uiInnerLeftMargin, this.waterTextY);

  // Goal
  context.fillText("goal", this.uiLeftMargin, this.goalHeaderTextY);
  context.fillText(this.game.currentGoal, this.uiLeftMargin, this.goalTextY);

};
