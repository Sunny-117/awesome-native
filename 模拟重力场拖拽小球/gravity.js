var $Div = document.getElementsByTagName('div')[0];
function flyBall(elem){
    var iSpeedX = 0;
    var iSpeedY = 0;
    elem.onmousedown = function(e){
        clearInterval(this.timer);
        var event = e || window.event;
        var self = this;
        var lastX = 0;
        var lastY = 0;
        var newX = 0;
        var newY = 0;
        var disX = event.clientX -  this.offsetLeft;
        var disY = event.clientY - this.offsetTop;
        document.onmousemove = function(e){
            var event = e || window.event;
            newX = event.clientX -  disX;
            newY = event.clientY -  disY;

            iSpeedX = newX - lastX;//初始横向速度
            iSpeedY = newY - lastY;//初始纵向速度

            self.style.left = newX + 'px';
            self.style.top = newY + 'px';
            lastX = newX;
            lastY = newY;
        }
        document.onmouseup = function(){
            document.onmousemove = null;
            document.onmouseup = null;
            startMove(self);   
        }
    };
    function startMove(obj){
        var newL = 0;//新left
        var newT = 0;//新top
        var g = 3;//重力
        obj.timer = setInterval(function(){
            iSpeedY += g;
            newL = obj.offsetLeft + iSpeedX;
            newT = obj.offsetTop + iSpeedY;
            if(newT > window.innerHeight - obj.offsetHeight){
                newT = window.innerHeight - obj.offsetHeight;
                iSpeedY *= -1;
                iSpeedY *= 0.9;
                iSpeedX *= 0.9;
            }else if(newT < 0){
                newT = 0;
                iSpeedY *= -1;
                iSpeedY *= 0.9;
            }
            if(newL > window.innerWidth - obj.offsetWidth){
                newL = window.innerWidth - obj.offsetWidth;
                iSpeedX *= -1;
                iSpeedX *= 0.9;
            }else if(newL < 0){
                newL = 0;
                iSpeedX *= -1;
                iSpeedX *= 0.9;
            }
            //终止条件
            if(Math.abs(iSpeedX) < 1){
                iSpeedX = 0;
            }
            if(Math.abs(iSpeedY) < 1){
                iSpeedY = 0;
            }
            if(iSpeedX === 0 && iSpeedY === 0 && 
            newT === window.innerHeight - obj.offsetHeight){
                clearInterval(obj.timer);
            }else{
                obj.style.left = newL + 'px';
                obj.style.top = newT + 'px';
            }
            
        },10);
    }
}
flyBall($Div);