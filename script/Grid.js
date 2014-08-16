function Grid()
{

  this.width = 50;
  this.height = 25;
  this.tileSize = 20;
  this.grid = [];

  for(var x=0; x<this.width; x++)
  {
    this.grid[x] = [];

    for(var y=0; y<this.height; y++)
    {
      this.grid[x][y] = BLOCK_TYPE.EMPTY;
    }
  }

}

Grid.prototype.addBlock = function(x, y, blockType)
{

  this.grid[x][y] = blockType;

}

Grid.prototype.removeBlock = function(x, y)
{

  this.grid[x][y] = BLOCK_TYPE.EMPTY;

}

Grid.prototype.canAddBlock = function(x, y)
{

  return (x >= 0)
          && (x < this.width)
          && (y >= 0)
          && (y < this.height)
          && (this.grid[x][y] === BLOCK_TYPE.EMPTY);

}

Grid.prototype.eachBlock = function(callback)
{
  var blocks = [];

  for(var x=0; x<this.width; x++)
  {
    for(var y=0; y<this.height; y++)
    {
      if(this.grid[x][y] != BLOCK_TYPE.EMPTY)
      {
        blocks.push({ x: x, y: y, blockType: this.grid[x][y] });
      }
    }
  }

  // Loop through a copied array of the current blocks to allow the
  // callback to modify the blocks without creating an infinite loop
  var blocksCount = blocks.length;

  for(var i=0; i<blocksCount; i++)
  {
    var currBlock = blocks[i];
    callback(currBlock.x, currBlock.y, currBlock.blockType);
  }

}

Grid.prototype.draw = function(context)
{
  var tileSize = this.tileSize;

  // Clear the grid
  context.fillStyle = "#FFFFFF";
  context.fillRect(0, 0, this.width * tileSize, this.height * tileSize);

  // Draw each tile
  this.eachBlock(function(x, y, blockType) {

    switch(blockType)
    {
      case BLOCK_TYPE.FIRE:
        context.fillStyle = "#D61E1E";
        break;

      case BLOCK_TYPE.EARTH:
        context.fillStyle = "#C46B21";
        break;

      case BLOCK_TYPE.WATER:
        context.fillStyle = "#2168C4";
        break;

      case BLOCK_TYPE.WIND:
        context.fillStyle = "#70D0E6";
        break;

      default:
        context.fillStyle = "#000000";
    }

    context.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
  });

}

Grid.prototype.update = function()
{

  var self = this;

  this.eachBlock(function(x, y, blockType) {

    var newX = x;
    var newY = y + 1;

    // Move block
    if(self.canAddBlock(newX, newY))
    {
      self.removeBlock(x, y);
      self.addBlock(newX, newY, blockType);
    }

  });

}
