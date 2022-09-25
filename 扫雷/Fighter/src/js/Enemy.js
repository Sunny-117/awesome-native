import {config} from './Config';
import {createObjPool} from './Utils';
import Plane from './Plane';
let enemyPool = createObjPool(() => {
  return new Enemy();
});
export default class Enemy extends Plane{
  constructor(x = -999, y = -999){
    super(x, y);
  }

  static _judgeBumpPlayer(enemy, enemyWidth, enemyHeight, player, soundPlay){
    if(
      enemy.x + 0.8*enemyWidth > player.x + 0.1*player.width &&
      enemy.x + 0.2*enemyWidth < player.x + 0.9*player.width &&
      enemy.y + 0.8*enemyHeight > player.y + 0.1*player.height &&
      enemy.y + 0.2*enemyHeight < player.y + 0.9*player.height &&
      !player.dieFlag
    ){
      player.attacked(soundPlay);
    }
  }

  static render(ctrler, draw, soundPlay){
    let {canvasWidth, canvasHeight, planeBlood, grow} = config;
    let {frame, enemyArr, player, gameLevel} = ctrler;
    for(let i = enemyArr.length; i--;){
      let enemy = enemyArr[i];
      let {type, dir} = enemy;
      let enemyHeight = config[`${type}Height`];
      let enemyWidth = config[`${type}Width`];
      if(enemy.y > canvasHeight + enemyHeight || enemy.x < -300 || enemy.x > canvasWidth + 300){
        let del = enemyArr.splice(i, 1)[0];
        Enemy.recoverEnemy(del);
        continue;
      }
      if(type === 'largePlane'){
        if(frame.counter % 7 === 0){
          enemy.imgIndex = Number(!enemy.imgIndex);
        }
        if(enemy.blood < planeBlood.largePlane / 2 && enemy.imgIndex == 1){
          draw('largePlane_hurt.png', enemy.x, enemy.y);
        }else{
          draw(`${type}${enemy.imgIndex}.png`, enemy.x, enemy.y);
        }
      }else{
        if(type === 'mediumPlane' && enemy.blood < planeBlood.mediumPlane / 2){
          draw('mediumPlane_hurt.png', enemy.x, enemy.y);
        }
        if(dir){
          draw(`${type}_${dir}.png`, enemy.x, enemy.y);
        }else{
          draw(`${type}.png`, enemy.x, enemy.y);
        }
      }
      Enemy._judgeBumpPlayer(enemy, enemyWidth, enemyHeight, player, soundPlay);
      enemy.y += enemy.shiftY;
      enemy.x += enemy.shiftX;
      if(!enemy.isAI){
        enemy.y += grow[enemy.type]*gameLevel;
      }
    }
  };

  static renderDie(ctrler, draw){
    let {dieArr} = ctrler;
    for(let i = dieArr.length; i--;){
      let diePlane = dieArr[i];
      if(diePlane.countDown === 0){
        let delEnemy = dieArr.splice(i, 1)[0];
        Enemy.recoverEnemy(delEnemy);
      }else{
        let dieIndex = Math.floor(diePlane.dieLen - diePlane.countDown / 10);
        if(diePlane.dir){
          draw(`${diePlane.type}_${diePlane.dir}_die${dieIndex}.png`, diePlane.x, diePlane.y);
        }else{
          draw(`${diePlane.type}_die${dieIndex}.png`, diePlane.x, diePlane.y);
        }
      }
      diePlane.countDown--;
    }
  };

  static getEnemy(x, y, type, shiftX=0, shiftY=config[`${type}Speed`], isAI=false, dir=''){
    let enemy = enemyPool.get();
    enemy.x = x;
    enemy.y = y;
    enemy.type = type;
    enemy.blood = config.planeBlood[type];
    enemy.shiftX = shiftX;
    enemy.shiftY = shiftY;
    enemy.dir = dir;
    enemy.isAI = isAI;
    return enemy;
  }

  static recoverEnemy(enemyObj){
    return enemyPool.recover(enemyObj);
  }
}