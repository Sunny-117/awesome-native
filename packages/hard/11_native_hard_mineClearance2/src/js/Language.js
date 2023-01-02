function getScoreArr(){ //从本地客户端存储获取分数数据
  if(!sessionStorage.fighterScore){
    sessionStorage.fighterScore = '[]';
  }
  let scores = JSON.parse(sessionStorage.fighterScore);
  let len = scores.length;
  if(len < 6){
    for(let i = len; i < 6; i++){
      scores.push(0);
    }
  }
  return scores;
}
/******** 语言环境策略对象 ********/
export const lanStrategy = {
    chinese: {
      startBtn: '新的游戏',
      rankBtn: '分数排行',
      setBtn: '游戏设置',
      ruleBtn: '游戏说明',
      rankContent: function(){
        let scores = getScoreArr();
        return `<h2>分数排行</h2>
          <ol>
            <li>${scores[0]}</li>
            <li>${scores[1]}</li>
            <li>${scores[2]}</li>
            <li>${scores[3]}</li>
            <li>${scores[4]}</li>
            <li>${scores[5]}</li>
          </ol>`;
      },  
      setContent:
        '<h2>游戏设置</h2>\
        游戏音乐: &nbsp <input type="range"><br>\
        游戏音效: &nbsp <input type="range"><br>\
        语言环境: &nbsp <select style="width:130px" class="lanSet">\
        <option selected>中文</option>\
        <option>English</option>\
        </select>',
      ruleContent:
        '<h2>游戏说明</h2>\
        触摸飞机移动<br>\
        躲避敌机碰撞<br>\
        击毁敌机<br>\
        获取积分<br>\
        小型飞机： 100分<br>\
        中型飞机： 1200分<br>\
        大型飞机： 3500分',
      loading: 
        '游戏加载中, 请稍候...',
      score:
        '分数',
      ctrlContent:
        '<span class="ctrl-resume">继续游戏</span>\
        <span class="ctrl-again">重新游戏</span>'
    },
    english: {
      startBtn: 'start',
      rankBtn: 'rankings',
      setBtn: 'settings',
      ruleBtn: 'instructions',
      rankContent: function(){
        let scores = getScoreArr();
        return `<h2>Rankings</h2>
          <ol>
            <li>${scores[0]}</li>
            <li>${scores[1]}</li>
            <li>${scores[2]}</li>
            <li>${scores[3]}</li>
            <li>${scores[4]}</li>
            <li>${scores[5]}</li>
          </ol>`;
      }, 
      setContent:
        '<h2>Settings</h2>\
        Game Music: &nbsp <input type="range"><br>\
        Game Sound: &nbsp <input type="range"><br>\
        Language: &nbsp <select style="width:130px" class="lanSet">\
        <option>中文</option>\
        <option selected>English</option>\
        </select>',
      ruleContent:
        '<h2>Instructions</h2>\
        Touch the plane to move<br>\
        keep yourself from hitting<br>\
        killing the enemies<br>\
        getting score<br>\
        Small Fighter: 100 points<br>\
        Medium Fighter: 1200 points<br>\
        Large Fighter: 3500 points',
      loading: 
        'Game loading ......',
      score:
        'Score',
      ctrlContent:
        '<span class="ctrl-resume">Resume</span>\
        <span class="ctrl-again">Again</span>'
    }
  }