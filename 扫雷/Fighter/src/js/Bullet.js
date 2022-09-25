export default class Bullet{
  constructor(x = -99, y = -99, shiftX = 0, shiftY = -1){
    this.x = x;
    this.y = y;
    this.shiftX = shiftX;
    this.shiftY = shiftY;
  }

  static getBullet(){};
  static recoverBullet(){};
}