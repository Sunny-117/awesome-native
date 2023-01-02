var ScrollPic = (function(win, doc) {
	
	var util = {
		//事件绑定
		addEvent: function(ele, eleventType, callback) {
			if(ele.addEventListener) {
				ele.addEventListener(eleventType, callback, false)
			}else if(ele.attachEvent) {
				ele.attachEvent('on' + eleventType, callback);
			}else{
				ele['on' + eleventType] = callback;
			}
		},
		// 通过ID获取DOM对象
		getById: function(id) {
			if(typeof id === "string") {
				return doc.getElementById(id);
			}
			return id;
		},
		// 创建DOM节点
		createNode: function(node) {
			return doc.createElement(node);
		},
		// 设置样式
		setStyle: function(element, styleObj) {
			var i = 0;
			for(var key in styleObj) {
				if(styleObj.hasOwnProperty(key)) {
					element.style[key] = styleObj[key];
					i++;
				}
			}
			return i;
		},
		// 获取样式
		getStyle: function(element, name) {
			if(element.style) {
				name = name.replace(/-(\w)/g, function(all, letter) {
					return letter.toUpperCase();
				});
				if(win.getComputedStyle) {
					return getComputedStyle(element, null)[name];
				}
				return element.currentStyle[name];
			}
		},
		// 扩展对象
		// 把params扩展到target上
		extend: function(target, params) {
			for(var i = 1, l = arguments.length; i < l; i++) {
				var obj =arguments[i];
				if(!obj) {
					continue;
				}
				for(var key in obj) {
					if(obj.hasOwnProperty(key)) {
						target[key] = obj[key];
					}
				}
			}
			return target;
		}
	};


	var defaults = {
		height: 200,
		width: 300,
		interval: 5,
		speed: 300,
		autoTimer: null,
		setTimer: null,
		switchInterval: 3000,
		supportIndex: true,
		supportArrowClick: true,
		pauseable: true,
		wheelable: true,
	};

	function Slider(options) {
		// 默认显示第一张图片
		this.start = 1;
		// 默认需要轮播的元素为0个
		this.nodeCount = 0;
		// 图片轮播容器id
		this.container = util.getById(options.id);
		// 合并配置参数,宽高先统一取成数
		options.width = parseFloat(options.width);
    options.height = parseFloat(options.height);
    util.extend(this, defaults, options);
	};

	Slider.prototype._util = util;

	// 初始化入口
	Slider.prototype.init = function() {
		// 设置容器相关属性
		this._setContainer();
		// 添加其他操作方法
    this._addOptions();
		// 触发轮播
		this._autoMove();
	};

	// 设置相关属性
	Slider.prototype._setContainer = function() {
		var me = this;
		var childNodes = me.container.children;
		var nodeCount = childNodes.length;
		var frag = doc.createDocumentFragment();
		me.scrollWrap = util.createNode('div');
		// 设置宽高
		util.setStyle(me.container, {
			overflow: 'hidden',
			width: me.width + 'px',
			height: me.height + 'px'
		})
		// 设置定位
		if(!/(relative)|(absolute)/.test(
				util.getStyle(me.container, 'position')
			)) {
			util.setStyle(me.container, {
				position: 'relative',
				top: 0,
				left: 0
			})
		}
		// 所有子元素左浮动, 此处需要过滤出element节点
		for(var i = 0;i < nodeCount; i++) {
			if (childNodes[i] && 1 === childNodes[i].nodeType) {
				util.setStyle(childNodes[i], {
					float: 'left',
					display: 'block',
					width: me.width + 'px',
					height: me.height + 'px'
				});
				frag.appendChild(childNodes[i].cloneNode(true));
			}
		}
		// 原来的容器清空&修正有效节点计数
		me.container.innerHTML = '';
		me.nodeCount = frag.childElementCount || frag.childNodes.length;

		// 设置浮动元素的包裹层
		util.setStyle(me.scrollWrap, {
			height: me.height + 'px',
			width: (me.nodeCount + 2) * me.width + 'px',
			position: 'absolute',
			left: -me.width + 'px',
			top: 0
		});	

		// 深度克隆首位元素，实现单向轮播
		frag.appendChild(frag.childNodes[0].cloneNode(true));
		frag.insertBefore(frag.childNodes[me.nodeCount - 1].cloneNode(true),
			frag.childNodes[0]
		);

		// 插入到相应的元素中
		me.scrollWrap.appendChild(frag);
		me.container.appendChild(me.scrollWrap);
	};

	// 添加用户允许的配置的操作
	Slider.prototype._addOptions = function() {
		if(this.supportArrowClick) {
			this._supportArrowClick();
		}
		if(this.supportIndex) {
			this._supportIndex();
		}
		if (this.pauseable) {
      this._supportPauseable();
    }
    if (this.wheelable) {
      this._supportWheelable();
    }
	}

	// 运动函数
	Slider.prototype._animate = function(direction, moveStep) {
		var me = this;
		// 轮播图当前左边距
		var offsetLeft = parseFloat(me.scrollWrap.style.left, 10);
		// 轮播图目标左边距
		var targetLeft;
		if(direction === 'right') {
			me.start === me.nodeCount 
						? me.start = moveStep 
						: me.start += moveStep;
			// 当目前显示的是最右边最右一副图且继续向右运动，修正相关参数
			if(me.scrollWrap.style.left === -me.scrollWrap.offsetWidth + 2 * me.width + 'px') {
			// if(me.scrollWrap.style.left === -me.scrollWrap.offsetWidth + 'px') {
				me.scrollWrap.style.left = offsetLeft = 0;
				me.start = 1;
			}
		}else {
				me.start === 0
							? me.start = me.nodeCount - 1 
							: me.start -= moveStep;
				// 当目前显示的是最左边第一副图且继续向左边运动，修正相关参数
				if(me.scrollWrap.style.left === '0px') {
					offsetLeft = -me.scrollWrap.offsetWidth + 2 * me.width; 
					me.scrollWrap.style.left = offsetLeft + 'px';
				}
			}
			targetLeft = -me.start * me.width;
			me._go(direction, offsetLeft, targetLeft);
			me.supportIndex && me._setIndex(me.start);
	};

	// 模拟动画切换效果
	// direction  运动方向
 //  offsetLeft 轮播大容器的left值
 //  targetLeft 运动目的地的left值
	Slider.prototype._go = function(direction, offsetLeft, targetLeft) {
		var me = this;
		// 轮播图当前位置到目标位置的运动距离
		var distance = targetLeft - offsetLeft;
		// 轮播图片每一次移动的距离
		var step = distance / me.speed * me.interval;
		clearInterval(me.setTimer);
		me.setTimer = setInterval(function() {
			// 到达目标位置时强制设置左边距
			if(direction === 'right' && offsetLeft <= targetLeft || direction === 'left' && offsetLeft >= targetLeft) {
				clearInterval(me.setTimer);
				me.scrollWrap.style.left = targetLeft + 'px';
			}else {
				// 没有到达目标位置继续移动
				me.scrollWrap.style.left = offsetLeft + step + 'px';
				offsetLeft += step;
			}
		}, me.interval)
	};

	// 自动轮播
	Slider.prototype._autoMove = function() {
		var me = this;
		me.autoTimer = setInterval(function() {
			me._animate('right', 1)
		}, me.switchInterval)
	},

	// 左右方向箭头操作
	Slider.prototype._supportArrowClick = function() {
		var me = this;
		var height = me.height;
		me.leftBtn = me._util.getById('btn-pre');
		me.rightBtn = me._util.getById('btn-next');
		util.setStyle(me.leftBtn, {
			position: 'absolute',
			left: (doc.documentElement.clientWidth - me.width) / 2 + 'px',
			top: (height - me.leftBtn.offsetHeight) / 2 + 'px',
   	  height: 51 + 'px',
      width: 51 + 'px',
      cursor: 'pointer',
      fontSize: 30 + 'px',
      textAlign: 'center',
      background: '#D1B6E1',
      borderRadius: '50%',
      color: '#fff'
		});
		util.setStyle(me.rightBtn, {
			position: 'absolute',
	    right: (doc.documentElement.clientWidth - me.width) / 2 + 'px',
	    top: (height - me.rightBtn.offsetHeight) / 2 + 'px',
	    height: 51 + 'px',
      width: 51 + 'px',
	    // z-index: 99,
	    cursor: 'pointer',
	    fontSize: 30 + 'px',
      textAlign: 'center',
      background: '#D1B6E1',
      borderRadius: '50%',
      color: '#fff'
		});
		// 绑定事件
		me._util.addEvent(me.leftBtn, 'click', function() {
			clearInterval(me.autoTimer);
			clearInterval(me.setTimer);
			me._animate('left', 1);
			me._autoMove();
		})
		me._util.addEvent(me.rightBtn, 'click', function() {
			clearInterval(me.autoTimer);
			clearInterval(me.setTimer);
			me._animate('right', 1);
			me._autoMove();
		})
	};

	// 数字索引操作
	Slider.prototype._supportIndex = function() {
		var me = this;
		me.indexWrap = util.createNode('div');
		me.indexWrap.className = 'plugin-scroll-index-wrap';
		for(var j = 0, n = me.nodeCount; j < n; j++) {
			var span = util.createNode('span');
			span.className = 'plugin-scroll-index';
			span.setAttribute('data-index', j + 1);
			span.setAttribute('index-tag', 1);
			if(j === 0) {
				span.className = span.className + ' plugin-scroll-tag-sel';
			}
			span.innerHTML = j + 1;
			me.indexWrap.appendChild(span);
		}
		me.container.appendChild(me.indexWrap);
		// 绑定事件
		util.addEvent(me.indexWrap, 'click', function(event) {
			var target = event.target || event.srcElement;
			clearInterval(me.autoTimer);
			event = event || win.event;
			if(target.getAttribute('index-tag')) {
				var dataIndex = target.getAttribute('data-index');
				var currentIndex = me._getIndex();
				dataIndex > currentIndex 
				? me._animate('right', (dataIndex - currentIndex))
				: me._animate('left', (currentIndex - dataIndex));
			}
		});
	};

	// 鼠标悬停操作
	Slider.prototype._supportPauseable = function() {
		var me = this;
		me.container.onmouseenter =
		me.leftBtn.onmouseenter =
		me.rightBtn.onmouseenter = function() {
			clearInterval(me.autoTimer);
		};
		me.container.onmouseleave =
		me.leftBtn.onmouseleave =
		me.rightBtn.onmouseleave = function() {
			clearInterval(me.autoTimer);
			me._autoMove();
		};
	};

	// 鼠标滚动操作
	Slider.prototype._supportWheelable = function() {
		var me = this;
		var scrollFunc = function(event) {
			clearInterval(me.pauseTimer);
			clearInterval(me.autoTimer);
			me.pauseTimer = setTimeout(function() {
				event = event || win.event;
				var scrollVal = 0;
      // IE6首先实现了mousewheel事件。此后，Opera、Chrome和Safari也都实现了这个事件
			//当用户向上滚动鼠标滚轮时，wheelDelta是120的倍数；当用户向下滚动鼠标滚轮时，wheelDelta是-120的倍数
				event.wheelDelta && (scrollVal = -event.wheelDelta);
			// FireFox, 当向上滚动鼠标滚轮时，这个属性的值是-3的倍数，当向下滚动鼠标滚轮时，这个属性的值是3的倍数
				event.detail && (scrollVal = event.detail);

				scrollVal > 0
		        ? me._animate('right', 1)
		        : me._animate('left', 1);
        me._autoMove();
			}, 20);
		}

		// IE/Opera/Chrome/Safari
		util.addEvent(doc, 'mousewheel', scrollFunc);
		util.addEvent(doc, 'DOMMouseScroll', scrollFunc);
	};

	//切换数字下标的样式，通过class来实现，数字下标从0开始
	Slider.prototype._setIndex = function(index) {
		var me = this;
		var childNodes = me.indexWrap.childNodes;
		index = index === 0 ? me.nodeCount : index;
		for(var i = 0; i < childNodes.length; i++) {
			childNodes[i].className = 'plugin-scroll-index';
		}
		childNodes[index - 1].classList.add('plugin-scroll-tag-sel');
		// childNodes[index - 1].className += ' plugin-scroll-tag-sel';
	};
	
  // 获取当前播放的数字下标
	Slider.prototype._getIndex = function() {
		var me = this;
		var childNodes = me.indexWrap.childNodes;
		for(var i = 0, c = me.nodeCount; i < c; i++) {
			if(/(plugin-scroll-tag-sel)/.test(childNodes[i].className)) {
				return i + 1;
			}
		}
	};

	return Slider;
	
})(window, document)