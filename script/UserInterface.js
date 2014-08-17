function UserInterface(game) {

  this.game = game;

  this.uiX = 1000;
  this.uiWidth = 200;

  this.tileSelectionHeight = 50;

  this.earthTileSelectionTopY = 100;
  this.earthTileSelectionBottomY = this.earthTileSelectionTopY + this.tileSelectionHeight;

  this.waterTileSelectionTopY = 150;
  this.waterTileSelectionBottomY = this.waterTileSelectionTopY + this.tileSelectionHeight;

  this.fireTileSelectionTopY = 200;
  this.fireTileSelectionBottomY = this.fireTileSelectionTopY + this.tileSelectionHeight;

  this.windTileSelectionTopY = 250;
  this.windTileSelectionBottomY = this.windTileSelectionTopY + this.tileSelectionHeight;

};

UserInterface.prototype.handleClick = function(x, y) {

  // EARTH Tile Selection?
  if(y > this.earthTileSelectionTopY && y < this.earthTileSelectionBottomY) {
    this.game.handleSelectBlockType(BLOCK_TYPE.EARTH);
  }

  // WATER Tile Selection?
  if(y > this.waterTileSelectionTopY && y < this.waterTileSelectionBottomY) {
    this.game.handleSelectBlockType(BLOCK_TYPE.WATER);
  }

  // FIRE Tile Selection?
  if(y > this.fireTileSelectionTopY && y < this.fireTileSelectionBottomY) {
    this.game.handleSelectBlockType(BLOCK_TYPE.FIRE);
  }

  // WIND Tile Selection?
  if(y > this.windTileSelectionTopY && y < this.windTileSelectionBottomY) {
    this.game.handleSelectBlockType(BLOCK_TYPE.WIND);
  }

};

UserInterface.prototype.draw = function(context) {

  // Draw background
  context.fillStyle = "#111";
  context.fillRect(1000, 0, 200, 500);

  // Draw game title
  context.fillStyle = "#FFF";
  context.font = "40px Arial, sans-serif";
  context.fillText("elum", 1020, 70);

  // Draw EARTH tile selection
  context.fillStyle = "rgba(196, 107, 33, 1)";
  context.fillRect(this.uiX, this.earthTileSelectionTopY, this.uiWidth, this.tileSelectionHeight);

  context.fillStyle = "rgba(255, 255, 255, 0.1)";
  context.fillRect(this.uiX, this.earthTileSelectionTopY, 10, this.tileSelectionHeight);

  context.fillStyle = "#FFF";
  context.font = "18px Arial, sans-serif";
  context.fillText(this.game.tileCounts[BLOCK_TYPE.EARTH], 1180, 140);

  // Draw WATER tile selection
  context.fillStyle = "rgba(33, 104, 196, 1)";
  context.fillRect(1000, this.waterTileSelectionTopY, 200, 50);

  context.fillStyle = "rgba(255, 255, 255, 0.1)";
  context.fillRect(1000, this.waterTileSelectionTopY, 10, 50);

  context.fillStyle = "#FFF";
  context.font = "18px Arial, sans-serif";
  context.fillText(this.game.tileCounts[BLOCK_TYPE.WATER], 1180, 190);

  // Draw FIRE tile selection
  context.fillStyle = "rgba(214, 30, 30, 1)";
  context.fillRect(1000, this.fireTileSelectionTopY, 200, 50);

  context.fillStyle = "rgba(255, 255, 255, 0.1)";
  context.fillRect(1000, this.fireTileSelectionTopY, 10, 50);

  context.fillStyle = "#FFF";
  context.font = "18px Arial, sans-serif";
  context.fillText(this.game.tileCounts[BLOCK_TYPE.FIRE], 1180, 240);

  // Draw WIND tile selection
  context.fillStyle = "rgba(112, 208, 230, 1)";
  context.fillRect(1000, this.windTileSelectionTopY, 200, 50);

  context.fillStyle = "rgba(255, 255, 255, 0.1)";
  context.fillRect(1000, this.windTileSelectionTopY, 10, 50);

  context.fillStyle = "#FFF";
  context.font = "18px Arial, sans-serif";
  context.fillText(this.game.tileCounts[BLOCK_TYPE.WIND], 1180, 290);

};
