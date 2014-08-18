function UserInterface(game) {

  this.game = game;

  this.uiX = 1000;
  this.uiWidth = 200;

  this.tileSelectionHeight = 50;

  this.nextBlockType;

};

UserInterface.prototype.handleClick = function(x, y) {
};

UserInterface.prototype.draw = function(context) {

  // Draw background
  context.fillStyle = "#111";
  context.fillRect(1000, 0, 200, 500);

  // Draw game title
  context.fillStyle = "#FFF";
  context.font = "40px Arial, sans-serif";
  context.fillText("elum", 1020, 70);

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
  context.fillText("next: " + tileName, 1020, 140);

};
