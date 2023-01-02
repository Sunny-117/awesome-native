import {config} from './Config';
import {firstLower, randomNum} from './Utils';
import {bossBulletStrategy} from './Strategy';
import Plane from './Plane';
export default class Boss extends Plane{
  constructor(level, x = -999, y = -999){
    super(x, y);
    this.x = (config.canvasWidth - config.bossWidth)/2,
    this.y = -config.bossHeight;
    this.width = config.bossWidth;
    this.height = config.bossHeight;
    this.state = 'Appear';
    this.level = level;
    this.blood = config.bossBlood + this.level * 120;
    this.maxBlood = this.blood;
    this.dieFlag = false;
    this.bullets = [];
  }

  _moveAppear(){
    if(this.y > 80){
      this.state = 'Left';
    }
    return this.y += 1;
  }

  _moveLeft(){
    if(this.x < 0){
      this.state = 'Right';
    }
    return this.x--;
  }

  _moveRight(){
    if(this.x > config.canvasWidth - config.bossWidth){
      this.state = 'Left';
    }
    return this.x++;
  }

  _judgeBumpPlayer(player, soundPlay){
    let {x, y} = this;
    if(
      x + 0.9*this.width > player.x &&
      x + 0.1*this.width < player.x + player.width &&
      y + 0.9*this.height > player.y &&
      y + 0.1*this.height < player.y + player.height &&
      !player.dieFlag
    ){
      player.attacked(soundPlay);
    }
  }

  _move(){
      this[`_move${this.state}`]();
  }

  render(ctx, player, draw, soundPlay){
    let {x, y} = this;
    let bossText = `Lv.${this.level} Boss`;
    let textWidth = ctx.measureText(bossText).width; 
    let bloodBarWidth = this.width * 0.8;
    let bloodBarHeight = 14;
    let bloodBarPosX = x + this.width*0.1;
    let bloodBarPosY = y - 20;
    let bossState = firstLower(this.state);
    if(this.showTime && !this.dieFlag){
      draw('boss_angry.png', x, y);
    }else{
      draw(`boss_${bossState}.png`, x, y);
    }
    ctx.strokeStyle = 'black';
    ctx.strokeRect(bloodBarPosX, bloodBarPosY, bloodBarWidth, bloodBarHeight);
    ctx.fillStyle = 'red';
    if(this.blood < 0){
      this.blood = 0;
    }
    ctx.fillRect(bloodBarPosX, bloodBarPosY, bloodBarWidth * (this.blood / this.maxBlood), bloodBarHeight);
    ctx.font = '24px sans-serif';
    ctx.fillStyle = 'black';
    ctx.fillText(bossText, x + (this.width - textWidth)/2 + 28, y - 24);
    this._move();
    this._judgeBumpPlayer(player, soundPlay);
  };

  renderDie(ctrler, draw){
    draw('boss_die.png', this.x, this.y);
    this.countDown--;
    if(this.countDown === 0){
      ctrler.boss = null;
    }
  };

  sendBullet(ctrler){
    let {frame, player, gameLevel} = ctrler;
    if(frame.counter % 200 === 0 || this.showTime !== 0){
      if(!this.showTime){
        this.showTime = 100;
        this.curBullet = randomNum(1, 6);
      }
      let fireX = this.x + this.width / 2;
      let fireY = this.y + this.height;
      let ratio = (player.x + player.width/2 - fireX) / (player.y + player.height/2 - fireY);

      bossBulletStrategy[this.curBullet](this, fireX, fireY, gameLevel, ratio);

      this.showTime--;
    }
  };

  attacked(damage, ctrler){
    this.blood -= damage;
    if(this.blood < 0){
      ctrler.gameLevel++;
      ctrler.player.score += (1e4 + this.level*2000);
      this.dieFlag = true;
      this.countDown = 120;
    }
  }
}