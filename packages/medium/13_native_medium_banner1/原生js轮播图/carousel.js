var $Csl = document.getElementsByClassName("csl_wrapper")[0];
var $Dot = document.getElementsByTagName('i');
var iCnt = $Csl.children.length - 1;
var $Lbtn = document.getElementsByClassName('csl_lbtn')[0];
var $Rbtn = document.getElementsByClassName('csl_rbtn')[0];
var iStepSize = $Csl.children[0].offsetWidth;
var cslTimer;
var iIndex = 0;
var bFlag = true;
$Lbtn.onclick = function(){
    cslAutoMove(-1);
};
$Rbtn.onclick = function(){
    cslAutoMove(1);
};
for(var i = 0; i < $Dot.length; i++){
    $Dot[i].onclick = (function(n){
        return function(){
            clearInterval(cslTimer);
            iIndex = n;
            startMove($Csl,{left:-n*iStepSize},endJudge);
        }
    }(i));
}
function cslAutoMove(csl_dir){
    if(bFlag){
        bFlag = false;
        clearInterval(cslTimer);
        if(csl_dir === -1){//向左轮播
            iIndex--;
            if($Csl.offsetLeft === 0){
                $Csl.style.left = -iStepSize*iCnt + 'px';
                iIndex = iCnt - 1;
            }
            startMove($Csl,{left: $Csl.offsetLeft + iStepSize},endJudge);
        }else{//向右轮播
            iIndex++;
            startMove($Csl,{left:$Csl.offsetLeft - iStepSize},endJudge);
        }   
    } 
}
function endJudge(){
    if($Csl.offsetLeft === -iStepSize * iCnt){
        $Csl.style.left = '0px';
        iIndex = 0;
    }
    cslTimer = setInterval(cslAutoMove,1500);
    bFlag = true;
    changeIndex(iIndex);
}
function changeIndex(iIndex){
    for(var i = 0; i < $Dot.length; i++){
        $Dot[i].setAttribute('class', '');
    }
    $Dot[iIndex].setAttribute('class','active');
}
cslTimer = setInterval(cslAutoMove,1500);