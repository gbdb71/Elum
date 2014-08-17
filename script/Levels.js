var LEVELS = [];

// Level 1
LEVELS[0] = function(grid) {

  grid.placeBlock(9, 9, new Block(BLOCK_TYPE.VIRUS));

};

// Level 2
LEVELS[1] = function(grid) {

  grid.placeBlock(7, 9, new Block(BLOCK_TYPE.FIRE));
  grid.placeBlock(11, 9, new Block(BLOCK_TYPE.VIRUS));

};
