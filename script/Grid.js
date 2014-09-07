var NEIGHBOR_DIRECTION = {
  LEFT: 0,
  RIGHT: 1,
  TOP: 2,
  BOTTOM: 3
};

/**
 * A grid of blocks
 * @constructor
 * @param {Game}    game      - Current game
 * @param {integer} width     - Width of the grid (in blocks)
 * @param {integer} height    - Height of the grid (in blocks)
 * @param {integer} blockSize - Size of the blocks within the grid (in pixels)
 */
function Grid(game, width, height, blockSize)
{
  this.placeholderCoords = null;

  this.game = game;

  this.width = width;
  this.height = height;
  this.grid = [];
  this.blockSize = blockSize;

  // Initialize the grid
  for(var x=0; x<this.width; x++)
  {
    this.grid[x] = [];

    for(var y=0; y<this.height; y++)
    {
      this.grid[x][y] = null;
    }
  }

  this.placeholderRadius = Math.floor(0.16 * blockSize);

  // Initialize "global" statistics (the statistics that persist through
  // game updates)
  this.globalStats = {};
  this.globalStats.burnedVirusCount = 0;
  this.globalStats.erosionCount = 0;
  this.globalStats.windSpreadFireCount = 0;

}

/**
 * Places a block at the specified location within the grid
 * @param {integer} x     - X-coordinate (in blocks)
 * @param {integer} y     - Y-coordinate (in blocks)
 * @param {integer} block - Block to place
 */
Grid.prototype.placeBlock = function(x, y, block)
{
  this.grid[x][y] = block;
}

/**
 * Removes the block from the specified location in grid
 * @param {integer} x - X-coordinate (in blocks)
 * @param {integer} y - Y-coordinate (in blocks)
 */
Grid.prototype.removeBlock = function(x, y)
{
  this.grid[x][y] = null;
}

/**
 * Whether or not the specified location is a valid coordinate within the grid
 * @param {integer} x - X-coordinate (in blocks)
 * @param {integer} y - Y-coordinate (in blocks)
 */
Grid.prototype.isValidTile = function(x, y)
{
  return (x >= 0)
          && (x < this.width)
          && (y >= 0)
          && (y < this.height);
}

/**
 * Whether or not a block can be placed at the specified location
 * @param {integer} x - X-coordinate (in blocks)
 * @param {integer} y - Y-coordinate (in blocks)
 */
Grid.prototype.canPlaceBlock = function(x, y)
{
  return this.isValidTile(x, y) && (this.grid[x][y] === null);
}

/**
 * Returns the block at the specified location
 * @param {integer} x - X-coordinate (in blocks)
 * @param {integer} y - Y-coordinate (in blocks)
 */
Grid.prototype.getBlock = function(x, y)
{
  return (this.isValidTile(x, y)) ? this.grid[x][y] : null;
}

/**
 * Moves the location of the "placeholder block" (user's cursor)
 * @param {integer} x - X-coordinate (in blocks)
 * @param {integer} y - Y-coordinate (in blocks)
 */
Grid.prototype.movePlaceholder = function(x, y)
{
  if(this.isValidTile(x, y))
  {
    this.placeholderCoords = { x: x, y: y };
  }
}

/**
 * Removes the "placeholder block" (user's cursor)
 */
Grid.prototype.removePlaceholder = function()
{
  this.placeholderCoords = null;
}

/**
 * Iterates through all of the blocks neighboring a block at the specified
 * location and executes the provided callback function
 * @param {integer}   x         - X-coordinate (in blocks)
 * @param {integer}   y         - Y-coordinate (in blocks)
 * @param {function}  callback  - Function called for each neighbor block
 */
Grid.prototype.eachNeighborBlock = function(x, y, callback)
{
  // Construct an array of neighboring blocks
  var neighborBlocks = [];

  var bottomBlock = this.getBlock(x, y + 1);
  neighborBlocks.push({
    x: x, y: y + 1, block: bottomBlock,
    direction: NEIGHBOR_DIRECTION.BOTTOM
  });

  var topBlock = this.getBlock(x, y - 1);
  neighborBlocks.push({
    x: x, y: y - 1, block: topBlock,
    direction: NEIGHBOR_DIRECTION.TOP
  });

  var leftBlock = this.getBlock(x - 1, y);
  neighborBlocks.push({
    x: x - 1, y: y, block: leftBlock,
    direction: NEIGHBOR_DIRECTION.LEFT
  });

  var rightBlock = this.getBlock(x + 1, y);
  neighborBlocks.push({
    x: x + 1, y: y, block: rightBlock,
    direction: NEIGHBOR_DIRECTION.RIGHT
  });

  // Iterate through the neighbor blocks
  for(var i=0; i<4; i++)
  {
    if(neighborBlocks[i].block != null)
    {
      var currNeighborBlock = neighborBlocks[i];
      callback(
          currNeighborBlock.x,
          currNeighborBlock.y,
          currNeighborBlock.block,
          currNeighborBlock.direction);
    }
  }

}

