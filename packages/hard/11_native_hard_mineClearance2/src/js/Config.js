/***** 默认配置文件 *****/
export let config = {
  language: 'chinese', //默认语言
  imgPath: './src/img/', //图片资源路径
  soundPath: './src/sound/', //音效资源路径
  canvasWidth: 480,
  canvasHeight: 853,
  playerWidth: 98,
  playerHeight: 122,
  bulletWidth: 9,
  bulletHeight: 21,
  bulletSpeed: 14,
  smallPlaneWidth: 59,
  smallPlaneHeight: 31,
  smallPlaneSpeed: 4,
  mediumPlaneWidth: 70,
  mediumPlaneHeight: 92,
  mediumPlaneSpeed: 2,
  largePlaneWidth: 165,
  largePlaneHeight: 256,
  largePlaneSpeed: 1,
  propWidth: 59,
  propHeight: 103,
  propSpeed: 7,
  bombWidth: 60,
  bombHeight: 53,
  bombMax: 3, //炸弹上限
  buttonWidth: 60,
  buttonHeight: 45,
  bossWidth: 300,
  bossHeight: 300,
  bossBulletWidth: 30,
  bossBulletHeight: 30,
  planeBlood: {
    smallPlane: 1,
    mediumPlane: 12,
    largePlane: 30
  },
  dieImgNum: {
    player: 4,
    smallPlane: 3,
    mediumPlane: 4,
    largePlane: 6
  },
  killScore: {
    smallPlane: 100,
    mediumPlane: 1200,
    largePlane: 3500
  },
  grow: {
    smallPlane: 0.5,
    mediumPlane: 0.2,
    largePlane: 0.1
  },
  dieInterval: 10, //玩家/敌机死亡动画间隔/帧
  propInterval: 400, //道具发放间隔/帧
  enemyInterval: 40, //敌机出现初始间隔/帧
  AIInterval: 500, //智能敌机出现初始间隔/帧
  bulletInterval: 8, // 子弹发射间隔/帧
  firepowerTime: 2e4, // 火力全开持续时间/ms
  showBossScore: 1e5, //出现boss的初始分数
  bossBlood: 200, //boss初始血量
  backgroundImgSrc: 'background.jpg',
  logoSrc: 'logo.png',
  loadImageSrc: [
    'loading1.png',
    'loading2.png',
    'loading3.png'
  ],
  gameImageSrc: [
    'player0.png',
    'player1.png',
    'player_die0.png',
    'player_die1.png',
    'player_die2.png',
    'player_die3.png',
    'bullet_normal.png',
    'bullet_strength.png',
    'bullet_super.png',
    'bomb.png',
    'prop_bomb.png',
    'prop_weapon.png',
    'smallPlane.png',
    'smallPlane_die0.png',
    'smallPlane_die1.png',
    'smallPlane_die2.png',
    'smallPlane_left.png',
    'smallPlane_left_die0.png',
    'smallPlane_left_die1.png',
    'smallPlane_left_die2.png',
    'smallPlane_right.png',
    'smallPlane_right_die0.png',
    'smallPlane_right_die1.png',
    'smallPlane_right_die2.png',
    'mediumPlane.png',
    'mediumPlane_hurt.png',
    'mediumPlane_die0.png',
    'mediumPlane_die1.png',
    'mediumPlane_die2.png',
    'mediumPlane_die3.png',
    'largePlane0.png',
    'largePlane1.png',
    'largePlane_hurt.png',
    'largePlane_die0.png',    
    'largePlane_die1.png',
    'largePlane_die2.png',
    'largePlane_die3.png',
    'largePlane_die4.png',
    'largePlane_die5.png',
    'game_pause.png',
    'game_resume.png',
    'game_over.png',
    'boss_bullet.jpg',
    'boss_left.png',
    'boss_right.png',
    'boss_appear.png',
    'boss_die.png',
    'boss_angry.png'
  ],
  gameAudioSrc: [
    'music.mp3',
    'biubiubiu.mp3',
    'button.mp3',
    'smallPlane_die.mp3',
    'mediumPlane_die.mp3',
    'largePlane_die.mp3',
    'player_bomb.mp3',
    'get_bomb_prop.mp3',
    'get_weapon_prop.mp3',
    'prop_appear.mp3',
    'use_bomb.mp3',
    'largePlane_flying.mp3',
    'achievement.mp3',
    'warning.mp3'
  ]
}