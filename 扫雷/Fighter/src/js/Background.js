import {config} from './Config';
export default class Background{
  constructor(){
    this.height = config.canvasHeight,
    this.y1 = -this.height,
    this.y2 = 0
  }

  scroll(draw){
    this.y1 = (this.y1 === this.height) ? -this.height : (this.y1 + 1);
    this.y2 = (this.y2 === this.height) ? -this.height : (this.y2 + 1);
    draw(this.y1);
    draw(this.y2);
  };
}