/**
 * Iterates through all of the blocks in the grid and executes the provided=
 * callback function
 * @param {function}  callback  - Function called for each block
 */
Grid.prototype.eachBlock = function(callback)
{
  // Construct an array of blocks
  var blocks = [];

  for(var x=0; x<this.width; x++)
  {
    for(var y=0; y<this.height; y++)
    {
      if(this.grid[x][y] != null)
      {
        blocks.push({ x: x, y: y, block: this.grid[x][y] });
      }
    }
  }

  // Loop through a copied array of the current blocks to allow the
  // callback to modify the blocks without creating an infinite loop
  var blocksCount = blocks.length;

  for(var i=0; i<blocksCount; i++)
  {
    var currBlock = blocks[i];
    callback(currBlock.x, currBlock.y, currBlock.block);
  }

}

/**
 * Converts the provided pixel coordinates to grid coordinates (in blocks)
 * @param {integer} x - X-coordinate (in pixels)
 * @param {integer} y - Y-coordinate (in pixels)
 */
Grid.prototype.getGridCoordinates = function(x, y) {

  return {
      x: Math.floor(x/this.blockSize),
      y: Math.floor(y/this.blockSize)
  };

}

/**
 * Renders the grid
 * @param {CanvasRenderingContext2D}  context - 2D rendering context to use when rendering the block
 */
Grid.prototype.draw = function(context)
{
  var blockSize = this.blockSize;

  // Clear the grid
  context.fillStyle = SETTINGS.GridBackgroundColor;
  context.fillRect(0, 0, this.width * blockSize, this.height * blockSize);

  // Draw the placeholder
  if(this.placeholderCoords != null)
  {
    context.fillStyle = SETTINGS.PlaceholderColor;
    UTILITY.drawRoundedSquare(
        context,
        this.placeholderCoords.x * blockSize,
        this.placeholderCoords.y * blockSize,
        this.placeholderRadius, blockSize);
  }

  // Draw each tile
  this.eachBlock(function(x, y, block) {
    block.draw(context, x, y);
  });

}

/**
 * Updates the status of the grid
 */
