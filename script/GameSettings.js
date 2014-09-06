var SETTINGS = {

  // Health of individual blocks
  BlockHealth: [],

  // How long (in game ticks) the block death animation should last
  BlockDeathTimer: 5,

  // Default "spread" of a block (how many blocks a block can create by
  // multiplying itself)
  BlockSpreadLife: []

};

SETTINGS.BlockHealth[BLOCK_TYPE.FIRE] = 100;
SETTINGS.BlockHealth[BLOCK_TYPE.WIND] = 10;
SETTINGS.BlockHealth[BLOCK_TYPE.WATER] = 200;
SETTINGS.BlockHealth[BLOCK_TYPE.EARTH] = 100;
SETTINGS.BlockHealth[BLOCK_TYPE.VIRUS] = 100;
SETTINGS.BlockHealth[BLOCK_TYPE.LIFE] = 100;

SETTINGS.BlockSpreadLife[BLOCK_TYPE.FIRE] = 0;
SETTINGS.BlockSpreadLife[BLOCK_TYPE.WIND] = 2;
SETTINGS.BlockSpreadLife[BLOCK_TYPE.WATER] = 4;
SETTINGS.BlockSpreadLife[BLOCK_TYPE.EARTH] = 0;
SETTINGS.BlockSpreadLife[BLOCK_TYPE.VIRUS] = 0;
SETTINGS.BlockSpreadLife[BLOCK_TYPE.LIFE] = 0;
