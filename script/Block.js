var BLOCK_TYPE = {
  NONE: 0,
  WATER: 1,
  EARTH: 2,
  FIRE: 3,
  WIND: 4
};

function Block(blockType) {

  this.type = blockType;
  this.maxHealth = 0;
  this.spreadTimer = 5;

  switch(this.type)
  {
    case BLOCK_TYPE.WATER:
      this.maxHealth = Infinity;
      break;

    case BLOCK_TYPE.EARTH:
      this.maxHealth = 500;
      break;

    case BLOCK_TYPE.FIRE:
      this.maxHealth = 100;
      break;

    case BLOCK_TYPE.WIND:
      this.maxHealth = 50;
      break;
  }

  this.health = this.maxHealth;

}
