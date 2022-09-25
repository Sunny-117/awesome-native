import {config} from './Config';
import {createObjPool} from './Utils';
import Bullet from './Bullet';
let bulletPool = createObjPool(() => {
  return new PlayerBullet();
});
export default class PlayerBullet extends Bullet{
  constructor(x = -99, y = -99, shiftX=0, shiftY=-1, type = 'normal', damage= 1){
    super(x, y, shiftX, shiftY);
    this.type = type;
    this.damage = damage;
  }

  static _judgeBumpBoss(bullet, bulletArr, i, boss, player, ctrler){
    let {bulletWidth, bulletHeight, bossWidth, bossHeight} = config;
    if(boss && boss.state !== 'Appear' && !boss.dieFlag &&
      bullet.x + bulletWidth > boss.x &&
      bullet.x < boss.x + bossWidth &&
      bullet.y + bulletHeight > boss.y &&
      bullet.y < boss.y + bossHeight
    ){
      let delBullet = bulletArr.splice(i, 1)[0];
      PlayerBullet.recoverBullet(delBullet);
      player.score += (delBullet.damage * 7);
      boss.attacked(delBullet.damage, ctrler);
    }
  }

  static render(ctrler, draw, soundPlay){
    let {bulletWidth, bulletHeight, dieInterval, killScore} = config;
    let {bulletArr, enemyArr, dieArr, boss, player} = ctrler;
    outer: for(let i = bulletArr.length; i--;){
      let bullet = bulletArr[i];
      if(bullet.y < -bulletHeight){
        let delBullet = bulletArr.splice(i, 1)[0];
        PlayerBullet.recoverBullet(delBullet);
        continue;
      }
      draw(`bullet_${bullet.type}.png`, bullet.x, bullet.y);
      bullet.y += bullet.shiftY;
      if(bullet.shiftX){
        bullet.x += bullet.shiftX;
      }
      for(let j = enemyArr.length; j--;){
        let enemy = enemyArr[j];
        if(bullet.x + bulletWidth > enemy.x &&
          bullet.x < enemy.x + config[`${enemy.type}Width`] &&
          bullet.y + bulletHeight > enemy.y &&
          bullet.y < enemy.y + config[`${enemy.type}Height`]
        ){
          let delBullet = bulletArr.splice(i, 1)[0];
          PlayerBullet.recoverBullet(delBullet);
          enemy.blood -= delBullet.damage;
          if(enemy.blood <= 0){
            let dieEnemy = enemyArr.splice(j, 1)[0];
            let dieLen = config.dieImgNum[dieEnemy.type];
            dieEnemy.dieLen = dieLen;
            dieEnemy.countDown = dieLen * dieInterval;
            dieArr.push(dieEnemy);
            if(dieEnemy.isAI){
              player.score += 2 * killScore[dieEnemy.type];
            }else{
              player.score += killScore[dieEnemy.type];
            }
            soundPlay(`${dieEnemy.type}_die.mp3`);
          }
          continue outer;
        }
      }
      PlayerBullet._judgeBumpBoss(bullet, bulletArr, i, boss, player, ctrler);
    }
  }

  static getBullet(x, y, shiftX, shiftY, type, damage){
    let bullet = bulletPool.get();
    bullet.x = x;
    bullet.y = y;
    bullet.type = type;
    bullet.damage = damage;
    bullet.shiftX = shiftX;
    bullet.shiftY = shiftY;
    return bullet;
  }

  static recoverBullet(bulletObj){
    return bulletPool.recover(bulletObj);
  }
}