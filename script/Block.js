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
 * @param {integer}     blockSize - Size of the block (in pixels)
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

  // Drawing calculations
  this.blockRadius = Math.floor(0.16 * tileSize);
  this.innerBlockWidth = tileSize - Math.floor(0.1 * tileSize);
  this.innerBlockOffset = Math.floor(innerBlockWidth/2);

  this.waterEmblemRadius = Math.floor(0.2 * tileSize);
  this.waterEmblemEndAngle = Math.PI * 2;

  this.fireEmblemOffset = Math.floor(0.3 * tileSize);

  this.earthEmblemRadius = Math.floor(this.blockRadius/2);
  this.earthEmblemWidth = tileSize - Math.floor(0.6 * tileSize);
  this.earthEmblemOffset = Math.floor(earthEmblemWidth/2);

  this.windEmblemWidth = Math.floor(0.6 * tileSize);
  this.windEmblemHeight = Math.floor(0.1 * tileSize);
  this.windEmblemYOffset = Math.floor(0.26 * tileSize);
  this.windEmblemXOffset = Math.floor(0.2 * tileSize);
  this.windEmblemSpace = Math.floor(0.1 * tileSize);

  this.virusEmblemBarWidth = Math.floor(0.7 * tileSize);
  this.virusEmblemBarHeight = Math.floor(0.16 * tileSize);
  this.virusEmblemBarRotation = Math.PI/4;
  this.virusEmblemXOffset = Math.floor(0.3 * tileSize);
  this.virusEmblemYOffset = Math.floor(0.2 * tileSize);
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

/**
 * Renders the block
 * @param {CanvasRenderingContext2D}  context - 2D rendering context to use when rendering the block
 * @param {integer}                   x       - X-coordinate of the block (in tile position)
 * @param {integer}                   y       - Y-coordinate of the block (in tile position)
 */
Block.prototype.draw = function(context, x, y) {

  var opacity = 1;
  var healthPercentage = Math.floor((this.health/this.maxHealth) * 100);

  // "Flash" the block to show that it is deteriorating
  // NOTE: EARTH blocks always flash
  if((this.type === BLOCK_TYPE.EARTH || healthPercentage < 50)
      && healthPercentage%2 == 0)
  {
    opacity = 0.9;
  }

  // "Flash" the block with a sharper contrast when it is dying
  if(this.isDying && this.deathClock%2 == 0)
  {
    opacity = 0.1;
  }

  var tileX = x * this.tileSize;
  var tileY = y * this.tileSize;
  var halfTileSize = (this.tileSize/2);
  var tileMiddleX = tileX + halfTileSize;
  var tileMiddleY = tileY + halfTileSize;

  // Draw outer tile
  context.fillStyle
    = UTILITY.getRgbaFillStyle(SETTINGS.BlockBaseColor[blockType], opacity);

  UTILITY.drawRoundedSquare(
    context,
    tileX,
    tileY,
    this.blockRadius,
    this.tileSize);

  // Draw inner tile
  context.fillStyle
    = UTILITY.getRgbaFillStyle(SETTINGS.BlockInnerColor[blockType], opacity);

  UTILITY.drawRoundedSquare(
    context,
    tileX + this.innerBlockOffset,
    tileY + this.innerBlockOffset,
    this.blockRadius,
    this.innerBlockWidth);

  // Draw block emblem
  context.fillStyle
    = UTILITY.getRgbaFillStyle(SETTINGS.BlockBaseColor[blockType], opacity);

  if(this.type === BLOCK_TYPE.WATER)
  {
    // WATER: Circle
    context.beginPath();

    context.arc(
      tileMiddleX, tileMiddleY,
      this.waterEmblemRadius,
      0, this.waterEmblemEndAngle, true);

    context.fill();
    return;
  }

  if(this.type === BLOCK_TYPE.FIRE)
  {
    // FIRE: Triangle
    context.beginPath();
    context.moveTo(tileMiddleX, tileY + this.fireEmblemOffset);

    context.lineTo(
      tileX + this.fireEmblemOffset,
      tileY + this.tileSize - this.fireEmblemOffset);

    context.lineTo(
      tileX + this.tileSize - this.fireEmblemOffset,
      tileY + this.tileSize - this.fireEmblemOffset);

    context.fill();
    return;
  }

  if(this.type === BLOCK_TYPE.EARTH)
  {
    // EARTH: Square
    UTILTITY.drawRoundedSquare(
      context,
      tileX + this.earthEmbledOffset, tileY + this.earthEmblemOffset,
      this.earthEmblemRadius,
      this.earthEmblemWidth);

    return;
  }

  if(this.type === BLOCK_TYPE.WIND)
  {
    // WIND: Three Lines
    var windEmblemX = tileX + this.windEmblemXOffset;
    var windEmblemY = tileY + this.windEmblemYOffset;

    for(var i=0; i<3; i++)
    {
      context.fillRect(
        windEmblemX,
        windEmblemY + (i * this.windEmblemSpace),
        this.windEmblemWidth,
        this.windEmblemHeight);
    }

    return;
  }

  if(this.type === BLOCK_TYPE.VIRUS)
  {
    // VIRUS: "X" Shape

    context.save();
    context.translate(
      tileX + this.virusEmblemXOffset,
      tileY + this.virusEmblemYOffset);
    context.rotate(this.virusEmbledBarRotation);
    context.fillRect(0, 0, this.virusEmblemBarWidth, this.virusEmblemBarHeight);
    context.restore();

    context.save();
    context.translate(
      tileX + this.virusEmblemYOffset,
      tileY + this.tileSize - this.virusEmblemXOffset);
    context.rotate(-this.virusEmbledBarRotation);
    context.fillRect(0, 0, this.virusEmblemBarWidth, this.virusEmblemBarHeight);
    context.restore();

    return;
  }

};
