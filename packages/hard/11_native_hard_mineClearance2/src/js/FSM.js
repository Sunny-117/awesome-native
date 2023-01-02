import {config} from './Config';
import {getClass, installEvent} from './Utils';
import {lanStrategy} from './Language';
import Controller from './Controller';
import BossBullet from './BossBullet';
import PlayerBullet from './PlayerBullet';
import Enemy from './Enemy';

/******** 状态改变工厂 ********/
let changeUIState = function(type, ui){
  function show(){
    this.showUI(ui, lanStrategy[this.language][`${ui}Content`]);
  }
  function hide(){
    this.hideUI(ui);
  }
  let upperState = ui.toUpperCase();
  if(type === 'show'){
    return show.after(function(){
      this.curState = `${upperState}_UI`;
    });
  }else{
    return hide.after(function(){
      this.curState = 'MAIN_UI';
    });
  }
};

let showRank = changeUIState('show', 'rank');
let showSet = changeUIState('show', 'set');
let showRule = changeUIState('show', 'rule');
let hideRank = changeUIState('hide', 'rank');
let hideSet = changeUIState('hide', 'set');
let hideRule = changeUIState('hide', 'rule');


/******** 游戏控制相关函数 ********/
let pauseGame = (function(){ //暂停游戏
  this.controller.isPaused = true;
  if(!this.ctrl){
    this.ctrl = this.createUI('ctrl', lanStrategy[this.language].ctrlContent);
    let ctrlResume = getClass('ctrl-resume');
    let ctrlAgain = getClass('ctrl-again');
    ctrlResume.addEventListener('touchend', resumeGame.bind(this));
    ctrlAgain.addEventListener('touchend', againGame.bind(this));
  }
  this.globalSrcBuffer.soundPause('music.mp3');
  this.ctrl.style.display = 'block';
}).before(function(){
  this.curState = 'GAME_PAUSE_UI';
});

let resumeGame = (function(){ //继续游戏
  this.controller.isPaused = false;
  this.ctrl.style.display = 'none';
  this.globalSrcBuffer.soundPlay('music.mp3', {loop:true, replay:false});
  gameRun.call(this);
}).before(function(){
  this.curState = 'IN_GAME_UI';
});

let againGame = (function(){ //重新游戏
  this.controller = null;
  this.ctrl.style.display = 'none';
  this.globalSrcBuffer.soundPlay('music.mp3', {loop:true, replay:true});
  startGame.call(this);
}).before(function(){
  this.curState = 'IN_GAME_UI';
});


/******* 启动游戏 *******/
let startGame = (function(){
  // console.log('game start');
  this.globalSrcBuffer.soundPlay('music.mp3', {loop:true, replay:true});
  this.bombBtn.style.display = 'block';
  this.ctrlBtn.style.display = 'block';
  this.controller = new Controller(); //启动游戏控制器
  
  installEvent(this.controller);
  this.controller.init();

  let {
    enemyArr,
    dieArr,
    player
  } = this.controller;
  
  player.bindTouchEvent(this.canvas);
  player.bindBombEvent(this.bombBtn, this.globalSrcBuffer, enemyArr, dieArr, this.controller);
  if(!this.ctrlEventBinded){
    this.bindCtrlEvent();
    this.ctrlEventBinded = true;
  }
  
  gameRun.call(this); //运行游戏
}).before(function(){
  this.curState = 'IN_GAME_UI';
});


/******* 运行游戏帧动画*******/
let gameRun = function(){
  let ctrler = this.controller;
  let ui = this;
  let gSrc = this.globalSrcBuffer;
  let {
    background,
    player,
    prop,
    boss,
    frame,
    bulletArr
  } = ctrler;

  let soundPlay = gSrc.soundPlay.bind(gSrc);
  let drawBack = this.drawBackground.bind(this);
  let draw = this.drawImg.bind(this);

  frame.counter++;
 
  background.scroll(drawBack); //滚动背景

  player.sendBullet(frame, bulletArr, soundPlay); //玩家发射子弹
  PlayerBullet.render(ctrler, draw, soundPlay); //渲染玩家子弹

  if(!boss){
    ctrler.sendEnemy(soundPlay); //派发敌机
    ctrler.sendAIEnemey(); //派发智能机群
  }
  
  Enemy.render(ctrler, draw, soundPlay); //渲染敌机
  Enemy.renderDie(ctrler, draw); //渲染爆炸敌机

  ctrler.sendBoss(soundPlay); //派发Boss

  if(boss){
    boss.render(this.ctx, player, draw, soundPlay); //渲染Boss
    if(boss.state !== 'Appear'){
      if(!boss.dieFlag){
        boss.sendBullet(ctrler); //Boss发射子弹
      }
      BossBullet.render(player, boss, bulletArr, draw, soundPlay); //渲染Boss子弹
    }
  }
  if(boss && boss.dieFlag){
    boss.renderDie(ctrler, draw); //渲染挂掉的Boss
  }

  if(player.render(this)){ //渲染玩家飞机
    return; //终止游戏
  }

  ctrler.sendProps(frame, soundPlay); //发放道具
  prop && prop.render(ctrler, draw, soundPlay); //渲染道具
  player.bomb && ctrler.renderBomb(this.ctx, player, draw); //渲染炸弹
  player.score && ctrler.renderScore(this.ctx, player, this.language); //渲染分数
  ctrler.renderCtrl(draw); //渲染控制按钮
  
  if(this.curState === 'IN_GAME_UI'){
    requestAnimationFrame(gameRun.bind(this));      
  }
};

let loadGame = function(){ //加载游戏
  this.drawBackground();
  this.btnGroup.style.display = 'none';
  this.hideAllUI();
  
  if(!this.loaded){
    // let loadedSrc = 0;
    this.drawLoading(startGame.bind(this));
    // this.globalSrcBuffer.preloadSrc(config.gameImageSrc, 'image', () => {
    //   console.log('image loaded');
    //   if(++loadedSrc == 2){
    //     this.loaded = true;
    //   }
    // });
    // this.globalSrcBuffer.preloadSrc(config.gameAudioSrc, 'sound', () => {
    //   console.log('sound loaded');
    //   if(++loadedSrc == 2){
    //     this.loaded = true;
    //   }
    // });
    this.loaded = true;
  }else{
    startGame.call(this);
  }
}

/******** UI-有限状态机 ********/
export const FSM = {
    'MAIN_UI': {
      clickStartBtn: loadGame,
      clickRankBtn: showRank,
      clickSetBtn: showSet,
      clickRuleBtn: showRule
    },
    'RANK_UI': {
      clickStartBtn: loadGame,
      clickRankBtn: hideRank,
      clickSetBtn: showSet,
      clickRuleBtn: showRule
    },
    'SET_UI': {
      clickStartBtn: loadGame,
      clickRankBtn: showRank,
      clickSetBtn: hideSet,
      clickRuleBtn: showRule
    },
    'RULE_UI': {
      clickStartBtn: loadGame,
      clickRankBtn: showRank,
      clickSetBtn: showSet,
      clickRuleBtn: hideRule
    },
    'IN_GAME_UI': {
      clickCtrlBtn: pauseGame
    },
    'GAME_PAUSE_UI': {
      clickCtrlBtn: resumeGame
    },
    'GAME_OVER_UI': {
      
    }
}