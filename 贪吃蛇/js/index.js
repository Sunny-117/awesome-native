var sw=20,	//一个方块的宽度
	sh=20,	//一个方块的高度
	tr=30,	//行数
	td=30;	//列数

var snake=null,	//蛇的实例
	food=null,	//食物的实例
	game=null;	//游戏的实例	

//方块构造函数
function Square(x,y,classname){
	//0,0		0,0
	//20,0		1,0
	//40,0		2,0

	this.x=x*sw;
	this.y=y*sh;
	this.class=classname;

	this.viewContent=document.createElement('div');	//方块对应的DOM元素
	this.viewContent.className=this.class;	
	this.parent=document.getElementById('snakeWrap');//方块的父级
}
Square.prototype.create=function(){	//创建方块DOM，并添加到页面里
	this.viewContent.style.position='absolute';
	this.viewContent.style.width=sw+'px';
	this.viewContent.style.height=sh+'px';
	this.viewContent.style.left=this.x+'px';
	this.viewContent.style.top=this.y+'px';
	this.parent.appendChild(this.viewContent);
};
Square.prototype.remove=function(){
	this.parent.removeChild(this.viewContent);
};

//蛇
function Snake(){
	this.head=null;	//存一下蛇头的信息
	this.tail=null;	//存一下蛇尾的信息
	this.pos=[];	//存储蛇身上的每一个方块的位置

	this.directionNum={	//存储蛇走的方向，用一个对象来表示
		left:{
			x:-1,
			y:0,
			rotate:180	//蛇头在不同的方向中应该进行旋转，要不始终是向右
		},
		right:{
			x:1,
			y:0,
			rotate:0
		},
		up:{
			x:0,
			y:-1,
			rotate:-90
		},
		down:{
			x:0,
			y:1,
			rotate:90
		}
	}
}
Snake.prototype.init=function(){
	//创建蛇头
	var snakeHead=new Square(2,0,'snakeHead');
	snakeHead.create();
	this.head=snakeHead;	//存储蛇头信息
	this.pos.push([2,0]);	//把蛇头的位置存起来

	//创建蛇身体1
	var snakeBody1=new Square(1,0,'snakeBody');
	snakeBody1.create();
	this.pos.push([1,0]);	//把蛇身1的坐标也存起来

	//创建蛇身体2
	var snakeBody2=new Square(0,0,'snakeBody');
	snakeBody2.create();
	this.tail=snakeBody2;	//把蛇尾的信息存起来
	this.pos.push([0,0]);	//把蛇身1的坐标也存起来


	//形成链表关系
	snakeHead.last=null;
	snakeHead.next=snakeBody1;

	snakeBody1.last=snakeHead;
	snakeBody1.next=snakeBody2;

	snakeBody2.last=snakeBody1;
	snakeBody2.next=null;

	//给蛇添加一条属性，用来表示蛇走的方向
	this.direction=this.directionNum.right;	//默认让蛇往右走
};

//这个方法用来获取蛇头的下一个位置对应的元素，要根据元素做不同的事情
Snake.prototype.getNextPos=function(){
	var nextPos=[	//蛇头要走的下一个点的坐标
		this.head.x/sw+this.direction.x,
		this.head.y/sh+this.direction.y
	]

	//下个点是自己，代表撞到了自己，游戏结束
	var selfCollied=false;	//是否撞到了自己
	this.pos.forEach(function(value){
		if(value[0]==nextPos[0] && value[1]==nextPos[1]){
			// 引用值比较地址
			//如果数组中的两个数据都相等，就说明下一个点在蛇身上里面能找到，代表撞到自己了
			selfCollied=true;
		}
	});
	if(selfCollied){
		console.log('撞到自己了！');
		this.strategies.die.call(this);//call(保证this指向)
		return;
	}
	//下个点是围墙，游戏结束
	if(nextPos[0]<0 || nextPos[1]<0 || nextPos[0]>td-1 || nextPos[1]>tr-1){
		console.log('撞墙了！');
		this.strategies.die.call(this);
		return;
	}

	//下个点是食物，吃
	if(food && food.pos[0]==nextPos[0] && food.pos[1]==nextPos[1]){
		//如果这个条件成立说明现在蛇头要走的下一个点是食物的那个点(坐标)
		console.log('撞到食物了！');
		this.strategies.eat.call(this);
		return;
	}
	//下个点什么都不是，走(排除法：可以用if-else,也可以用return)
	this.strategies.move.call(this);
};

