import {config} from './Config';
import {randomNum} from './Utils';
import {AIStrategy} from './Strategy';
import {lanStrategy} from './Language';
import Background from './Background';
import Player from './Player';
import Enemy from './Enemy';
import Boss from './Boss';
import Prop from './Prop';
export default class Controller {
  constructor(){
    this.background = new Background();
    this.player = new Player();
    this.bulletArr = [];
    this.enemyArr = [];
    this.dieArr = [];
    this.prop = null;
    this.frame = {
      counter: 0
    };
    this.isPaused = false;
    this.enemyInterval = config.enemyInterval;
    this.AIInterval = config.AIInterval;
    this.boss = null;
    this.gameLevel = 1;
    this.showBossScore = config.showBossScore;
  }

  _drawGameOver(ui){
    let textWidth;
    let {canvasWidth, canvasHeight} = config;
    let {ctx} = ui;
    let {player} = ui.controller;
    ui.curState = 'GAME_OVER_UI';
    ui.drawImg('game_over.png', 0, 0);
    ui.bombBtn.style.display = 'none';
    ui.ctrlBtn.style.display = 'none';
    ui.globalSrcBuffer.soundPlay('achievement.mp3');
    ctx.font = '50px sans-serif';
    textWidth = ctx.measureText(player.score).width;
    ctx.fillText(player.score, (canvasWidth - textWidth) / 2, canvasHeight / 2);
  }

  _recordScore(ui){
    let {player} = ui.controller;
    if(!sessionStorage.fighterScore){
      sessionStorage.fighterScore = '[]';
    }
    let db = JSON.parse(sessionStorage.fighterScore);
    db.push(player.score);
    db = db.sort(function(a, b){
      return b - a;
    });
    sessionStorage.fighterScore = JSON.stringify(db);
  }

  _bindTouchOver(ui){
    let {canvas} = ui;
    let touchScreen = () => {
      ui.globalSrcBuffer.soundPause('music.mp3');
      ui.drawBackground();
      ui.drawLogo();
      ui.setBtnText(ui.language);
      ui.btnGroup.style.display = 'block';
      ui.curState = 'MAIN_UI';
      canvas.removeEventListener('touchstart', touchScreen);
    }

    setTimeout(() => {
      canvas.addEventListener('touchstart', touchScreen);
    }, 1000);
  }

  init(){
    this.listen('gameover', this._drawGameOver);
    this.listen('gameover', this._recordScore);
    this.listen('gameover', this._bindTouchOver);
  }

  randomPlane(){ //随机敌机
    let index = Math.random();
    if(index < 0.7){
      return 'smallPlane';
    }
    if(index >= 0.7 && index < 0.9){
      return 'mediumPlane';
    }
    if(index >= 0.9){
      return 'largePlane';
    }
  }

  randomAI(){ //随机智能机群
    let index = Math.random();
    if(index < 0.33){
      return 'AI-I';
    }
    if(index >= 0.33 && index <= 0.66){
      return 'AI-II';
    }
    if(index > 0.66){
      return 'AI-III';
    }
  }

  randomProp(){ //随机道具
    let index = Math.random();
    if(index < 0.3){
      return 'bomb';
    }
    if(index >= 0.3){
      return 'weapon';
    }
  }

  sendEnemy(soundPlay){
    let enemyInterval = (this.enemyInterval - 2 * this.gameLevel);
    if(enemyInterval < 20){
      enemyInterval = 20;
    }
    if(this.frame.counter % enemyInterval === 0){
      let planeType = this.randomPlane();
      let newEnemy = Enemy.getEnemy(
        randomNum(0, config.canvasWidth - config[`${planeType}Width`]), 
        -config[`${planeType}Height`],
        planeType
      );
      if(planeType === 'largePlane'){
        newEnemy.imgIndex = 0;
        soundPlay('largePlane_flying.mp3');
      }
      this.enemyArr.push(newEnemy);
    }
  };

  sendAIEnemey(){
    if(this.frame.counter % this.AIInterval === 0){
      AIStrategy[this.randomAI()](this);
    }
  };

  sendBoss(soundPlay){
    if(this.player.score > this.showBossScore){
      this.showBossScore += config.showBossScore;
      soundPlay('warning.mp3');
      if(!this.boss){
        this.boss = new Boss(this.gameLevel);
      }
    }
  };

  sendProps(frame, soundPlay){
    let {propInterval, propWidth, propHeight, canvasWidth} = config;
    if(frame.counter % propInterval === 0){
      let propType = this.randomProp();
      soundPlay('prop_appear.mp3');
      this.prop = new Prop(propType);
    }
  };

  renderBomb(ctx, player, draw){
    let {canvasHeight, bombWidth, bombHeight} = config;
    draw('bomb.png', 10, canvasHeight - bombHeight - 10);
    ctx.font = '30px sans-serif';
    ctx.fillStyle = 'black';
    ctx.fillText(`× ${player.bomb}`, bombWidth + 20, canvasHeight - bombHeight / 2);
  };

  renderScore(ctx, player, language){
    ctx.font = '34px sans-serif';
    ctx.fillStyle = 'black';
    ctx.fillText(`${lanStrategy[language].score}：${player.score}`, 70, 40);
  };

  renderCtrl(draw){
    if(!this.isPaused){
      draw('game_pause.png', 0, 5);
    }else{
      draw('game_resume.png', 0, 5);
    }
  };
}