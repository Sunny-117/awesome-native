// pages/chat/chat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"Let's chat",
    headLeft:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4139308026,2925331886&fm=26&gp=0.jpg',
    headRight:'',
    syas:[{
      'robot':'我是小七，来跟我聊天吧！',
      'isay':"你好"
    }]
  },

  /**
   * 发送事件处理函数
   */
  converSation(e){
      let that = this
      //console.log(e.detail.value.says)
      let obj = {},
      isay = e.detail.value.says,
      syas = this.data.syas,
      length = syas.length,
      key = 'e0dc078b05ed4034bc26709c6ca04196'//在线聊天的机器人的id号

      //发送
      wx.request({
        url: 'http://www.tuling123.com/openapi/api?key='+key+'&info='+isay,
        success(res){
          let tuling = res.data.text;
          obj.robot = tuling;
          obj.isay = isay;
          syas[length] = obj;
          that.setData({
            syas:syas
          })
        }
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
    let that = this
    wx.getUserInfo({
      success(e){
        console.log(e.userInfo.avatarUrl)
        that.setData({
          headRight:e.userInfo.avatarUrl
        })
      }
    })
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