//处理碰撞后要做的事
Snake.prototype.strategies={
	move:function(format){	//这个参数用于决定要不要删除最后一个方块（蛇尾）。当传了这个参数后就表示要做的事情是吃
		//创建新身体（在旧蛇头的位置）
		var newBody=new Square(this.head.x/sw,this.head.y/sh,'snakeBody');
		//更新链表的关系
		// newBody.next=snakeBody1;娶不到
		newBody.next=this.head.next;//通过head找到body1
		newBody.next.last=newBody;//body1的右侧应该是newbody
		newBody.last=null;

		this.head.remove();	//把旧蛇头从原来的位置删除
		newBody.create();

		//创建一个新蛇头(蛇头下一个要走到的点nextPos)
		var newHead=new Square(this.head.x/sw+this.direction.x,this.head.y/sh+this.direction.y,'snakeHead');
		//更新链表的关系
		newHead.next=newBody;
		newHead.last=null;
		newBody.last=newHead;
		newHead.viewContent.style.transform='rotate('+this.direction.rotate+'deg)';
		newHead.create();

		//蛇身上的每一个方块的坐标也要更新
		this.pos.splice(0,0,[this.head.x/sw+this.direction.x,this.head.y/sh+this.direction.y]);//从第0个开始，替换0个，插入新数组
		this.head=newHead;	//还要把this.head的信息更新一下


		if(!format){	//如果fromat的值为false，表示需要删除（除了吃之外的操作）
			this.tail.remove();
			this.tail=this.tail.last;

			this.pos.pop();
		}
	},
	eat:function(){
		this.strategies.move.call(this,true);
		createFood();//在随机出现一个苹果 
		game.score++;
	},
	die:function(){
		//console.log('die');
		game.over();
	}
}
snake=new Snake();



//创建食物
function createFood(){
	//食物小方块的随机坐标
	var x=null;
	var y=null;

	var include=true;	//循环跳出的条件，true表示食物的坐标在蛇身上（需要继续循环）。false表示食物的坐标不在蛇身上（不循环了）
	while(include){
		x=Math.round(Math.random()*(td-1));
		y=Math.round(Math.random()*(tr-1));

		snake.pos.forEach(function(value){
			if(x!=value[0] && y!=value[1]){
				//这个条件成立说明现在随机出来的这个坐标，在蛇身上并没有找到。
				include=false;
			}
		});
	}

	//生成食物
	food=new Square(x,y,'food');
	food.pos=[x,y];	//存储一下生成食物的坐标，用于跟蛇头要走的下一个点做对比
	// 设计模式：单例模式，以后学。只创建一个
	var foodDom=document.querySelector('.food');
	if(foodDom){
		foodDom.style.left=x*sw+'px';
		foodDom.style.top=y*sh+'px';
	}else{
		food.create();
	}
}



//创建游戏逻辑
function Game(){
	this.timer=null;
	this.score=0;
}
Game.prototype.init=function(){
	snake.init();
	//snake.getNextPos();
	createFood();

	document.onkeydown=function(ev){
		if(ev.which==37 && snake.direction!=snake.directionNum.right){	//用户按下左键的时候，这条蛇不能是正下往右走
			snake.direction=snake.directionNum.left;
		}else if(ev.which==38 && snake.direction!=snake.directionNum.down){
			snake.direction=snake.directionNum.up;
		}else if(ev.which==39 && snake.direction!=snake.directionNum.left){
			snake.direction=snake.directionNum.right;
		}else if(ev.which==40 && snake.direction!=snake.directionNum.up){
			snake.direction=snake.directionNum.down;
		}
	}

	this.start();
}
Game.prototype.start=function(){	//开始游戏
	this.timer=setInterval(function(){
		snake.getNextPos();
	},200);
}
Game.prototype.pause=function(){
	clearInterval(this.timer);
}
Game.prototype.over=function(){
	clearInterval(this.timer);
	alert('你的得分为：'+this.score);

	//游戏回到最初始的状态
	var snakeWrap=document.getElementById('snakeWrap');
	snakeWrap.innerHTML='';

	snake=new Snake();
	game=new Game()

	var startBtnWrap=document.querySelector('.startBtn');
	startBtnWrap.style.display='block';
}


//开启游戏
game=new Game();
var startBtn=document.querySelector('.startBtn button');
startBtn.onclick=function(){
	startBtn.parentNode.style.display='none';
	game.init();
};

//暂停
var snakeWrap=document.getElementById('snakeWrap');
var pauseBtn=document.querySelector('.pauseBtn button');
snakeWrap.onclick=function(){
	game.pause();

	pauseBtn.parentNode.style.display='block';
}

pauseBtn.onclick=function(){
	game.start();
	pauseBtn.parentNode.style.display='none';
}



