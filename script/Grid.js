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
      this.grid[x][y] = 0;
    }
  }

}

Grid.prototype.addBlock = function(x, y)
{

  this.grid[x][y] = 1;

}

Grid.prototype.removeBlock = function(x, y)
{

  this.grid[x][y] = 0;

}

Grid.prototype.eachBlock = function(callback)
{
  var blocks = [];

  for(var x=0; x<this.width; x++)
  {
    for(var y=0; y<this.height; y++)
    {
      if(this.grid[x][y] == 1)
      {
        blocks.push({ x: x, y: y });
      }
    }
  }

  // Loop through a copied array of the current blocks to allow the
  // callback to modify the blocks without creating an infinite loop
  var blocksCount = blocks.length;

  for(var i=0; i<blocksCount; i++)
  {
    var currBlock = blocks[i];
    callback(currBlock.x, currBlock.y);
  }

}

Grid.prototype.draw = function(context)
{
  var tileSize = this.tileSize;

  // Clear the grid
  context.fillStyle = "#FFFFFF";
  context.fillRect(0, 0, this.width * tileSize, this.height * tileSize);

  // Draw each tile
  context.fillStyle = "#000000";
  this.eachBlock(function(x, y) {
    context.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
  });

}

Grid.prototype.update = function()
{

  var self = this;

  this.eachBlock(function(x, y) {

    // Move block
    self.removeBlock(x, y);
    self.addBlock(x, y + 1);

  });

}
