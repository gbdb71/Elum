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

  context.beginPath();
  context.moveTo(tileX, tileY + radius);
  context.lineTo(tileX, tileY + this.tileSize - radius);
  context.quadraticCurveTo(tileX, tileY + this.tileSize, tileX + radius, tileY + this.tileSize);
  context.lineTo(tileX + this.tileSize - radius, tileY + this.tileSize);
  context.quadraticCurveTo(tileX + this.tileSize, tileY + this.tileSize, tileX + this.tileSize, tileY + this.tileSize - radius);
  context.lineTo(tileX + this.tileSize, tileY + radius);
  context.quadraticCurveTo(tileX + this.tileSize, tileY, tileX + this.tileSize - radius, tileY);
  context.lineTo(tileX + radius, tileY);
  context.quadraticCurveTo(tileX, tileY, tileX, tileY + radius);
  context.fill();

  //context.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);

};
