var app = getApp()
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    islogin: app.globalData.isLogin,
    userdata:""
  },
  login:() => {
    let code;
    wx.scanCode({
      success(res) {
        code = res.result;
        wx.request({
          url: 'https://cnodejs.org/api/v1/accesstoken',
          data: {
            accesstoken: code
          },
          header: {},
          method: 'POST',
          dataType: 'json',
          responseType: 'text',
          success: function(res) {
            if (res.data.success){
              wx.showToast({
                title: ' 登陆成功',
                icon: 'loading',
                duration: 2000
              });
              app.globalData.isLogin = true;
              that.setData({ islogin: app.globalData.isLogin, userdata:res.data});
              wx.setStorageSync('loginid', code); //loginid
              wx.setStorageSync('logindata', res.data);//logindata
              let userIdEnc = wx.getStorageSync('loginid'); //获取本地缓存中的userIdEnc //用户唯一识别码
              let loginDevice = wx.getStorageSync('logindata');//获取本地缓存中的loginDevice
            }
            else{
              wx.showToast({
                title: ' 密码错误',
                icon: 'loading',
                duration: 4000
              });
            }
          },
          fail: function(res) {
            wx.showToast({
              title: '连接失败',
              icon: 'success',
              duration: 4000
            })
          },
          complete: function(res) {},
        })
      },
      fail() {
        wx.showToast({
          title: 'code为空',
          icon: 'success',
          duration: 4000
        })
      }
    })
  },
  out(){
    app.globalData.isLogin = false;
    that.setData({ islogin: app.globalData.isLogin, userdata:''});
    wx.clearStorage();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that=this;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})