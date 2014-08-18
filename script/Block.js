var BLOCK_TYPE = {
  NONE: 0,
  WATER: 1,
  EARTH: 2,
  FIRE: 3,
  WIND: 4,
  VIRUS: 5
};

function Block(blockType, options) {

  this.type = blockType;
  this.tileSize = 50;

  switch(this.type)
  {
    case BLOCK_TYPE.FIRE:
      this.maxHealth = 500;
      break;

    case BLOCK_TYPE.WIND:
      this.maxHealth = 10;
      break;

    case BLOCK_TYPE.WATER:
      this.maxHealth = 70;
      break;

    default:
      this.maxHealth = 100;
      break;
  }

  if(typeof options != "undefined" && typeof options.spreadLife != "undefined")
  {
    this.spreadLife = options.spreadLife;
  }
  else
  {
    switch(this.type)
    {
      case BLOCK_TYPE.WIND:
        this.spreadLife = 2;
        break;

      case BLOCK_TYPE.WATER:
        this.spreadLife = 4;
        break;

      default:
        this.spreadLife = 0;
        break;
    }
  }

  this.health = this.maxHealth;

}

Block.prototype.draw = function(context, x, y) {

  var opacity = this.health/this.maxHealth;
  opacity = 1;

  switch(this.type)
  {
    case BLOCK_TYPE.FIRE:
      context.fillStyle = "rgba(214, 30, 30, " + opacity + ")";
      break;

    case BLOCK_TYPE.EARTH:
      context.fillStyle = "rgba(196, 107, 33, " + opacity + ")";
      break;

    case BLOCK_TYPE.WATER:
      context.fillStyle = "rgba(33, 104, 196, " + opacity + ")";
      break;

    case BLOCK_TYPE.WIND:
      context.fillStyle = "rgba(112, 208, 230, " + opacity + ")";
      break;

    case BLOCK_TYPE.VIRUS:
      context.fillStyle = "rgba(77, 168, 37, " + opacity + ")";
      break;

    default:
      context.fillStyle = "rgba(1, 1, 1, " + opacity + ")";
      break;
  }

  var radius = 8;
  var tileX = x * this.tileSize;
  var tileY = y * this.tileSize;

  // Draw tile shape
  drawRoundedSquare(context, tileX, tileY, radius, this.tileSize);

  if(this.type === BLOCK_TYPE.WATER)
  {
    context.fillStyle = "rgba(29, 87, 163, " + opacity + ")";
    drawRoundedSquare(context, tileX + 5, tileY + 5, radius, this.tileSize - 10);

    context.fillStyle = "rgba(33, 104, 196, " + opacity + ")";
    context.beginPath();
    context.arc(tileX + (this.tileSize/2), tileY + (this.tileSize/2), 10, 0, Math.PI * 2, true);
    context.fill();
  }

};

function drawRoundedSquare(context, x, y, radius, width) {

  // Credit: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Canvas_tutorial/Drawing_shapes
  context.beginPath();
  context.moveTo(x, y + radius);
  context.lineTo(x, y + width - radius);
  context.quadraticCurveTo(x, y + width, x + radius, y + width);
  context.lineTo(x + width - radius, y + width);
  context.quadraticCurveTo(x + width, y + width, x + width, y + width - radius);
  context.lineTo(x + width, y + radius);
  context.quadraticCurveTo(x + width, y, x + width - radius, y);
  context.lineTo(x + radius, y);
  context.quadraticCurveTo(x, y, x, y + radius);
  context.fill();

}
