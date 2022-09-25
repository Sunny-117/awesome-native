import {config} from './Config';

/******* 资源创建策略对象 *******/
let srcStrategy = {
  image(fileSrc, eventFunc){
    let img = new Image();
    if(eventFunc){
      img.addEventListener('load', eventFunc);
    }
    img.src = config.imgPath + fileSrc;
    return img;
  },
  sound(fileSrc, eventFunc){
    let sound = new Audio();
    if(eventFunc){
      sound.addEventListener('canplaythrough', eventFunc);
    }
    sound.src = config.soundPath + fileSrc;
    return sound;
  }
}

export default class Source {
  constructor(){
    this.srcBuffer = {}; //资源缓存区
  }
  
  getSrc(fileSrc, type){ //获取资源
    if(!this.srcBuffer[fileSrc]){
      this.srcBuffer[fileSrc] = srcStrategy[type](fileSrc);
    }
    return this.srcBuffer[fileSrc];
  }

  soundPlay(src, config = {loop: false, replay: true}){ //播放音乐/音效
    let sound = this.getSrc(src, 'sound');
    if(typeof config.loop === 'undefined'){
      config.loop = false;
    }
    if(typeof config.replay === 'undefined'){
      config.replay = true;
    }
    if(config.loop){
      sound.loop = 'loop';
    }
    if(config.replay){
      sound.currentTime = 0;  
    }
    sound.play();
    return sound;
  }

  soundPause(src){ //暂停音乐
    let sound = this.getSrc(src, 'sound');
    sound.pause();
    return sound;
  }

  preloadSrc(srcArr, type, callback){ //资源预加载
    let toLoadLen = srcArr.length;
    let loadedLen = 0;
    for(let i = toLoadLen; i--;){
      let src = srcArr[i];
      this.srcBuffer[src] = srcStrategy[type](src, () => {
        loadedLen++;
        if(typeof callback === 'function' && loadedLen === toLoadLen){
          callback();
        }
      });
    }
  }
}