// Initialize the grid
var width = 50;
var height = 100;
var tileSize = 20;

var grid = [];

for(var x=0; x<width; x++)
{
  grid[x] = [];

  for(var y=0; y<height; y++)
  {
    grid[x][y] = 0;
  }
}

grid[3][5] = 1;
grid[8][9] = 1;

// Get the canvas
var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

context.fillStyle = "#000000";

// Draw the grid
for(var x=0; x<grid.length; x++)
{
  for(var y=0; y<grid[x].length; y++)
  {
    if(grid[x][y] == 1)
    {
      context.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
    }
  }
}
