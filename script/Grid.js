var NEIGHBOR_DIRECTION = {
  LEFT: 0,
  RIGHT: 1,
  TOP: 2,
  BOTTOM: 3
};

function Grid(game)
{
  this.game = game;

  this.width = 20;
  this.height = 10;
  this.tileSize = 50;
  this.grid = [];

  for(var x=0; x<this.width; x++)
  {
    this.grid[x] = [];

    for(var y=0; y<this.height; y++)
    {
      this.grid[x][y] = null;
    }
  }

}

Grid.prototype.placeBlock = function(x, y, block)
{

  this.grid[x][y] = block;

}

Grid.prototype.removeBlock = function(x, y)
{

  this.grid[x][y] = null;

}

Grid.prototype.isValidTile = function(x, y)
{

  return (x >= 0)
          && (x < this.width)
          && (y >= 0)
          && (y < this.height);

}

Grid.prototype.canPlaceBlock = function(x, y)
{

  return this.isValidTile(x, y) && (this.grid[x][y] === null);

}

Grid.prototype.getBlock = function(x, y)
{

  return (this.isValidTile(x, y)) ? this.grid[x][y] : null;

}

Grid.prototype.eachNeighborBlock = function(x, y, callback)
{

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

  for(var i=0; i<4; i++) {
    if(neighborBlocks[i].block != null) {
      var currNeighborBlock = neighborBlocks[i];
      callback(
          currNeighborBlock.x,
          currNeighborBlock.y,
          currNeighborBlock.block,
          currNeighborBlock.direction);
    }
  }

}

Grid.prototype.eachBlock = function(callback)
{
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

Grid.prototype.getGridCoordinates = function(x, y) {

  return {
      x: Math.floor(x/this.tileSize),
      y: Math.floor(y/this.tileSize)
  };

}

Grid.prototype.draw = function(context)
{
  var tileSize = this.tileSize;

  // Clear the grid
  context.fillStyle = "#FFFFFF";
  context.fillRect(0, 0, this.width * tileSize, this.height * tileSize);

  // Draw each tile
  this.eachBlock(function(x, y, block) {

    var opacity = block.health/block.maxHealth;

    switch(block.type)
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

    context.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
  });

}

Grid.prototype.update = function()
{
  var self = this;

  this.eachBlock(function(x, y, block) {

    if(block.type === BLOCK_TYPE.FIRE || block.type === BLOCK_TYPE.WIND || block.type === BLOCK_TYPE.WATER)
    {
      block.health--;
    }

    self.eachNeighborBlock(x, y, function(neighborX, neighborY, neighborBlock, direction) {

      if(direction === NEIGHBOR_DIRECTION.BOTTOM)
      {
        // EARTH smothers FIRE and crushes WIND beneath it
        if(block.type === BLOCK_TYPE.EARTH
            && (
                  neighborBlock.type === BLOCK_TYPE.WIND
                  || neighborBlock.type === BLOCK_TYPE.FIRE
                  || neighborBlock.type === BLOCK_TYPE.WATER
                )
          )
        {
          self.removeBlock(x, y + 1);
          return;
        }
      }

      if(direction === NEIGHBOR_DIRECTION.BOTTOM)
      {
        // WATER consumes other WATER
        if(block.type === BLOCK_TYPE.WATER && neighborBlock.type === BLOCK_TYPE.WATER)
        {
          self.removeBlock(neighborX, neighborY);
          return;
        }
      }

      if(direction != NEIGHBOR_DIRECTION.TOP)
      {
        // WATER consumes any WIND that is not on top of it
        if(block.type === BLOCK_TYPE.WATER && neighborBlock.type === BLOCK_TYPE.WIND)
        {
          self.removeBlock(x, y);
          return;
        }
      }

      // WATER smothers any FIRE near it
      if(block.type === BLOCK_TYPE.WATER && neighborBlock.type === BLOCK_TYPE.FIRE)
      {
        self.removeBlock(neighborX, neighborY);
        return;
      }

      // WIND can spread FIRE
      if(block.type === BLOCK_TYPE.FIRE && neighborBlock.type === BLOCK_TYPE.WIND)
      {
        self.removeBlock(neighborX, neighborY);
        self.placeBlock(neighborX, neighborY, new Block(BLOCK_TYPE.FIRE));
        return;
      }

      // FIRE can kill viruses
      if(block.type === BLOCK_TYPE.VIRUS && neighborBlock.type === BLOCK_TYPE.FIRE)
      {
        self.removeBlock(x, y);
        return;
      }

      // WATER erodes EARTH
      if(block.type === BLOCK_TYPE.EARTH && neighborBlock.type === BLOCK_TYPE.WATER)
      {
        block.health--;
        return;
      }

    });

    if(block.health <= 0)
    {
      self.removeBlock(x, y);
    }

    if(block.type === BLOCK_TYPE.WIND)
    {
      if(block.spreadLife > 0)
      {
        var childSpreadLife = block.spreadLife - 1;

        // Spread up
        if(self.canPlaceBlock(x, y - 1))
        {
          self.placeBlock(x, y - 1, new Block(BLOCK_TYPE.WIND, {spreadLife: childSpreadLife}));
        }

        // Spread down
        if(self.canPlaceBlock(x, y + 1))
        {
          self.placeBlock(x, y + 1, new Block(BLOCK_TYPE.WIND, {spreadLife: childSpreadLife}));
        }

        // Spread right
        if(self.canPlaceBlock(x + 1, y))
        {
          self.placeBlock(x + 1, y, new Block(BLOCK_TYPE.WIND, {spreadLife: childSpreadLife}));
        }

        // Spread left
        if(self.canPlaceBlock(x - 1, y))
        {
          self.placeBlock(x - 1, y, new Block(BLOCK_TYPE.WIND, {spreadLife: childSpreadLife}));
        }

        block.spreadLife = 0;
      }
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

        if(block.spreadLife > 0)
        {

          var childSpreadLife = block.spreadLife - 1;

          // WATER will spread if it can no longer fall due to gravity
          if(block.type === BLOCK_TYPE.WATER)
          {
            // Spread right
            if(self.canPlaceBlock(x + 1, y))
            {
              self.placeBlock(x + 1, y, new Block(BLOCK_TYPE.WATER, { spreadLife: childSpreadLife }));
            }

            // Spread left
            if(self.canPlaceBlock(x - 1, y))
            {
              self.placeBlock(x - 1, y, new Block(BLOCK_TYPE.WATER, { spreadLife: childSpreadLife }));
            }
          }

          block.spreadLife = 0;

        }

      }
    }

  });

}
