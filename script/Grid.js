function Grid()
{

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

Grid.prototype.canPlaceBlock = function(x, y)
{

  return (x >= 0)
          && (x < this.width)
          && (y >= 0)
          && (y < this.height)
          && (this.grid[x][y] === null);

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

    var opacity = (block.health == Infinity)
      ? 1
      : (block.health/block.maxHealth)

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

    // Natural deterioration
    if(block.type === BLOCK_TYPE.FIRE
        || block.type === BLOCK_TYPE.WIND)
    {
      block.health--;

      if(block.health <= 0) {
        self.removeBlock(x, y);
        return;
      }
    }

    // Gravity
    if(self.canPlaceBlock(x, y + 1))
    {
      self.removeBlock(x, y);
      self.placeBlock(x, y + 1, block);
    }

  });

}
