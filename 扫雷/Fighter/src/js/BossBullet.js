import {config} from './Config';
import {createObjPool} from './Utils';
import Bullet from './Bullet';
let bulletPool = createObjPool(() => {
  return new BossBullet();
});
export default class BossBullet extends Bullet{
  constructor(x = -99, y = -99, shiftX=0, shiftY=-1, aX = 0, aY = 0){
    super(x, y, shiftX, shiftY);
    this.aX = aX;
    this.aY = aY;
  }

  static _judgeBumpPlayer(bullet, player, soundPlay){
    let {bossBulletWidth, bossBulletHeight} = config;
    if(
      bullet.x + bossBulletWidth > player.x + 0.2*player.width &&
      bullet.x < player.x + 0.8*player.width &&
      bullet.y + bossBulletHeight > player.y + 0.2*player.height &&
      bullet.y < player.y + 0.8*player.height &&
      !player.dieFlag
    ){
      player.attacked(soundPlay);
    }
  }

  static render(player, boss, bulletArr, draw, soundPlay){
    let {canvasWidth, cavasHeight, bossBulletWidth, bossBulletHeight} = config;
    let {bullets} = boss;
    if(bullets.length !== 0){
       for(let i = bullets.length; i--;){
        let bullet = bullets[i];
        if(bullet.y > cavasHeight && 
          bullet.y < -bossBulletHeight && 
          bullet.x < -bossBulletWidth &&
          bullet.x > canvasWidth
        ){
          let delBullet = bullets.splice(i, 1)[0];
          BossBullet.recoverBullet(delBullet);
          continue;
        }
        draw('boss_bullet.jpg', bullet.x, bullet.y);
        bullet.y += bullet.shiftY;
        bullet.x += bullet.shiftX;
        if(bullet.aX){
          if(bullet.shiftX < 0){
            bullet.shiftX -= bullet.aX;
          }else{
            bullet.shiftX += bullet.aX;
          }
        }
        if(bullet.aY){
          bullet.shiftY += bullet.aY;
        }
        BossBullet._judgeBumpPlayer(bullet, player, soundPlay);
      }
    }
  };

  static getBullet(x, y, shiftX, shiftY, aX = 0, aY = 0){
    let bullet = bulletPool.get();
    bullet.x = x;
    bullet.y = y;
    bullet.shiftX = shiftX;
    bullet.shiftY = shiftY;
    bullet.aX = aX;
    bullet.aY = aY;
    return bullet;
  }

  static recoverBullet(bulletObj){
    return bulletPool.recover(bulletObj);
  }
}