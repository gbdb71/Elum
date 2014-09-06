var SETTINGS = {

  // Health of individual blocks
  BlockHealth: [],

  // How long (in game ticks) the block death animation should last
  BlockDeathTimer: 5,

  // Default "spread" of a block (how many blocks a block can create by
  // multiplying itself)
  BlockSpreadLife: [],

  // Base color for a block
  BlockBaseColor: [],

  // Inner tile color for a block
  BlockInnerColor: [],

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

SETTINGS.BlockBaseColor[BLOCK_TYPE.FIRE] = "214, 30, 30";
SETTINGS.BlockBaseColor[BLOCK_TYPE.WIND] = "112, 208, 230";
SETTINGS.BlockBaseColor[BLOCK_TYPE.WATER] = "33, 104, 196";
SETTINGS.BlockBaseColor[BLOCK_TYPE.EARTH] = "196, 107, 33";
SETTINGS.BlockBaseColor[BLOCK_TYPE.VIRUS] = "77, 168, 37";
SETTINGS.BlockBaseColor[BLOCK_TYPE.LIFE] = "1, 1, 1";

SETTINGS.BlockInnerColor[BLOCK_TYPE.FIRE] = "184, 26, 26";
SETTINGS.BlockInnerColor[BLOCK_TYPE.WIND] = "123, 216, 237";
SETTINGS.BlockInnerColor[BLOCK_TYPE.WATER] = "29, 87, 163";
SETTINGS.BlockInnerColor[BLOCK_TYPE.EARTH] = "168, 93, 30";
SETTINGS.BlockInnerColor[BLOCK_TYPE.VIRUS] = "64, 138, 32";
SETTINGS.BlockInnerColor[BLOCK_TYPE.LIFE] = "1, 1, 1";


/*
  default:

    break;
}
*/
