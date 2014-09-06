var BLOCK_TYPE = {
  NONE: 0,
  WATER: 1,
  EARTH: 2,
  FIRE: 3,
  WIND: 4,
  VIRUS: 5,
  LIFE: 6
};

/**
 * A block within a grid
 * @constructor
 * @param {BLOCK_TYPE}  blockType - Type of block
 * @param {int}         blockSize - Size of the block (in pixels)
 * @param {object}      options   - Block options (options: "spreadLife")
 */
function Block(blockType, blockSize, options) {

  this.type = blockType;
  this.tileSize = tileSize;

  this.isDying = false;
  this.isDead = false;
  this.deathTimer = SETTINGS.BlockDeathTimer;

  this.health = this.maxHealth = SETTINGS.BlockHealth[blockType];
  this.spreadLife = SETTINGS.BlockSpreadLife[blockType];

  // Override defaults with options
  if(typeof options != "undefined" && typeof options.spreadLife != "undefined")
  {
    this.spreadLife = options.spreadLife;
  }

}

/**
 * Puts a block into a "dying" state
 */
Block.prototype.kill = function() {
  this.isDying = true;
}

/**
 * Updates the state of the block
 */
Block.prototype.update = function() {

  if(this.isDying)
  {
    this.deathTimer--;

    if(this.deathTimer <= 0)
    {
      this.isDead = true;
    }
  }

}

Block.prototype.draw = function(context, x, y) {

  var opacity = 1;
  var healthPercentage = Math.floor((this.health/this.maxHealth) * 100);

  if(this.type === BLOCK_TYPE.EARTH)
  {
    if(healthPercentage%2 == 0)
    {
      opacity = 0.9;
    }
  }
  else if(healthPercentage < 50 && healthPercentage%2 == 0)
  {
    opacity = 0.9;
  }

  if(this.isDying && this.deathClock%2 == 0)
  {
    opacity = 0.1;
  }

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
  var tileMiddleX = tileX + (this.tileSize/2);

  // Draw tile shape
  drawRoundedSquare(context, tileX, tileY, radius, this.tileSize);

  if(this.type === BLOCK_TYPE.WATER)
  {
    context.fillStyle = "rgba(29, 87, 163, " + opacity + ")";
    drawRoundedSquare(context, tileX + 5, tileY + 5, radius, this.tileSize - 10);

    context.fillStyle = "rgba(33, 104, 196, " + opacity + ")";
    context.beginPath();
    context.arc(tileMiddleX, tileY + (this.tileSize/2), 10, 0, Math.PI * 2, true);
    context.fill();
  }

  if(this.type === BLOCK_TYPE.FIRE)
  {
    context.fillStyle = "rgba(184, 26, 26, " + opacity + ")";
    drawRoundedSquare(context, tileX + 5, tileY + 5, radius, this.tileSize - 10);

    context.fillStyle = "rgba(214, 30, 30, " + opacity + ")";
    context.beginPath();
    context.moveTo(tileMiddleX, tileY + 15);
    context.lineTo(tileX + 15, tileY + this.tileSize - 15);
    context.lineTo(tileX + this.tileSize - 15, tileY + this.tileSize - 15);
    context.fill();
  }

  if(this.type === BLOCK_TYPE.EARTH)
  {
    context.fillStyle = "rgba(168, 93, 30, " + opacity + ")";
    drawRoundedSquare(context, tileX + 5, tileY + 5, radius, this.tileSize - 10);

    context.fillStyle = "rgba(196, 107, 33, " + opacity + ")";
    drawRoundedSquare(context, tileX + 15, tileY + 15, 4, this.tileSize - 30);
  }

  if(this.type === BLOCK_TYPE.WIND)
  {
    context.fillStyle = "rgba(123, 216, 237, " + opacity + ")";
    drawRoundedSquare(context, tileX + 5, tileY + 5, radius, this.tileSize - 10);

    context.fillStyle = "rgba(112, 208, 230, " + opacity + ")";
    context.fillRect(tileX + 10, tileY + 13, 30, 5);
    context.fillRect(tileX + 10, tileY + 23, 30, 5);
    context.fillRect(tileX + 10, tileY + 33, 30, 5);
  }

  if(this.type === BLOCK_TYPE.VIRUS)
  {
    context.fillStyle = "rgba(64, 138, 32, " + opacity + ")";
    drawRoundedSquare(context, tileX + 5, tileY + 5, radius, this.tileSize - 10);

    context.fillStyle = "rgba(72, 156, 36, " + opacity + ")";

    context.save();
    context.translate(tileX + 15, tileY + 10);
    context.rotate(Math.PI/4);
    context.fillRect(0, 0, 35, 8);
    context.restore();

    context.save();
    context.translate(tileX + 10, tileY + this.tileSize - 15);
    context.rotate(-Math.PI/4);
    context.fillRect(0, 0, 35, 8);
    context.restore();
  }

};

function drawRoundedSquare(context, x, y, borderRadius, width) {

  // Credit: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Canvas_tutorial/Drawing_shapes
  context.beginPath();
  context.moveTo(x, y + borderRadius);
  context.lineTo(x, y + width - borderRadius);
  context.quadraticCurveTo(x, y + width, x + borderRadius, y + width);
  context.lineTo(x + width - borderRadius, y + width);
  context.quadraticCurveTo(x + width, y + width, x + width, y + width - borderRadius);
  context.lineTo(x + width, y + borderRadius);
  context.quadraticCurveTo(x + width, y, x + width - borderRadius, y);
  context.lineTo(x + borderRadius, y);
  context.quadraticCurveTo(x, y, x, y + borderRadius);
  context.fill();

}
