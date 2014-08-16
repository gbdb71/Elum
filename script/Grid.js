function Grid()
{

  this.width = 50;
  this.height = 100;
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

Grid.prototype.eachBlock = function(callback)
{

  for(var x=0; x<this.grid.length; x++)
  {
    for(var y=0; y<this.grid[x].length; y++)
    {
      if(this.grid[x][y] == 1)
      {
        callback(x, y);
      }
    }
  }

}

Grid.prototype.draw = function(context)
{

  var tileSize = this.tileSize;

  this.eachBlock(function(x, y) {
    context.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
  });

}
