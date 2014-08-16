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

Grid.prototype.draw = function(context)
{

  // Draw the grid
  for(var x=0; x<this.grid.length; x++)
  {
    for(var y=0; y<this.grid[x].length; y++)
    {
      if(this.grid[x][y] == 1)
      {
        context.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
      }
    }
  }

}

var grid = new Grid();
grid.addBlock(3, 5);
grid.addBlock(8, 9);

var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

context.fillStyle = "#000000";

function update()
{

}

function draw()
{
  grid.draw(context);
}

draw();
