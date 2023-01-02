import {config} from './Config';
import {lanStrategy} from './Language';
import * as $ from './Utils';
import {FSM} from './FSM';

/*** 版本 ***/
let version = 'v2.0.1';

/*** 语言转换 ***/
let lanChangeStrategy = {
  '中文': 'chinese',
  'English': 'english'
}

export default class UI {
  constructor(paramObj){
    this.curState = 'MAIN_UI'; //UI状态
    this.controller = null; //游戏控制器
    this.score = null; //分数
    this.loaded = false; //加载状态
    Object.assign(this, paramObj);
  }

  static getRatio(){ //获取画布与实际屏幕缩放比
    return {
      x: $.getStyle($.getID('wrapper'),'width').slice(0, -2) / config.canvasWidth,
      y: $.getStyle($.getID('wrapper'),'height').slice(0, -2) / config.canvasHeight
    }
  }

  setBtnText(lanSet){ //设置按钮文本信息
    if(lanSet){
      lanSet = lanSet.toLowerCase();
    }
    if(!lanStrategy[lanSet]){
      lanSet = 'chinese';
    }
    for(let i = 0, btn; btn = ['startBtn','rankBtn','setBtn','ruleBtn'][i++];){
      this[btn].innerHTML = lanStrategy[lanSet][btn];
    }
  }

  drawBackground(offsetY = 0){ //绘制背景
    this.ctx.drawImage(this.background, 0, offsetY);
  }

  drawLogo(){ //绘制Logo
    this.ctx.drawImage(this.logo, (this.canvas.width - this.logo.width)/2, 200);
    this.ctx.fillStyle = 'black';
    this.ctx.font = 'bold 30px sans-serif';
    this.ctx.fillText(version, 320, 225 + this.logo.height);
    this.drawImg('boss_bullet.jpg', 280, 200 + this.logo.height);
  }

  drawImg(src, offsetX = 0, offsetY = 0){ //绘制图片
    this.ctx.drawImage(this.globalSrcBuffer.getSrc(src, 'image'), offsetX, offsetY);
  }

  // drawLoading(callback){
  //   let loadImgArr = config.loadImageSrc;
  //   let loadImgLen = loadImgArr.length;
  //   let index = 0;
  //   let loadText = lanStrategy[this.language].loading;
  //   let loadTimer = setInterval(() => {
  //     let loadSrc = this.globalSrcBuffer.getSrc(loadImgArr[index], 'image');
  //     let textWidth;
  //     this.drawBackground();      
  //     this.ctx.fillStyle = 'black';
  //     this.ctx.font = '30px sans-serif';
  //     textWidth = this.ctx.measureText(loadText).width;      
  //     this.ctx.fillText(loadText, (config.canvasWidth - textWidth) / 2, 500);
  //     if(!loadSrc.onload){
  //       loadSrc.onload = () => {
  //         this.ctx.drawImage(loadSrc, 140, 400);   
  //         index++;
  //         if(index === loadImgLen){
  //           console.log('loaded over');
  //           clearInterval(loadTimer);
  //           setTimeout(callback, 300);
  //         }
  //       }
  //     }
  //   }, 250);
  // }

  drawLoading(callback){ //绘制加载动画
    let loadImgArr = config.loadImageSrc;
    let loadImgLen = loadImgArr.length;
    let index = 0;
    let loadText = lanStrategy[this.language].loading;
    this.ctx.fillStyle = 'black';
    this.ctx.font = '30px sans-serif';
    let textWidth = this.ctx.measureText(loadText).width;
    let textPosX = (config.canvasWidth - textWidth) / 2;

    let loadTimer = setInterval(() => {
      if(index > loadImgLen - 1){
        index--;
      }
      let loadSrc = this.globalSrcBuffer.getSrc(loadImgArr[index], 'image');
      this.drawBackground();    
      this.ctx.fillText(loadText, textPosX, 500);
      this.ctx.drawImage(loadSrc, 140, 400);   
      index++;
      // if(index === loadImgLen && this.loaded){
      //   console.log('loaded over');
      //   clearInterval(loadTimer);
      //   setTimeout(callback, 300);
      // }
      if(index === loadImgLen){
        // console.log('loaded over');
        clearInterval(loadTimer);
        setTimeout(callback, 500);
      }
    }, 300);
  }

  _renderMainUI(){ //渲染主界面
    this.background.onload = () => {
      this.drawBackground();
      this.logo.onload = () => {
        this.drawLogo();
        this.btnGroup.style.display = 'block';
        this.setBtnText(this.language);
      }
    }
  }

  _bindBtnEvent(){ //绑定按钮事件
    for(let i = 0, btn; btn = ['startBtn','rankBtn','setBtn','ruleBtn'][i++];){
      this[btn].addEventListener('touchend', () => {
        FSM[this.curState][`click${$.firstUpper(btn)}`].call(this);
      })
    }
  }

  bindCtrlEvent(){ //绑定暂停控制事件
    this.ctrlBtn.addEventListener('touchend', () => {
      this.globalSrcBuffer.soundPlay('button.mp3');
      FSM[this.curState].clickCtrlBtn.call(this);
    })
  }

  _bindSetEvent(){ //绑定设置相关事件
    const lanSet = $.getClass('lanSet');
    if(!lanSet.onchange){
      lanSet.onchange = () => {
        this.language = lanChangeStrategy[lanSet.value];
        for(var i = 0, ui; ui = ['rank','set','rule'][i++];){
          this.deleteUI(ui);
        }
        this.setBtnText(this.language);
        this.showUI('set', lanStrategy[this.language].setContent);
      }
    }
  }

  _preloadLoading(){ //预加载loding图片
    this.globalSrcBuffer.preloadSrc(config.loadImageSrc, 'image');
  }

  _preloadGame(){
    this.globalSrcBuffer.preloadSrc(config.gameImageSrc, 'image',() => {
      //console.log('image loaded');
    });
    this.globalSrcBuffer.preloadSrc(config.gameAudioSrc, 'sound',() => {
      //console.log('sound loaded');
    });
  }

  _initCanvas(){ //初始化画布
    this.canvas.setAttribute('width', config.canvasWidth);
    this.canvas.setAttribute('height', config.canvasHeight);
  }

  createUI(name, content){ //创建UI
    let tempDiv = $.create('div');
    tempDiv.className = name;
    tempDiv.style.zIndex = 100;
    this.wrapper.appendChild(tempDiv);
    if(typeof content === 'function'){
      tempDiv.innerHTML = content();
    }else{
      tempDiv.innerHTML = content;
    }
    if(name === 'set'){
      this._bindSetEvent();
    }
    return tempDiv;
  }
  
  deleteUI(name){ //删除UI
    if(this[name]){
      $.removeDOM(this[name]);
      delete this[name];
    }
  }

  showUI(name, content){ //显示子界面
    this.hideAllUI();
    if(!this[name] || name === 'rank'){
      this[name] = this.createUI(name, content);
    }
    this[name].style.display = 'block';
  }

  hideUI(name){ //隐藏子界面
    if(this[name]){
      this[name].style.display = 'none';
    }
  }

  hideAllUI(){ //隐藏全部子界面层
    for(let i = 0, ui; ui = ['start','rank','set','rule'][i++];){
      this.hideUI(ui);
    }
  }

  _preventDefault(){ //阻止浏览器默认事件
    if(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)){
      this.canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
      });
      this.canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
      });
    }
  }
  
  
  init(){ //UI初始化
    this._preventDefault();
    this._preloadGame();
    this._initCanvas();
    this._preloadLoading();
    this._renderMainUI();
    this._bindBtnEvent();
  }
}