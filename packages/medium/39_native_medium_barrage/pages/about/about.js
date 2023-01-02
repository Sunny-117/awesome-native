function getColor(){
  const rgb = []
  for(let i =0;i<3;++i){
    let getColor = Math.floor(Math.random() *256).toString(16)
    getColor = getColor.length == 1 ? '0'+getColor:getColor
    rgb.push(getColor)
  }
  return '#'+rgb.join('')
}

// pages/about/about.js
Page({
  inputValue:'',
  /**
   * 页面的初始数据
   */
  data: {
    danmuList:[
      {text:'这是一条弹幕内容',color:'#f00',time:1},
      {text:'这是二条弹幕内容',color:'#0f0',time:3}
    ]
  },

  bindInputBlur:function(e){
    //console.log(e.detail.value)
    this.inputValue = e.detail.value
  },

  bindFaDanMu:function(e){
    this.videoContext.sendDanmu({
      text:this.inputValue,
      color: getColor()
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.videoContext = wx.createVideoContext('myVideo')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})