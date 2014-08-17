var BLOCK_TYPE = {
  NONE: 0,
  WATER: 1,
  EARTH: 2,
  FIRE: 3,
  WIND: 4,
  VIRUS: 5
};

function Block(blockType, options) {

  this.type = blockType;

  switch(this.type)
  {
    case BLOCK_TYPE.FIRE:
      this.maxHealth = 50;
      break;

    case BLOCK_TYPE.WIND:
      this.maxHealth = 10;
      break;

    case BLOCK_TYPE.WATER:
      this.maxHealth = 70;
      break;

    default:
      this.maxHealth = 100;
      break;
  }

  if(typeof options != "undefined" && typeof options.spreadLife != "undefined")
  {
    this.spreadLife = options.spreadLife;
  }
  else
  {
    switch(this.type)
    {
      case BLOCK_TYPE.WIND:
        this.spreadLife = 2;
        break;

      case BLOCK_TYPE.WATER:
        this.spreadLife = 4;
        break;

      default:
        this.spreadLife = 0;
        break;
    }
  }

  this.health = this.maxHealth;

}