Grid.prototype.update = function()
{
  var self = this;

  // Initialize stats
  var stats = {};
  stats.blockCounts = {};
  stats.blockCounts[BLOCK_TYPE.EARTH] = 0;
  stats.blockCounts[BLOCK_TYPE.FIRE] = 0;
  stats.blockCounts[BLOCK_TYPE.VIRUS] = 0;
  stats.blockCounts[BLOCK_TYPE.WATER] = 0;
  stats.blockCounts[BLOCK_TYPE.LIFE] = 0;

  this.eachBlock(function(x, y, block) {

    block.update();

    // If a block is dead, remove it
    if(block.isDead)
    {
      if(block.type === BLOCK_TYPE.EARTH)
      {
        // EARTH blocks can only be destroyed through erosion, so we can
        // safely increase the erosion statistic
        self.globalStats.erosionCount++;
      }

      self.removeBlock(x, y);
      return;
    }

    // If a block is dying, ignore it
    if(block.isDying)
    {
      return;
    }

    stats.blockCounts[block.type]++;

    // FIRE, WIND, and WATER blocks lose health with time
    if(block.type === BLOCK_TYPE.FIRE
          || block.type === BLOCK_TYPE.WIND
          || block.type === BLOCK_TYPE.WATER)
    {
      block.health--;
    }

    // Iterate through neighbor blocks and apply block interactions
    self.eachNeighborBlock(x, y, function(neighborX, neighborY, neighborBlock, direction) {

      // Ignore dying or dead neighbor blocks
      if(neighborBlock.isDead || neighborBlock.isDying)
      {
        return;
      }

      if(direction === NEIGHBOR_DIRECTION.BOTTOM)
      {
        // EARTH destroys WIND, FIRE, WATER, and LIFE beneath it
        if(block.type === BLOCK_TYPE.EARTH
            && (
                  neighborBlock.type === BLOCK_TYPE.WIND
                  || neighborBlock.type === BLOCK_TYPE.FIRE
                  || neighborBlock.type === BLOCK_TYPE.WATER
                  || neighborBlock.type === BLOCK_TYPE.LIFE
                )
          )
        {
          neighborBlock.kill();
          return;
        }

        // WATER consumes other WATER beneath it
        if(block.type === BLOCK_TYPE.WATER
              && neighborBlock.type === BLOCK_TYPE.WATER)
        {
          neighborBlock.kill();
          return;
        }
      }

      if(direction != NEIGHBOR_DIRECTION.TOP)
      {
        // WATER consumes any WIND that is not on top of it
        if(block.type === BLOCK_TYPE.WATER && neighborBlock.type === BLOCK_TYPE.WIND)
        {
          neighborBlock.kill();
          return;
        }
      }

      // WATER smothers any FIRE near it
      if(block.type === BLOCK_TYPE.WATER && neighborBlock.type === BLOCK_TYPE.FIRE)
      {
        neighborBlock.kill();
        return;
      }

      // WIND can spread FIRE
      if(block.type === BLOCK_TYPE.FIRE && neighborBlock.type === BLOCK_TYPE.WIND)
      {
        self.globalStats.windSpreadFireCount++;
        self.removeBlock(neighborX, neighborY);
        self.placeBlock(neighborX, neighborY, new Block(BLOCK_TYPE.FIRE, self.blockSize));
        return;
      }

      // WATER can spread VIRUS
      if(block.type === BLOCK_TYPE.VIRUS && neighborBlock.type === BLOCK_TYPE.WATER)
      {
        self.removeBlock(neighborX, neighborY);
        self.placeBlock(neighborX, neighborY, new Block(BLOCK_TYPE.VIRUS, self.blockSize));
        return;
      }

      // FIRE can burn viruses (and ends up killing itself in the process)
      if(block.type === BLOCK_TYPE.VIRUS && neighborBlock.type === BLOCK_TYPE.FIRE)
      {
        self.globalStats.burnedVirusCount++;
        block.kill();
        neighborBlock.kill();
        return;
      }

      // WATER erodes EARTH
      if(block.type === BLOCK_TYPE.EARTH && neighborBlock.type === BLOCK_TYPE.WATER)
      {
        block.health--;
        return;
      }

      // LIFE is killed by FIRE or WATER
      if(block.type === BLOCK_TYPE.LIFE
          && (neighborBlock.type === BLOCK_TYPE.FIRE || neighborBlock.type === BLOCK_TYPE.WATER))
      {
        block.kill();
        return;
      }

    });

    // If a block has depleted all of its health, kill it
    if(block.health <= 0)
    {
      block.kill();
    }

    // WIND spreads wherever its placed
    if(block.type === BLOCK_TYPE.WIND && block.spreadLife > 0)
    {
      var childSpreadLife = block.spreadLife - 1;

      // Spread up
      if(self.canPlaceBlock(x, y - 1))
      {
        self.placeBlock(x, y - 1, new Block(BLOCK_TYPE.WIND, self.blockSize, {spreadLife: childSpreadLife}));
      }

      // Spread down
      if(self.canPlaceBlock(x, y + 1))
      {
        self.placeBlock(x, y + 1, new Block(BLOCK_TYPE.WIND, self.blockSize, {spreadLife: childSpreadLife}));
      }

      // Spread right
      if(self.canPlaceBlock(x + 1, y))
      {
        self.placeBlock(x + 1, y, new Block(BLOCK_TYPE.WIND, self.blockSize, {spreadLife: childSpreadLife}));
      }

      // Spread left
      if(self.canPlaceBlock(x - 1, y))
      {
        self.placeBlock(x - 1, y, new Block(BLOCK_TYPE.WIND, self.blockSize, {spreadLife: childSpreadLife}));
      }

      block.spreadLife = 0;
    }
    else
    {
      // Gravity
      if(self.canPlaceBlock(x, y + 1))
      {
        self.removeBlock(x, y);
        self.placeBlock(x, y + 1, block);
      }
      else
      {

        // If a block is no longer falling, apply its spread behavior
        if(block.spreadLife > 0)
        {

          var childSpreadLife = block.spreadLife - 1;

          // WATER will spread if it can no longer fall due to gravity
          if(block.type === BLOCK_TYPE.WATER)
          {
            // Spread right
            if(self.canPlaceBlock(x + 1, y))
            {
              self.placeBlock(x + 1, y, new Block(BLOCK_TYPE.WATER, self.blockSize, { spreadLife: childSpreadLife }));
            }

            // Spread left
            if(self.canPlaceBlock(x - 1, y))
            {
              self.placeBlock(x - 1, y, new Block(BLOCK_TYPE.WATER, self.blockSize, { spreadLife: childSpreadLife }));
            }
          }

          block.spreadLife = 0;

        }

      }
    }

  });

  // Update the "special" stats by copying the global stats
  stats.burnedVirusCount = this.globalStats.burnedVirusCount;
  stats.erosionCount = this.globalStats.erosionCount;
  stats.windSpreadFireCount = this.globalStats.windSpreadFireCount;
  return stats;

}
