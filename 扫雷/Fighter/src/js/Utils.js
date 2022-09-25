/***** 工具库 *****/
var getID = function(str){
  return document.getElementById(str);
};
var getClass = function(str, num = 0){
  return document.getElementsByClassName(str)[num];
}
var create = function(str){
  return document.createElement(str);
};
var firstUpper = function(str){
  return str.slice(0, 1).toUpperCase() + str.slice(1);
};
var firstLower = function(str){
  return str.slice(0, 1).toLowerCase() + str.slice(1);
};
var removeDOM = function(dom){
  var parentNode = dom.parentNode;
  if(parentNode){
    parentNode.removeChild(dom);
  }
};
var getStyle = function(ele, style){
	if(window.getComputedStyle){
		return window.getComputedStyle(ele,null)[style];
	}else{
		return ele.currentStyle[style];
	}
};
var createObjPool = function(createObjFn){ //对象池工厂
  var objPool = [];
  return {
    get: function(){
      var obj = objPool.length === 0 ?
        createObjFn.apply(this, arguments) : objPool.shift();
      return obj;
    },
    recover: function(obj){
      objPool.push(obj);
    }
    // _see: function(){
    //   console.log(objPool);
    // }
  }
};
var installEvent = function(obj){ // 发布-订阅模式/观察者模式
  obj.eventList = [];
  obj.listen = function(key, fn){
    if(!this.eventList[key]){
      this.eventList[key] = [];
    }
    this.eventList[key].push(fn);
  };
  obj.trigger = function(){
    var key = Array.prototype.shift.call(arguments);
    var fns = this.eventList[key];
    if(!fns || fns.length === 0){
      return false;
    }
    for(var i = 0, fn; fn = fns[i++];){
      fn.apply(this, arguments);
    }
  };
  obj.remove = function(key, fn){
    var fns = this.eventList[key];
    if(!fns){
      return false;
    }
    if(!fn){
      fns && (fns.length = 0);
    }else{
      for(var i = fns.length - 1; i >= 0; i--){
        var _fn = fns[l];
        if(_fn === fn){
          fns.splice(i, 1);
        }
      }
    }
  }
};
var randomNum = function(min, max){
  return Math.floor(min + Math.random() * (max - min));
}
Function.prototype.before = function(beforeFn){
  var _self = this;
  return function(){
    beforeFn.apply(this, arguments);
    return _self.apply(this, arguments);
  }
}
Function.prototype.after = function(afterFn){
  var _self = this;
  return function(){
    var ret = _self.apply(this, arguments);
    afterFn.apply(this, arguments);
    return ret;
  }
}
export {
  getID,
  getClass,
  create,
  firstUpper,
  firstLower,
  removeDOM,
  getStyle,
  createObjPool,
  installEvent,
  randomNum
}