import {config} from './Config';
import {createObjPool, randomNum} from './Utils';
import {propStrategy} from './Strategy';
export default class Prop{
  constructor(type){
    let {canvasWidth, propWidth, propHeight} = config;
    this.x = randomNum(0, canvasWidth - propWidth);
    this.y = -propHeight;
    this.type = type;
  }

  _judgeBumpPlayer(player, ctrler, soundPlay){
    let {propWidth, propHeight} = config;
    if(
      player.x < this.x + propWidth &&
      player.x + player.width > this.x &&
      player.y < this.y + propHeight &&
      player.y + player.height > this.y
    ){
      propStrategy[this.type](player);
      soundPlay(`get_${this.type}_prop.mp3`);
      ctrler.prop = null;
    }
  }

  render(ctrler, draw, soundPlay){
    let {propSpeed, propWidth, propHeight, canvasHeight} = config;
    let {player} = ctrler;
    draw(`prop_${this.type}.png`, this.x, this.y);
    this.y += propSpeed;
    if(this.y > canvasHeight + propHeight){
      ctrler.prop = null;
    }
    this._judgeBumpPlayer(player, ctrler, soundPlay);
  }
}