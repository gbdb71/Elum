var BLOCK_TYPE = {
  NONE: 0,
  WATER: 1,
  EARTH: 2,
  FIRE: 3,
  WIND: 4,
  VIRUS: 5
};

function Block(blockType, spreadLife) {

  this.type = blockType;

  if(typeof spreadLife === "undefined")
  {
    switch(this.type)
    {
      case BLOCK_TYPE.WIND:
        this.spreadLife = 2;
        break;

      default:
        this.spreadLife = 0;
        break;
    }
  }
  else
  {
    this.spreadLife = spreadLife;
  }

}
